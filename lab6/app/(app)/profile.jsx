import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout, getUserProfile, updateUserProfile } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setName(profile.name || '');
          setAge(profile.age || '');
          setCity(profile.city || '');
        }
      } catch (e) {
        Alert.alert('Помилка', 'Не вдалося завантажити профіль.');
      } finally {
        setFetching(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Помилка', "Введіть ім'я!");
      return;
    }
    try {
      setLoading(true);
      await updateUserProfile({ name, age, city });
      Alert.alert('Успіх!', 'Профіль оновлено.');
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося оновити профіль.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Вийти',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    router.push('/delete-account');
  };

  if (fetching) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Завантаження...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Мій профіль</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введіть ім'я"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Вік</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Введіть вік"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Місто</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Введіть місто"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Збереження...' : 'Зберегти'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Вийти з акаунту</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Видалити акаунт</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  inner: { padding: 24, paddingTop: 48 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { fontSize: 16, color: '#666' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 },
  email: { fontSize: 14, color: '#888', marginBottom: 32 },
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#4f46e5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutText: { color: '#4f46e5', fontSize: 16, fontWeight: '600' },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  deleteText: { color: '#ef4444', fontSize: 16, fontWeight: '600' },
});