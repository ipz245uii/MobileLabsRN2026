import React from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} placeholder="email@example.com" keyboardType="email-address" />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} placeholder="Повторіть пароль" secureTextEntry />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} placeholder="Прізвище" />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} placeholder="Ім'я" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    fontSize: 22, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 20,
  },
  label: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 4 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#ccc',
    paddingVertical: 8, fontSize: 15, marginBottom: 4,
  },
  button: {
    backgroundColor: '#007AFF', borderRadius: 8,
    padding: 14, alignItems: 'center', marginTop: 24,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});