import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
    FinoraColors,
    FinoraRadius
} from '@/constants/theme';

export type TransactionFilter =
    | 'all'
    | 'income'
    | 'expense';

function money(value: number) {
    return `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

type Props = {
    balance: number;
    income: number;
    expense: number;
    filter: TransactionFilter;
    onChangeFilter: (filter: TransactionFilter) => void;
};

export function TransactionSummary({
    balance,
    income,
    expense,
    filter,
    onChangeFilter,
}: Props) {
    return (
        <View>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>
                    Total Balance
                </Text>

                <Text style={styles.balanceValue}>
                    {money(balance)}
                </Text>
            </View>

            <View style={styles.buttons}>
                <Pressable
                    onPress={() =>
                        onChangeFilter(
                            filter === 'income' ? 'all' : 'income'
                        )
                    }
                    style={[
                        styles.filterCard,
                        filter === 'income' && styles.activeCard,
                    ]}
                >
                    <View
                        style={[
                            styles.arrowCircle,
                            filter === 'income' &&
                            styles.activeArrowCircle,
                        ]}
                    >
                        <Text
                            style={[
                                styles.arrow,
                                filter === 'income' &&
                                styles.activeArrow,
                            ]}
                        >
                            ↗
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.label,
                            filter === 'income' &&
                            styles.activeText,
                        ]}
                    >
                        Income
                    </Text>

                    <Text
                        style={[
                            styles.value,
                            filter === 'income' &&
                            styles.activeText,
                        ]}
                    >
                        {money(income)}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() =>
                        onChangeFilter(
                            filter === 'expense' ? 'all' : 'expense'
                        )
                    }
                    style={[
                        styles.filterCard,
                        filter === 'expense' && styles.activeCard,
                    ]}
                >
                    <View
                        style={[
                            styles.arrowCircle,
                            filter === 'expense' &&
                            styles.activeArrowCircle,
                        ]}
                    >
                        <Text
                            style={[
                                styles.arrow,
                                filter === 'expense' &&
                                styles.activeArrow,
                            ]}
                        >
                            ↘
                        </Text>
                    </View>

                    <Text
                        style={[
                            styles.label,
                            filter === 'expense' &&
                            styles.activeText,
                        ]}
                    >
                        Expense
                    </Text>

                    <Text
                        style={[
                            styles.value,
                            styles.expenseValue,
                            filter === 'expense' &&
                            styles.activeText,
                        ]}
                    >
                        {money(expense)}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    balanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: FinoraRadius.md,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9,
    },

    balanceLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: FinoraColors.text,
    },

    balanceValue: {
        fontSize: 14,
        fontWeight: '800',
        color: FinoraColors.text,
        marginTop: 1,
    },

    buttons: {
        flexDirection: 'row',
        gap: 9,
    },

    filterCard: {
        flex: 1,
        height: 51,
        borderRadius: FinoraRadius.md,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeCard: {
        backgroundColor: FinoraColors.blue,
    },

    arrowCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E8FCEF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeArrowCircle: {
        backgroundColor: '#FFFFFF',
    },

    arrow: {
        fontSize: 9,
        color: FinoraColors.blue,
        fontWeight: '800',
    },

    activeArrow: {
        color: FinoraColors.blue,
    },

    label: {
        fontSize: 9,
        color: FinoraColors.text,
        marginTop: 1,
    },

    value: {
        fontSize: 10,
        fontWeight: '800',
        color: FinoraColors.text,
    },

    expenseValue: {
        color: FinoraColors.blue,
    },

    activeText: {
        color: '#FFFFFF',
    },
});