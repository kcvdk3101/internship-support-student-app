import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import logo from '../../assets/images/FITSI.png'
import CustomBadge from '../../components/common/CustomBadge'
import { notificationsData } from '../../db/NotificationData'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { CompanyStackScreen, CVStackScreen, HomeStackScreen } from './AllStackNavigator'

const Tab = createBottomTabNavigator()
const TabNavigator = (props: DrawerHeaderProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 85,
        },
        headerStyle: {
          // height: 80,
          backgroundColor: Theme.palette.white.primary,
        },
        headerLeft: () => (
          <Pressable style={styles.positionLeft} onPress={() => props.navigation.openDrawer()}>
            <Ionicons name="menu" size={28} color={Theme.palette.black.primary} />
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
              <Ionicons name="notifications" size={28} color={Theme.palette.black.primary} />
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
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          headerTitle: () => <Image source={logo} resizeMode="contain" style={styles.tinyLogo} />,
          headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
          },
        }}
      />
      <Tab.Screen
        name="CompanyTab"
        component={CompanyStackScreen}
        options={{
          tabBarLabel: 'Company',
          tabBarIcon: ({ color, size }) => <Ionicons name="business" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CVTab"
        component={CVStackScreen}
        options={{
          title: 'Your CV',
          tabBarLabel: 'CV',
          tabBarIcon: ({ color, size }) => <Ionicons name="document" color={color} size={size} />,
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
    top: 4,
    left: 16,
  },
  positionRight: {
    position: 'absolute',
    top: 4,
    right: 16,
  },
  tinyLogo: {
    height: 35,
  },
})
