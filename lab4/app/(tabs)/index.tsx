import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [totalSpace, setTotalSpace] = useState<number | null>(null);
  const [freeSpace, setFreeSpace] = useState<number | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const free = await FileSystem.getFreeDiskStorageAsync();
        const total = await FileSystem.getTotalDiskCapacityAsync();
        setFreeSpace(free);
        setTotalSpace(total);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStorage();
  }, []);

  const formatGB = (bytes: number) =>
    (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';

  const usedPercent =
    totalSpace && freeSpace
      ? Math.round(((totalSpace - freeSpace) / totalSpace) * 100)
      : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Файловий менеджер</Text>
      <Text style={styles.subtitle}>Статистика пам'яті пристрою</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : (
        <View style={styles.statsBox}>
          <View style={styles.statRow}>
            <Text style={styles.label}>💾 Загальний обсяг:</Text>
            <Text style={styles.value}>
              {totalSpace ? formatGB(totalSpace) : '—'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.label}>✅ Вільний простір:</Text>
            <Text style={[styles.value, { color: '#27ae60' }]}>
              {freeSpace ? formatGB(freeSpace) : '—'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.label}>🔴 Зайнятий простір:</Text>
            <Text style={[styles.value, { color: '#e74c3c' }]}>
              {totalSpace && freeSpace ? formatGB(totalSpace - freeSpace) : '—'}
            </Text>
          </View>

          {/* Прогрес бар */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${usedPercent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{usedPercent}% використано</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  statsBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f4f8',
    marginVertical: 4,
  },
  label: {
    fontSize: 15,
    color: '#34495e',
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a90e2',
    borderRadius: 5,
  },
  progressLabel: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 13,
    marginTop: 6,
  },
});