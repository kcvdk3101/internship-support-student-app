import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import CustomBadge from '../../components/common/CustomBadge'
import { notificationsData } from '../../db/NotificationData'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import {
  CompanyStackScreen,
  CVStackScreen,
  HomeStackScreen,
} from './AllStackNavigator'
import logo from '../../assets/images/FITSI.png'

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
        headerStyle: {
          height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable
            style={styles.positionLeft}
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
            style={styles.positionRight}
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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitle: () => (
            <Image style={styles.tinyLogo} source={logo} resizeMode="center" />
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

const styles = StyleSheet.create({
  positionLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  positionRight: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  tinyLogo: {
    // width: 50,
    height: 30,
  },
})
