import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import Theme from '../../utils/Theme'
import { useAppSelector } from '../../hooks/redux'
import Avatar from '../../components/avatar/Avatar'
import { Ionicons } from '@expo/vector-icons'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.innerContainer}>
          {user && (
            <Avatar
              image={user.image}
              firstName={user.firstName}
              lastName={user.lastName}
              phone={user.phone}
            />
          )}
          <DrawerItem
            labelStyle={{
              color: Theme.palette.white.primary,
              ...Theme.fonts.headline.h6,
            }}
            icon={() => (
              <Ionicons
                name="home"
                color={Theme.palette.white.primary}
                size={24}
              />
            )}
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            labelStyle={{
              color: Theme.palette.white.primary,
              ...Theme.fonts.headline.h6,
            }}
            icon={() => (
              <Ionicons
                name="document-sharp"
                color={Theme.palette.white.primary}
                size={24}
              />
            )}
            label="Your CV"
            onPress={() => props.navigation.navigate('CV')}
          />
          <DrawerItem
            labelStyle={{
              color: Theme.palette.white.primary,
              ...Theme.fonts.headline.h6,
            }}
            icon={() => (
              <Ionicons
                name="bookmark"
                color={Theme.palette.white.primary}
                size={24}
              />
            )}
            label="Applied"
            onPress={() => props.navigation.navigate('Applied')}
          />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Theme.palette.main.primary,
  },
  innerContainer: {
    paddingHorizontal: 8,
  },
})
