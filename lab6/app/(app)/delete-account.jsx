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

export default function DeleteAccountScreen() {
  const { deleteAccount } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password.trim()) {
      Alert.alert('Помилка', 'Введіть пароль!');
      return;
    }
    Alert.alert(
      'Підтвердження',
      'Акаунт буде видалено назавжди. Продовжити?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteAccount(password);
              router.replace('/login');
            } catch (e) {
              if (e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
                Alert.alert('Помилка', 'Невірний пароль!');
              } else {
                Alert.alert('Помилка', 'Не вдалося видалити акаунт.');
              }
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Видалення акаунту</Text>
        <Text style={styles.subtitle}>
          Для підтвердження введіть ваш пароль. Після видалення всі дані будуть втрачені.
        </Text>

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Введіть пароль"
          placeholderTextColor="#999"
          secureTextEntry
          autoFocus
        />

        <TouchableOpacity
          style={[styles.deleteButton, loading && styles.buttonDisabled]}
          onPress={handleDelete}
          disabled={loading}
        >
          <Text style={styles.deleteText}>
            {loading ? 'Видалення...' : 'Видалити акаунт'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Скасувати</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  inner: { flex: 1, padding: 24, paddingTop: 48 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 32, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: { opacity: 0.6 },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: { color: '#555', fontSize: 16, fontWeight: '600' },
});