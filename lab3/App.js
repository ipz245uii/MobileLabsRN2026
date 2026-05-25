import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { GameProvider } from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
            tabBarActiveTintColor: '#4A90E2',
            tabBarInactiveTintColor: '#aaa',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>▶</Text>, tabBarLabel: '' }}
          />
          <Tab.Screen
            name="Challenges"
            component={ChallengesScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>☰</Text>, tabBarLabel: '' }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>⚙</Text>, tabBarLabel: '' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}