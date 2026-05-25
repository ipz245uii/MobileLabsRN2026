import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Vibration } from 'react-native';
import { useGame } from '../context/GameContext';

export default function HomeScreen() {
  const { score, addScore, updateChallenge, isDark } = useGame();
  const [feedback, setFeedback] = useState('');
  const lastTap = useRef(0);
  const pressTimer = useRef(null);
  const swipeHandled = useRef(false);
  const startX = useRef(0);

  const showFeedback = (text) => {
    setFeedback(text);
    setTimeout(() => setFeedback(''), 800);
  };

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      addScore(2);
      updateChallenge('doubleTap');
      showFeedback('+2 DOUBLE!');
    } else {
      addScore(1);
      updateChallenge('tap');
      updateChallenge('tap50');
      showFeedback('+1');
    }
    lastTap.current = now;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (e, gs) => Math.abs(gs.dx) > 10,
    onPanResponderGrant: (e) => {
      swipeHandled.current = false;
      startX.current = e.nativeEvent.pageX;
      pressTimer.current = setTimeout(() => {
        addScore(5);
        updateChallenge('longPress');
        Vibration.vibrate(500);
        showFeedback('+5 LONG PRESS!');
      }, 3000);
    },
    onPanResponderMove: (e, gs) => {
      if (!swipeHandled.current && Math.abs(gs.dx) > 80) {
        swipeHandled.current = true;
        clearTimeout(pressTimer.current);
        const points = Math.floor(Math.random() * 10) + 1;
        addScore(points);
        if (gs.dx > 0) {
          updateChallenge('swipeRight');
          showFeedback(`+${points} SWIPE RIGHT!`);
        } else {
          updateChallenge('swipeLeft');
          showFeedback(`+${points} SWIPE LEFT!`);
        }
        Vibration.vibrate(200);
      }
    },
    onPanResponderRelease: () => {
      clearTimeout(pressTimer.current);
      if (!swipeHandled.current) {
        handleTap();
      }
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a2e' : '#f0f4f8' }]}>
      <Text style={styles.title}>Gesture Clicker</Text>
      <Text style={styles.scoreLabel}>SCORE</Text>
      <Text style={styles.scoreValue}>{score}</Text>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : <Text style={styles.feedbackEmpty}> </Text>}

      <View
        {...panResponder.panHandlers}
        style={[styles.clicker]}
      >
        <Text style={styles.clickerText}>TAP ME</Text>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>👆 Tap: +1 point</Text>
        <Text style={styles.legendText}>👆👆 Double-tap: +2 points</Text>
        <Text style={styles.legendText}>🔒 Long-press (3s): +5 points</Text>
        <Text style={styles.legendText}>↔️ Swipe: +1-10 random points</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  scoreLabel: { fontSize: 14, color: '#888', letterSpacing: 2 },
  scoreValue: { fontSize: 64, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  feedback: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 10 },
  feedbackEmpty: { fontSize: 24, marginBottom: 10 },
  clicker: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#4A90E2', justifyContent: 'center',
    alignItems: 'center', elevation: 8, shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5,
    marginTop: 20,
  },
  clickerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  legend: {
    position: 'absolute', bottom: 100, left: 20, right: 20,
    backgroundColor: '#fff', borderRadius: 12, padding: 15, elevation: 3,
  },
  legendText: { fontSize: 13, color: '#555', marginBottom: 4 },
});