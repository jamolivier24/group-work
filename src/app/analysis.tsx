import { StyleSheet, Text, View } from 'react-native';

import { BottomNav } from '@/components/finora/bottom-nav';
import { FinoraColors } from '@/constants/theme';

export default function AnalysisScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analysis</Text>
            <Text style={styles.text}>
                Analyze your income and expenses
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