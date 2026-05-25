import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

export default function ChallengesScreen() {
  const { challenges, isDark } = useGame();

  const colors = {
    bg: isDark ? '#1a1a2e' : '#f0f4f8',
    card: isDark ? '#16213e' : '#fff',
    text: isDark ? '#fff' : '#333',
    subtext: isDark ? '#aaa' : '#888',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Challenges</Text>
      <ScrollView>
        {challenges.map((ch) => (
          <View key={ch.id} style={[styles.challengeItem, { backgroundColor: colors.card }]}>
            <View style={styles.challengeInfo}>
              <Text style={[styles.challengeTitle, { color: colors.text }]}>{ch.title}</Text>
              <Text style={[styles.challengeDesc, { color: colors.subtext }]}>{ch.description}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min((ch.progress / ch.target) * 100, 100)}%` },
                    ch.completed && styles.progressCompleted,
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colors.subtext }]}>{ch.progress}/{ch.target}</Text>
            </View>
            <View style={[styles.statusCircle, ch.completed && styles.statusCompleted]}>
              {ch.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 20 },
  challengeItem: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 15, marginBottom: 10, borderRadius: 12,
    padding: 15, elevation: 2,
  },
  challengeInfo: { flex: 1 },
  challengeTitle: { fontSize: 15, fontWeight: 'bold' },
  challengeDesc: { fontSize: 12, marginTop: 2 },
  progressBar: {
    height: 4, backgroundColor: '#eee', borderRadius: 2,
    marginTop: 8, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#4A90E2', borderRadius: 2 },
  progressCompleted: { backgroundColor: '#4CAF50' },
  progressText: { fontSize: 11, marginTop: 3 },
  statusCircle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#ddd',
    justifyContent: 'center', alignItems: 'center', marginLeft: 10,
  },
  statusCompleted: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});