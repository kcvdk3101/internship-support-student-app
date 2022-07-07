import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerHeaderProps } from '@react-navigation/drawer'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, StyleSheet } from 'react-native'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { CompanyStackScreen, CVStackScreen, HomeStackScreen } from './AllStackNavigator'

const Tab = createBottomTabNavigator()
const TabNavigator = (props: DrawerHeaderProps) => {
  const { t } = useTranslation()

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.palette.main.third,
        tabBarStyle: {
          height: 85,
        },
        headerStyle: {
          backgroundColor: 'white',
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
            <Ionicons name="notifications" size={28} color={Theme.palette.black.primary} />
          </Pressable>
        ),
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('Home'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          headerTitle: () => (
            <Image
              source={require('../../assets/images/huflit.png')}
              resizeMode="contain"
              style={styles.tinyLogo}
            />
          ),
          headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            backgroundColor: 'white',
          },
        }}
      />
      <Tab.Screen
        name="CompanyTab"
        component={CompanyStackScreen}
        options={{
          tabBarLabel: t('Company'),
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
          headerTitle: () => (
            <Image
              source={require('../../assets/images/huflit.png')}
              resizeMode="contain"
              style={styles.tinyLogo}
            />
          ),
          headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
          },
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
    width: 90,
  },
})
