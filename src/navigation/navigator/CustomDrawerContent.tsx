import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import Theme from '../../utils/Theme'
import { useAppSelector } from '../../hooks/redux'
import Avatar from '../../components/avatar/Avatar'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Drawer } from 'react-native-paper'
import OpenURLButton from '../../components/buttons/OpenURLButton'
import { drawers, socialLinks } from '../../constant'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.innerContainer}>
          <Drawer.Section>
            {user && (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Account')}
              >
                <Avatar
                  image={user.image}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  phone={user.phone}
                />
              </TouchableOpacity>
            )}
            {drawers.map((drw, index) => (
              <DrawerItem
                key={index}
                labelStyle={{
                  color: Theme.palette.white.primary,
                  ...Theme.fonts.body.body1,
                }}
                icon={() => (
                  <Ionicons
                    name={
                      drw.icon === 'home'
                        ? 'home'
                        : drw.icon === 'archive'
                        ? 'archive'
                        : 'call'
                    }
                    color={Theme.palette.white.primary}
                    size={24}
                  />
                )}
                label={drw.label}
                onPress={() => props.navigation.navigate(drw.navigate)}
              />
            ))}
            {/* <DrawerItem
              labelStyle={{
                color: Theme.palette.white.primary,
                ...Theme.fonts.body.body1,
              }}
              icon={() => (
                <Ionicons
                  name="home"
                  color={Theme.palette.white.primary}
                  size={24}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('HomeStack')}
            />
            <DrawerItem
              labelStyle={{
                color: Theme.palette.white.primary,
                ...Theme.fonts.body.body1,
              }}
              icon={() => (
                <Ionicons
                  name="call"
                  color={Theme.palette.white.primary}
                  size={24}
                />
              )}
              label="Contact"
              onPress={() => props.navigation.navigate('Contact')}
            />
            <DrawerItem
              labelStyle={{
                color: Theme.palette.white.primary,
                ...Theme.fonts.body.body1,
              }}
              icon={() => (
                <Ionicons
                  name="archive"
                  color={Theme.palette.white.primary}
                  size={24}
                />
              )}
              label="Applied Job"
              onPress={() => props.navigation.navigate('Applied')}
            /> */}
          </Drawer.Section>
          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <OpenURLButton url={link.path} key={index}>
                <Ionicons
                  name={
                    link.icon === 'logo-facebook'
                      ? 'logo-facebook'
                      : link.icon === 'logo-youtube'
                      ? 'logo-youtube'
                      : 'logo-github'
                  }
                  color={link.color}
                  size={24}
                />
              </OpenURLButton>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={() => (
            <Ionicons name="exit" color={Theme.palette.red.signOut} size={24} />
          )}
          label="Sign out"
          labelStyle={{
            ...Theme.fonts.body.body1,
            color: Theme.palette.red.signOut,
          }}
          onPress={() => props.navigation.navigate('Home')}
          style={{
            paddingHorizontal: 16,
            backgroundColor: Theme.palette.white.primary,
          }}
        />
      </Drawer.Section>
    </SafeAreaView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.primary,
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
})