import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/finora/bottom-nav';
import {
    BellIcon,
    CalendarIcon,
    ChevronLeftIcon,
} from '@/components/finora/icons';
import { TransactionRow } from '@/components/finora/transaction-row';
import {
    TransactionSummary,
    type TransactionFilter,
} from '@/components/finora/transaction-summary';

import {
    FinoraColors
} from '@/constants/theme';

import {
    accountSummary,
    transactions,
} from '@/data/finora';

export default function TransactionsScreen() {
    const [filter, setFilter] =
        useState<TransactionFilter>('all');

    const filteredTransactions = useMemo(() => {
        if (filter === 'all') {
            return transactions;
        }

        return transactions.filter(
            (transaction) =>
                transaction.type === filter
        );
    }, [filter]);

    const months = [
        'April',
        'March',
        'February',
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* GREEN TOP HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ChevronLeftIcon
                            size={21}
                            color={FinoraColors.primaryDark}
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Transaction
                    </Text>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => { }}
                    >
                        <BellIcon
                            size={19}
                            color={FinoraColors.primaryDark}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* SUMMARY */}
                    <TransactionSummary
                        balance={accountSummary.balance}
                        income={accountSummary.income}
                        expense={accountSummary.expense}
                        filter={filter}
                        onChangeFilter={setFilter}
                    />

                    {/* TRANSACTION LIST */}
                    <View style={styles.listCard}>
                        {months.map((month) => {
                            const monthTransactions =
                                filteredTransactions.filter(
                                    (transaction) =>
                                        transaction.month === month
                                );

                            if (monthTransactions.length === 0) {
                                return null;
                            }

                            return (
                                <View
                                    key={month}
                                    style={styles.monthSection}
                                >
                                    <View style={styles.monthHeader}>
                                        <Text style={styles.monthTitle}>
                                            {month}
                                        </Text>

                                        {month === 'April' && (
                                            <TouchableOpacity
                                                style={styles.calendarButton}
                                            >
                                                <CalendarIcon
                                                    size={16}
                                                    color={FinoraColors.primaryDark}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    {monthTransactions.map(
                                        (transaction, index) => (
                                            <View key={transaction.id}>
                                                <TransactionRow
                                                    transaction={transaction}
                                                />

                                                {index <
                                                    monthTransactions.length -
                                                    1 && (
                                                        <View
                                                            style={
                                                                styles.rowDivider
                                                            }
                                                        />
                                                    )}
                                            </View>
                                        )
                                    )}
                                </View>
                            );
                        })}

                        {filteredTransactions.length === 0 && (
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>
                                    No transactions found.
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* BOTTOM NAVIGATION */}
                <BottomNav />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: FinoraColors.background,
    },

    container: {
        flex: 1,
        backgroundColor: FinoraColors.background,
    },

    header: {
        height: 58,
        backgroundColor: FinoraColors.header,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    backButton: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        color: FinoraColors.primaryDark,
        fontSize: 13,
        fontWeight: '800',
    },

    notificationButton: {
        width: 31,
        height: 31,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        paddingHorizontal: 5,
        paddingTop: 7,
        paddingBottom: 100,
    },

    listCard: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 23,
        paddingHorizontal: 8,
        paddingTop: 9,
        paddingBottom: 25,
    },

    monthSection: {
        marginBottom: 13,
    },

    monthHeader: {
        minHeight: 23,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    monthTitle: {
        color: FinoraColors.text,
        fontSize: 9,
        fontWeight: '700',
    },

    calendarButton: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: FinoraColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowDivider: {
        height: 1,
        backgroundColor: '#DFF7E2',
        marginLeft: 37,
    },

    empty: {
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyText: {
        color: FinoraColors.textSecondary,
        fontSize: 13,
    },
});