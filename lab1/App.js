import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FirstMobileApp</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          tabBarPosition="top"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if (route.name === 'Головна') iconName = 'home';
              else if (route.name === 'Фотогалерея') iconName = 'images';
              else if (route.name === 'Профіль') iconName = 'person';
              return <Ionicons name={iconName} size={22} color={color} />;
            },
            tabBarShowIcon: true,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: { backgroundColor: '#fff', elevation: 2 },
            tabBarIndicatorStyle: { backgroundColor: '#007AFF' },
            tabBarLabelStyle: { fontSize: 11 },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ущапівський Іван Ігорович, ІПЗ-24-5</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  footer: {
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: { fontSize: 13, color: '#888', fontStyle: 'italic' },
});