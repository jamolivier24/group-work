import { StyleSheet, Text, View } from 'react-native';

import { BottomNav } from '@/components/finora/bottom-nav';
import { FinoraColors } from '@/constants/theme';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <Text style={styles.text}>
                Manage your account
            </Text>

            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FinoraColors.background,
        padding: 25,
        paddingTop: 60,
    },

    title: {
        color: FinoraColors.text,
        fontSize: 28,
        fontWeight: '800',
    },

    text: {
        color: FinoraColors.textSecondary,
        marginTop: 10,
    },
});