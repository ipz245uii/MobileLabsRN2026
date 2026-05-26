import { router } from 'expo-router';
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

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Помилка', 'Введіть email!');
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert(
        'Успіх!',
        'Лист для відновлення паролю надіслано на вашу пошту!',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (e) {
      Alert.alert('Помилка', 'Користувача з таким email не знайдено!');
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
        <Text style={styles.title}>🔑 Відновлення паролю</Text>
        <Text style={styles.subtitle}>
          Введіть ваш email і ми надішлемо посилання для відновлення паролю
        </Text>

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

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Надсилання...' : 'Надіслати лист'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>⬅️ Повернутись до входу</Text>
        </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 24,
    lineHeight: 20,
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