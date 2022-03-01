import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { Pressable, View } from 'react-native'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import {
  CompanyStackScreen,
  CVStackScreen,
  HomeStackScreen,
} from './AllStackNavigator'
import CustomBadge from '../../components/common/CustomBadge'
import { notificationsData } from '../../db/NotificationData'

const Tab = createBottomTabNavigator()
const TabNavigator = (props: DrawerHeaderProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 50,
        },
        headerLeft: () => (
          <Pressable
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
            }}
            onPress={() => props.navigation.openDrawer()}
          >
            <Ionicons
              name="menu"
              size={28}
              color={Theme.palette.black.primary}
            />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onPress={() => {
              props.navigation.navigate('Notifications')
            }}
          >
            <View>
              <Ionicons
                name="notifications"
                size={28}
                color={Theme.palette.black.primary}
              />
              <CustomBadge
                visible={notificationsData.length > 0}
                size={12}
                bgColor={Theme.palette.main.primary}
              />
            </View>
          </Pressable>
        ),
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
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
          headerShown: isAuthenticated ? true : false,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
