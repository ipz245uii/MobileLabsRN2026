import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Vibration } from 'react-native';
import { useGame } from '../context/GameContext';

export default function SettingsScreen() {
  const { challenges, isDark, setIsDark } = useGame();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const completedCount = challenges.filter(ch => ch.completed).length;
  const totalCount = challenges.length;

  const colors = {
    bg: isDark ? '#1a1a2e' : '#f0f4f8',
    card: isDark ? '#16213e' : '#fff',
    text: isDark ? '#fff' : '#333',
    subtext: isDark ? '#aaa' : '#555',
  };

  const handleVibration = (val) => {
    setVibrationEnabled(val);
    if (val) Vibration.vibrate(300);
  };

  const handleDarkMode = (val) => {
    setIsDark(val);
    if (vibrationEnabled) Vibration.vibrate(200);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.subtext }]}>🔊 Sound</Text>
          <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ true: '#4A90E2' }} />
        </View>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.subtext }]}>📳 Vibration</Text>
          <Switch value={vibrationEnabled} onValueChange={handleVibration} trackColor={{ true: '#4A90E2' }} />
        </View>

        <View style={styles.row}>
          <Text style={[styles.rowText, { color: colors.subtext }]}>🌙 Dark Mode</Text>
          <Switch value={isDark} onValueChange={handleDarkMode} trackColor={{ true: '#4A90E2' }} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Progress</Text>
        <Text style={[styles.progressText, { color: colors.subtext }]}>
          Completed: {completedCount}/{totalCount} challenges
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(completedCount / totalCount) * 100}%` }]} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Challenges Status</Text>
        {challenges.map(ch => (
          <View key={ch.id} style={styles.row}>
            <Text style={[styles.rowText, { color: colors.subtext }]}>{ch.title}</Text>
            <Text style={ch.completed ? styles.done : styles.pending}>
              {ch.completed ? '✓ Done' : 'Pending'}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 20 },
  section: { marginHorizontal: 15, marginBottom: 15, borderRadius: 12, padding: 15, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rowText: { fontSize: 14 },
  progressText: { fontSize: 14, marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4A90E2', borderRadius: 4 },
  done: { fontSize: 13, color: '#4CAF50', fontWeight: 'bold' },
  pending: { fontSize: 13, color: '#aaa' },
});