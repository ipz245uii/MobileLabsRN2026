import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Новини' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params.item.title })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Новини" component={NewsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Контакти" component={ContactsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}