import { useState, useCallback } from 'react';
import {
  View, Text, Image, FlatList,
  TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { initialNews, generateNews } from '../data/newsData';

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNews(1, 10));
      setPage(2);
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = generateNews(page * 10 + 1, 10);
      setNews(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
      ListHeaderComponent={
        <Text style={styles.header}>Новини</Text>
      }
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#2196F3" style={{ padding: 16 }} /> : null
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24, fontWeight: 'bold',
    textAlign: 'center', padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: { backgroundColor: '#fff', margin: 8, borderRadius: 8, elevation: 2 },
  image: { width: '100%', height: 180, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  content: { padding: 12 },
  category: { color: '#2196F3', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  date: { fontSize: 12, color: '#888', marginBottom: 4 },
  description: { fontSize: 14, color: '#555' },
  separator: { height: 1, backgroundColor: '#eee', marginHorizontal: 8 },
});