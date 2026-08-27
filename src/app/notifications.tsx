import React from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

type NotificationItem = {
    id: string;
    type: 'reminder' | 'update' | 'transaction' | 'expense';
    title: string;
    message: string;
    time: string;
    date: string;
    details?: string;
};

const notifications: NotificationItem[] = [
    {
        id: '1',
        type: 'reminder',
        title: 'Reminder!',
        message:
            'Set up your automatic savings to meet your savings goal...',
        time: '17:00',
        date: 'April 24',
    },
    {
        id: '2',
        type: 'update',
        title: 'New Update',
        message:
            'Set up your automatic savings to meet your savings goal...',
        time: '17:00',
        date: 'April 24',
    },
    {
        id: '3',
        type: 'transaction',
        title: 'Transactions',
        message: 'A new transaction has been registered',
        details: 'Groceries | Pantry | -$100.00',
        time: '17:00',
        date: 'April 24',
    },
    {
        id: '4',
        type: 'reminder',
        title: 'Reminder!',
        message:
            'Set up your automatic savings to meet your savings goal...',
        time: '17:00',
        date: 'April 24',
    },
    {
        id: '5',
        type: 'expense',
        title: 'Expense Record',
        message:
            'We noticed that you have more activities for your finances.',
        time: '17:00',
        date: 'April 24',
    },
    {
        id: '6',
        type: 'transaction',
        title: 'Transactions',
        message: 'A new transaction has been registered',
        details: 'Food | Dinner | -$20.00',
        time: '17:00',
        date: 'April 24',
    },
];

const sections = [
    {
        title: 'Today',
        ids: ['1', '2'],
    },
    {
        title: 'Yesterday',
        ids: ['3', '4'],
    },
    {
        title: 'This Weekend',
        ids: ['5', '6'],
    },
];

function getIcon(type: NotificationItem['type']) {
    switch (type) {
        case 'reminder':
            return 'notifications-outline';

        case 'update':
            return 'star-outline';

        case 'transaction':
            return 'cash-outline';

        case 'expense':
            return 'trending-down-outline';

        default:
            return 'notifications-outline';
    }
}

function NotificationCard({
    item,
}: {
    item: NotificationItem;
}) {
    return (
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={getIcon(item.type)}
                    size={21}
                    color="#071E18"
                />
            </View>

            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                    {item.title}
                </Text>

                <Text style={styles.notificationMessage}>
                    {item.message}
                </Text>

                {item.details && (
                    <Text style={styles.details}>
                        {item.details}
                    </Text>
                )}

                <Text style={styles.notificationDate}>
                    {item.time} • {item.date}
                </Text>
            </View>
        </View>
    );
}

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.headerButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color="#FFFFFF"
                        />
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Notification
                    </Text>

                    <Pressable style={styles.headerButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={21}
                            color="#FFFFFF"
                        />
                    </Pressable>
                </View>

                {/* NOTIFICATIONS */}
                <View style={styles.content}>
                    <FlatList
                        data={sections}
                        keyExtractor={(section) => section.title}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item: section }) => (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    {section.title}
                                </Text>

                                {section.ids.map((id) => {
                                    const notification = notifications.find(
                                        (item) => item.id === id
                                    );

                                    if (!notification) {
                                        return null;
                                    }

                                    return (
                                        <NotificationCard
                                            key={notification.id}
                                            item={notification}
                                        />
                                    );
                                })}
                            </View>
                        )}
                    />
                </View>

                {/* BOTTOM NAVIGATION */}
                <View style={styles.bottomNavigation}>
                    <Pressable
                        style={styles.navItem}
                        onPress={() => router.push('/')}
                    >
                        <Ionicons
                            name="home-outline"
                            size={23}
                            color="#10251F"
                        />
                    </Pressable>

                    <Pressable style={styles.navItem}>
                        <Ionicons
                            name="bar-chart-outline"
                            size={23}
                            color="#10251F"
                        />
                    </Pressable>

                    <Pressable style={styles.navItem}>
                        <Ionicons
                            name="swap-horizontal-outline"
                            size={25}
                            color="#10251F"
                        />
                    </Pressable>

                    <Pressable style={styles.navItem}>
                        <Ionicons
                            name="layers-outline"
                            size={23}
                            color="#10251F"
                        />
                    </Pressable>

                    <Pressable style={styles.navItem}>
                        <Ionicons
                            name="person-outline"
                            size={23}
                            color="#10251F"
                        />
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 57,
        backgroundColor: '#08C9A0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },

    headerButton: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        color: '#071E18',
        fontSize: 16,
        fontWeight: '700',
    },

    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: 'hidden',
    },

    listContent: {
        paddingHorizontal: 18,
        paddingTop: 13,
        paddingBottom: 20,
    },

    section: {
        marginBottom: 5,
    },

    sectionTitle: {
        fontSize: 9,
        fontWeight: '600',
        color: '#17362D',
        marginBottom: 5,
        marginTop: 2,
    },

    notificationCard: {
        flexDirection: 'row',
        minHeight: 69,
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#62DCC1',
    },

    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 9,
        backgroundColor: '#08C9A0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
        marginTop: 1,
    },

    notificationContent: {
        flex: 1,
    },

    notificationTitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#10251F',
        marginBottom: 2,
    },

    notificationMessage: {
        fontSize: 8,
        lineHeight: 11,
        color: '#354740',
        paddingRight: 10,
    },

    details: {
        fontSize: 7,
        fontWeight: '600',
        color: '#238BFF',
        marginTop: 2,
    },

    notificationDate: {
        fontSize: 7,
        color: '#238BFF',
        textAlign: 'right',
        marginTop: 3,
    },

    bottomNavigation: {
        height: 62,
        backgroundColor: '#DFF9E9',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
    },

    navItem: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
});