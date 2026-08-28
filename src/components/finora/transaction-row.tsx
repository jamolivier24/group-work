import { StyleSheet, Text, View } from 'react-native';

import {
    FinoraCategoryColors,
    FinoraColors
} from '@/constants/theme';

import type { Transaction } from '@/data/finora';

import { CategoryIcon } from './icons';

type Props = {
    transaction: Transaction;
};

export function TransactionRow({
    transaction,
}: Props) {
    const background =
        FinoraCategoryColors[transaction.category] ??
        FinoraColors.primary;

    const amount =
        transaction.type === 'income'
            ? `$${transaction.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
            })}`
            : `-$${transaction.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
            })}`;

    return (
        <View style={styles.row}>
            <View
                style={[
                    styles.icon,
                    {
                        backgroundColor: background,
                    },
                ]}
            >
                <CategoryIcon
                    category={transaction.category}
                    size={18}
                    color="#FFFFFF"
                />
            </View>

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {transaction.title}
                </Text>

                <Text style={styles.date}>
                    {transaction.date}
                </Text>
            </View>

            <View style={styles.separator} />

            <Text style={styles.tag} numberOfLines={1}>
                {transaction.tag}
            </Text>

            <View style={styles.separator} />

            <Text
                style={[
                    styles.amount,
                    transaction.type === 'income'
                        ? styles.income
                        : styles.expense,
                ]}
            >
                {amount}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        minHeight: 43,
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        width: 29,
        height: 29,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    info: {
        flex: 1.5,
        justifyContent: 'center',
    },

    title: {
        color: FinoraColors.text,
        fontSize: 10,
        fontWeight: '700',
    },

    date: {
        color: FinoraColors.blue,
        fontSize: 7,
        fontWeight: '600',
        marginTop: 2,
    },

    separator: {
        width: 1,
        height: 25,
        backgroundColor: FinoraColors.primary,
        opacity: 0.5,
        marginHorizontal: 6,
    },

    tag: {
        flex: 0.8,
        color: FinoraColors.textSecondary,
        fontSize: 7,
        textAlign: 'center',
    },

    amount: {
        flex: 0.85,
        fontSize: 9,
        fontWeight: '800',
        textAlign: 'right',
    },

    income: {
        color: FinoraColors.text,
    },

    expense: {
        color: FinoraColors.blue,
    },
});