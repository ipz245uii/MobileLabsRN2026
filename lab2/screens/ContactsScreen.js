import {
  View, Text, SectionList, StyleSheet
} from 'react-native';
import { contactsData } from '../data/newsData';

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      ListHeaderComponent={
        <Text style={styles.header}>Контакти</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24, fontWeight: 'bold',
    textAlign: 'center', padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionHeader: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: 'bold', color: '#1565C0',
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#2196F3',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  phone: { fontSize: 13, color: '#555', marginTop: 2 },
  email: { fontSize: 13, color: '#2196F3', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#eee' },
});