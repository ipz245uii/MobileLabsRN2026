import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>У</Text>
        </View>
        <Text style={styles.name}>Ущапівський Іван Ігорович</Text>
        <Text style={styles.group}>ІПЗ-24-5</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('News')}
        >
          <Text style={styles.menuIcon}>📰</Text>
          <Text style={styles.menuText}>Новини</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate('Contacts')}
        >
          <Text style={styles.menuIcon}>👥</Text>
          <Text style={styles.menuText}>Контакти</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
    marginTop: -4,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32, fontWeight: 'bold', color: '#2196F3',
  },
  name: {
    color: '#fff', fontSize: 16,
    fontWeight: 'bold', textAlign: 'center',
  },
  group: {
    color: '#e3f2fd', fontSize: 14, marginTop: 4,
  },
  menu: { padding: 16 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 8,
    borderRadius: 8, marginBottom: 4,
  },
  menuIcon: { fontSize: 22, marginRight: 12 },
  menuText: { fontSize: 16, color: '#333' },
});