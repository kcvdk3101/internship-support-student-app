import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  CompanyStackScreen,
  CVStackScreen,
  HomeStackScreen,
} from './AllStackNavigator'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../utils/Theme'

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 50,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CompanyTab"
        component={CompanyStackScreen}
        options={{
          tabBarLabel: 'Company',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CVTab"
        component={CVStackScreen}
        options={{
          tabBarLabel: 'CV',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
