import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 12) / 2;

const photos = Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }));

export default function GalleryScreen() {
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <View style={[styles.photo, { width: ITEM_SIZE, height: ITEM_SIZE }]} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
  photo: {
    margin: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
});