import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Помилка', 'Заповніть всі поля!');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Помилка', 'Введіть коректний email!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має бути не менше 6 символів!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не співпадають!');
      return;
    }
    try {
      setLoading(true);
      await register(email, password);
      router.replace('/(app)');
    } catch (e) {
      Alert.alert('Помилка', 'Цей email вже використовується!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>📝 Реєстрація</Text>
        <Text style={styles.subtitle}>Створіть новий акаунт</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          placeholder="Мінімум 6 символів"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Підтвердження паролю</Text>
        <TextInput
          style={styles.input}
          placeholder="Повторіть пароль"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading ? 'Завантаження...' : 'Зареєструватися'}</Text>
        </TouchableOpacity>

        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 14,
    backgroundColor: '#f9f9f9',
    color: '#2c3e50',
  },
  btn: {
    backgroundColor: '#4a90e2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#4a90e2',
    fontSize: 14,
  },
});