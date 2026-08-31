import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const palette = {
  ink: '#173B3D',
  background: '#F2F7F1',
  mint: '#D9F3DF',
  teal: '#08C7A1',
  muted: '#668381',
  line: '#CFE5D6',
};

type AuthMode = 'login' | 'signup' | 'forgot';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  const submit = async () => {
    if (!email.trim() || !email.includes('@') || !email.includes('gmail.com')) {
      setMessage('Enter a valid email address to continue.');
      return;
    }
    if (mode !== 'forgot' && password.length < 6) {
      setMessage('Your password needs at least 6 characters.');
      return;
    }
    setLoading(true);
    setMessage('');
    await new Promise((resolve) => setTimeout(resolve, 350));
    setLoading(false);
    if (mode === 'forgot') {
      setMessage('Demo mode does not send emails. Return to log in and enter any valid email and password.');
      return;
    }
    router.replace({ pathname: '/', params: { demoEmail: email.trim() } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.shell}>
            <View style={styles.brandRow}>
              <View style={styles.logoMark}><Text style={styles.logoSymbol}>F</Text></View>
              <Text style={styles.brand}>FINORA</Text>
            </View>
            <View style={styles.intro}>
              <Text style={styles.eyebrow}>YOUR MONEY, MADE CLEAR</Text>
              <Text style={styles.title}>{mode === 'forgot' ? 'Reset your password.' : isSignup ? 'Start your better money story.' : 'Make every dollar count.'}</Text>
              <Text style={styles.subtitle}>{mode === 'forgot' ? 'We will help you get back to your financial plan.' : 'See where your money goes, build healthier habits, and save with confidence.'}</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.switcher}>
                <Pressable onPress={() => { setMode('login'); setMessage(''); }} style={[styles.switchItem, mode === 'login' && styles.switchItemActive]}><Text style={[styles.switchText, mode === 'login' && styles.switchTextActive]}>Log in</Text></Pressable>
                <Pressable onPress={() => { setMode('signup'); setMessage(''); }} style={[styles.switchItem, isSignup && styles.switchItemActive]}><Text style={[styles.switchText, isSignup && styles.switchTextActive]}>Sign up</Text></Pressable>
              </View>
              {isSignup && <Field label="Full name" placeholder="Your full name" value={name} onChangeText={setName} />}
              <Field label="Email address" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              {mode !== 'forgot' && <Field label="Password" placeholder="At least 6 characters" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'} onRightPress={() => setShowPassword(!showPassword)} />}
              {!!message && <Text style={[styles.message, mode === 'forgot' && styles.success]}>{message}</Text>}
              <Pressable disabled={loading} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, loading && styles.disabled]} onPress={submit}>
                <Text style={styles.primaryButtonText}>{loading ? 'Working...' : mode === 'forgot' ? 'Send reset link' : isSignup ? 'Create account' : 'Log in'}</Text>
                <Ionicons name="arrow-forward" size={18} color={palette.ink} />
              </Pressable>
              {mode === 'login' && <Pressable onPress={() => { setMode('forgot'); setMessage(''); }}><Text style={styles.forgot}>Forgot password?</Text></Pressable>}
              {mode === 'forgot' && <Pressable onPress={() => { setMode('login'); setMessage(''); }}><Text style={styles.forgot}>Back to log in</Text></Pressable>}
            </View>
            <View style={styles.trustRow}><Ionicons name="shield-checkmark-outline" size={18} color={palette.teal} /><Text style={styles.trustText}>Your financial data is private and protected.</Text></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, rightIcon, onRightPress, ...props }: React.ComponentProps<typeof TextInput> & { label: string; rightIcon?: keyof typeof Ionicons.glyphMap; onRightPress?: () => void }) {
  return <View style={styles.fieldGroup}><Text style={styles.label}>{label}</Text><View style={styles.inputWrap}><TextInput {...props} placeholderTextColor="#8BA69A" style={styles.input} />{rightIcon && <Pressable onPress={onRightPress} hitSlop={10}><Ionicons name={rightIcon} size={18} color={palette.muted} /></Pressable>}</View></View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safeArea: { flex: 1, backgroundColor: palette.ink }, scrollContent: { flexGrow: 1, padding: 20, justifyContent: 'center' }, shell: { width: '100%', maxWidth: 460, alignSelf: 'center' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 42 }, logoMark: { width: 34, height: 34, borderRadius: 17, backgroundColor: palette.teal, justifyContent: 'center', alignItems: 'center' }, logoSymbol: { color: palette.ink, fontSize: 22, fontWeight: '800' }, brand: { color: '#F2F7F1', fontSize: 19, fontWeight: '800', letterSpacing: 2 }, intro: { marginBottom: 28 }, eyebrow: { color: palette.teal, fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 }, title: { color: '#F2F7F1', fontSize: 36, lineHeight: 41, fontWeight: '800', marginBottom: 12 }, subtitle: { color: '#B6CEBF', fontSize: 15, lineHeight: 22, maxWidth: 390 }, card: { backgroundColor: palette.background, borderRadius: 24, padding: 22 }, switcher: { flexDirection: 'row', backgroundColor: palette.mint, borderRadius: 12, padding: 4, marginBottom: 24 }, switchItem: { flex: 1, alignItems: 'center', paddingVertical: 11, borderRadius: 9 }, switchItemActive: { backgroundColor: '#FFFFFF' }, switchText: { color: palette.muted, fontSize: 14, fontWeight: '700' }, switchTextActive: { color: palette.ink }, fieldGroup: { marginBottom: 16 }, label: { color: palette.ink, fontSize: 12, fontWeight: '700', marginBottom: 7 }, inputWrap: { minHeight: 50, borderWidth: 1, borderColor: palette.line, backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' }, input: { flex: 1, color: palette.ink, fontSize: 15, paddingVertical: 13 }, primaryButton: { minHeight: 52, backgroundColor: palette.teal, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 8 }, pressed: { opacity: 0.82 }, disabled: { opacity: 0.58 }, primaryButtonText: { color: palette.ink, fontSize: 15, fontWeight: '800' }, forgot: { color: palette.ink, fontSize: 13, fontWeight: '700', textAlign: 'center', marginTop: 19 }, message: { color: '#B04B4B', fontSize: 12, marginTop: -3, marginBottom: 5 }, success: { color: '#22866D' }, trustRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 24 }, trustText: { color: '#9DBBAD', fontSize: 12 },
});
