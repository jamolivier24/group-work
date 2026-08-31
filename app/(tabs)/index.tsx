import { Ionicons } from '@expo/vector-icons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, styles } from '@/styles/index.styles';

const periods = ['daily', 'weekly', 'monthly', 'yearly'] as const;
type Currency = 'USD' | 'RWF';
const fallbackUsdToRwf = 1400;

export default function HomeScreen() {
  const { demoEmail } = useLocalSearchParams<{ demoEmail?: string }>();

  if (demoEmail) {
    return (
      <Dashboard
        email={demoEmail}
        onSignOut={() => router.replace('/auth')}
      />
    );
  }

  return <Redirect href="/auth" />;
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const firstName = email.split('@')[0] || 'there';
  const [monthlyIncome, setMonthlyIncome] = useState('4000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('1187.40');
  const [incomeInput, setIncomeInput] = useState('4000');
  const [expensesInput, setExpensesInput] = useState('1187.40');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [usdToRwf, setUsdToRwf] = useState(fallbackUsdToRwf);
  const monthlyIncomeRef = useRef(monthlyIncome);
  const monthlyExpensesRef = useRef(monthlyExpenses);

  monthlyIncomeRef.current = monthlyIncome;
  monthlyExpensesRef.current = monthlyExpenses;

  useEffect(() => {
    let active = true;

    fetch('https://api.frankfurter.app/latest?from=USD&to=RWF')
      .then((response) => {
        if (!response.ok) throw new Error('Currency rate request failed');
        return response.json() as Promise<{ rates?: { RWF?: number } }>;
      })
      .then((data) => {
        if (active && data.rates?.RWF) setUsdToRwf(data.rates.RWF);
      })
      .catch(() => {
        // Keep the fallback rate when the currency service is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setIncomeInput(formatInputAmount(parseAmount(monthlyIncomeRef.current), currency, usdToRwf));
    setExpensesInput(formatInputAmount(parseAmount(monthlyExpensesRef.current), currency, usdToRwf));
  }, [currency, usdToRwf]);

  const income = parseAmount(monthlyIncome);
  const expenses = parseAmount(monthlyExpenses);
  const expenseRate = income > 0 ? expenses / income : 0;
  const expensePercentage = Math.min(expenseRate * 100, 100);
  const availableBalance = Math.max(income - expenses, 0);
  const weeklyIncome = income / 4.345;
  const weeklyExpenses = expenses / 4.345;
  const advice = getSpendingAdvice(expenseRate, income, expenses, currency, usdToRwf);
  const currencySymbol = currency === 'USD' ? '$' : 'FRW';

  return (
    <SafeAreaView style={styles.dashboardSafeArea}>
      <ScrollView
        contentContainerStyle={styles.dashboardContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dashboardHeader}>
          <View>
            <Text style={styles.dashboardGreeting}>Hello, {firstName}</Text>
            <Text style={styles.dashboardDate}>Have a good day!</Text>
          </View>

          <Pressable
            style={styles.notificationButton}
            onPress={onSignOut}
            accessibilityLabel="Sign out"
          >
            <Ionicons name="log-out-outline" size={22} color={palette.ink} />
          </Pressable>
        </View>

        <View style={styles.currencyToggle}>
          <Text style={styles.currencyToggleLabel}>Currency</Text>
          {(['USD', 'RWF'] as const).map((option) => (
            <Pressable
              key={option}
              onPress={() => setCurrency(option)}
              style={[styles.currencyOption, currency === option && styles.currencyOptionActive]}
            >
              <Text style={[styles.currencyOptionText, currency === option && styles.currencyOptionTextActive]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>
              <Ionicons name="wallet-outline" size={12} /> Total balance
            </Text>
            <Text style={styles.balanceAmount}>{formatAmount(availableBalance, currency, usdToRwf)}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>
              <Ionicons name="trending-down-outline" size={12} /> Total expense
            </Text>
            <Text style={styles.expenseAmount}>-{formatAmount(expenses, currency, usdToRwf).slice(currency === 'USD' ? 1 : 3)}</Text>
          </View>
        </View>

        <View style={styles.monthlyPlan}>
          <Text style={styles.sectionTitle}>Monthly plan</Text>
          <View style={styles.inputRow}>
            <MoneyInput
              label="Monthly income"
              value={incomeInput}
              currency={currencySymbol}
              onChangeText={(value) => {
                setIncomeInput(value);
                setMonthlyIncome(toUsdInput(value, currency, usdToRwf));
              }}
            />
            <MoneyInput
              label="Monthly expenses"
              value={expensesInput}
              currency={currencySymbol}
              onChangeText={(value) => {
                setExpensesInput(value);
                setMonthlyExpenses(toUsdInput(value, currency, usdToRwf));
              }}
            />
          </View>

          <Text style={styles.conversionTitle}>Your amounts by period</Text>
          <PeriodAmount label="Daily" income={income / 30} expenses={expenses / 30} currency={currency} rate={usdToRwf} />
          <PeriodAmount label="Weekly" income={income / 4.345} expenses={expenses / 4.345} currency={currency} rate={usdToRwf} />
          <PeriodAmount label="Monthly" income={income} expenses={expenses} currency={currency} rate={usdToRwf} />
          <PeriodAmount label="Yearly" income={income * 12} expenses={expenses * 12} currency={currency} rate={usdToRwf} />

          <View style={styles.adviceBox}>
            <Ionicons
              name={advice.icon}
              size={20}
              color={advice.color}
            />
            <View style={styles.adviceContent}>
              <Text style={[styles.adviceTitle, { color: advice.color }]}>{advice.title}</Text>
              <Text style={styles.adviceText}>{advice.message}</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${expensePercentage}%` }]} />
          <Text style={styles.progressText}>{Math.round(expensePercentage)}%</Text>
          <Text style={styles.progressValue}>{formatAmount(income, currency, usdToRwf)}</Text>
        </View>

        <Text style={styles.healthText}>
          <Ionicons name={advice.icon} size={14} color={advice.color} /> {advice.title}: {Math.round(expensePercentage)}% of your income is spent.
        </Text>

        <View style={styles.insightCard}>
          <View style={styles.savingsCircle}>
            <Ionicons name="car-sport-outline" size={29} color={palette.ink} />
            <Text style={styles.circleCaption}>
              Savings{`\n`}on goals
            </Text>
          </View>

          <View style={styles.insightDivider} />

          <View style={styles.insightDetails}>
            <View style={styles.insightLine}>
              <Ionicons name="layers-outline" size={24} color={palette.ink} />
              <View>
                <Text style={styles.insightLabel}>Revenue last week</Text>
                <Text style={styles.insightValue}>{formatAmount(weeklyIncome, currency, usdToRwf)}</Text>
              </View>
            </View>

            <View style={styles.insightLine}>
              <Ionicons name="restaurant-outline" size={24} color={palette.ink} />
              <View>
                <Text style={styles.insightLabel}>Food last week</Text>
                <Text style={styles.insightNegative}>-{formatAmount(weeklyExpenses, currency, usdToRwf).slice(currency === 'USD' ? 1 : 3)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.periodSwitcher}>
          {periods.map((period) => {
            const label = period[0].toUpperCase() + period.slice(1);

            return (
              <Pressable
                key={period}
                onPress={() =>
                  router.push({
                    pathname: '/analysis/[period]',
                    params: {
                      period,
                      income: String(income),
                      expenses: String(expenses),
                      currency,
                    },
                  })
                }
                style={[styles.period, period === 'monthly' && styles.periodActive]}
              >
                <Text
                  style={[
                    styles.periodText,
                    period === 'monthly' && styles.periodTextActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Transaction
          icon="cash-outline"
          color="#6BB7FF"
          title="Salary"
          date="18:27 - April 30"
          category="Monthly"
          amount={formatAmount(income, currency, usdToRwf)}
        />
        <Transaction
          icon="bag-handle-outline"
          color="#2993FF"
          title="Groceries"
          date="17:00 - April 24"
          category="Pantry"
          amount={`-${formatAmount(expenses, currency, usdToRwf).slice(currency === 'USD' ? 1 : 3)}`}
          negative
        />
        <Transaction
          icon="hand-left-outline"
          color="#1477F8"
          title="Rent"
          date="8:30 - April 15"
          category="Rent"
          amount={`-${formatAmount(expenses * 0.568, currency, usdToRwf).slice(currency === 'USD' ? 1 : 3)}`}
          negative
        />
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          'home-outline',
          'bar-chart-outline',
          'swap-horizontal-outline',
          'layers-outline',
          'person-outline',
        ].map((icon, index) => (
          <Pressable
            key={icon}
            style={[styles.navItem, index === 0 && styles.navItemActive]}
          >
            <Ionicons
              name={icon as keyof typeof Ionicons.glyphMap}
              size={23}
              color={palette.ink}
            />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

function parseAmount(value: string) {
  const amount = Number.parseFloat(value.replace(',', '.'));
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function formatAmount(amount: number, currency: Currency = 'USD', rate = fallbackUsdToRwf) {
  const convertedAmount = currency === 'RWF' ? amount * rate : amount;
  const formatted = convertedAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency === 'RWF' ? `FRw ${formatted}` : `$${formatted}`;
}

function formatInputAmount(amount: number, currency: Currency, rate: number) {
  const convertedAmount = currency === 'RWF' ? amount * rate : amount;
  return convertedAmount ? convertedAmount.toFixed(2) : '';
}

function toUsdInput(value: string, currency: Currency, rate: number) {
  const amount = parseAmount(value);
  return currency === 'RWF' ? String(amount / rate) : value;
}

function getSpendingAdvice(expenseRate: number, income: number, expenses: number, currency: Currency, rate: number) {
  if (!income) {
    return {
      icon: 'information-circle-outline' as const,
      color: '#668381',
      title: 'Add your income',
      message: 'Enter a monthly income to get personalized spending advice.',
    };
  }

  if (expenseRate <= 0.5) {
    return {
      icon: 'checkmark-circle-outline' as const,
      color: '#078C72',
      title: 'Great balance',
      message: `You use ${Math.round(expenseRate * 100)}% of your income and keep ${formatAmount(income - expenses, currency, rate)} available.`,
    };
  }

  if (expenseRate <= 0.8) {
    return {
      icon: 'alert-circle-outline' as const,
      color: '#B57900',
      title: 'Keep an eye on it',
      message: `You use ${Math.round(expenseRate * 100)}% of your income. Try to leave more room for savings.`,
    };
  }

  return {
    icon: 'warning-outline' as const,
    color: '#B04B4B',
    title: 'Spending is high',
    message: `Your expenses use ${Math.round(expenseRate * 100)}% of your income. Review non-essential spending.`,
  };
}

function MoneyInput({ label, value, currency, onChangeText }: { label: string; value: string; currency: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.moneyInputGroup}>
      <Text style={styles.moneyInputLabel}>{label}</Text>
      <View style={styles.moneyInputWrap}>
        <Text style={styles.currency}>{currency === 'USD' ? '$' : '$'}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#8BA69A"
          style={styles.moneyInput}
        />
      </View>
    </View>
  );
}

function PeriodAmount({ label, income, expenses, currency, rate }: { label: string; income: number; expenses: number; currency: Currency; rate: number }) {
  return (
    <View style={styles.periodAmountRow}>
      <Text style={styles.periodAmountLabel}>{label}</Text>
      <Text style={styles.periodIncome}>{formatAmount(income, currency, rate)}</Text>
      <Text style={styles.periodExpense}>{formatAmount(expenses, currency, rate)}</Text>
    </View>
  );
}

type TransactionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  date: string;
  category: string;
  amount: string;
  negative?: boolean;
};

function Transaction({
  icon,
  color,
  title,
  date,
  category,
  amount,
  negative,
}: TransactionProps) {
  return (
    <View style={styles.transaction}>
      <View style={[styles.transactionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={21} color="#FFFFFF" />
      </View>

      <View style={styles.transactionName}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>

      <Text style={styles.transactionCategory}>{category}</Text>
      <View style={styles.transactionRule} />
      <Text style={[styles.transactionAmount, negative && styles.transactionNegative]}>
        {amount}
      </Text>
    </View>
  );
}

