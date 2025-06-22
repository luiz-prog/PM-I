import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Perfil from '../screens/Perfil';
import Resenhas from '../screens/Resenhas';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = route.name === 'Perfil' ? 'person' : 'book';
          return <Ionicons name={focused ? iconName : `${iconName}-outline`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#001f3f',
          borderTopColor: '#001f3f',
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#001f3f',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Resenhas" component={Resenhas} />
    </Tab.Navigator>
  );
};

export default TabNavigator;