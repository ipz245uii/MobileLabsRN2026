import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4a90e2',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#fff' },
        headerStyle: { backgroundColor: '#4a90e2' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Головна',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Файли',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, string> = {
    home: '🏠',
    folder: '📁',
  };
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 22 }}>{icons[name]}</Text>;
}