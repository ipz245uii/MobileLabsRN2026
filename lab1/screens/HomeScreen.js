import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const news = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  title: 'Заголовок новини',
  date: 'Дата новини',
  text: 'Короткий текст новини',
}));

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Новини</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/60' }}
              style={styles.newsImage}
            />
            <View style={styles.newsText}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsBody}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  screenTitle: {
    fontSize: 22, fontWeight: 'bold',
    textAlign: 'center', marginVertical: 12,
  },
  newsItem: {
    flexDirection: 'row', padding: 12,
    borderBottomWidth: 0.5, borderBottomColor: '#ddd',
  },
  newsImage: {
    width: 60, height: 60,
    backgroundColor: '#eee', borderRadius: 4, marginRight: 12,
  },
  newsText: { flex: 1, justifyContent: 'center' },
  newsTitle: { fontSize: 15, fontWeight: 'bold' },
  newsDate: { fontSize: 12, color: '#999', marginTop: 2 },
  newsBody: { fontSize: 13, color: '#555', marginTop: 2 },
});