export type TransactionCategory =
  | 'shopping'
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'salary'
  | 'freelance'
  | 'bills'
  | 'other';

export type Transaction = {
  id: string;
  title: string;
  category: TransactionCategory;
  date: string;
  tag: string;
  month: string;
  amount: number;
  type: 'income' | 'expense';
};

export const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary',
    category: 'salary',
    date: '18:27 - April 30',
    tag: 'Monthly',
    month: 'April',
    amount: 4000,
    type: 'income',
  },

  {
    id: '2',
    title: 'Groceries',
    category: 'shopping',
    date: '17:00 - April 24',
    tag: 'Pantry',
    month: 'April',
    amount: 100,
    type: 'expense',
  },

  {
    id: '3',
    title: 'Rent',
    category: 'bills',
    date: '8:30 - April 15',
    tag: 'Rent',
    month: 'April',
    amount: 674.4,
    type: 'expense',
  },

  {
    id: '4',
    title: 'Transport',
    category: 'transport',
    date: '7:30 - April 08',
    tag: 'Fuel',
    month: 'April',
    amount: 4.13,
    type: 'expense',
  },

  {
    id: '5',
    title: 'Food',
    category: 'food',
    date: '19:30 - March 31',
    tag: 'Dinner',
    month: 'March',
    amount: 70.4,
    type: 'expense',
  },

  {
    id: '6',
    title: 'Salary',
    category: 'salary',
    date: '18:39 - March 31',
    tag: 'Monthly',
    month: 'March',
    amount: 4000,
    type: 'income',
  },

  {
    id: '7',
    title: 'Others',
    category: 'other',
    date: '8:30 - March 12',
    tag: 'Upwork',
    month: 'March',
    amount: 340,
    type: 'income',
  },

  {
    id: '8',
    title: 'Others',
    category: 'other',
    date: '10:30 - February 20',
    tag: 'Upwork',
    month: 'February',
    amount: 340,
    type: 'income',
  },
];

export type AccountSummary = {
  balance: number;
  balanceChangePercent: number;
  income: number;
  expense: number;
  budget: number;
  goalAmount: number;
  goalPercent: number;
};

export const accountSummary: AccountSummary = {
  balance: 7783,
  balanceChangePercent: 22.55,
  income: 4120,
  expense: 1187.4,
  budget: 5000,
  goalAmount: 20000,
  goalPercent: 30,
};