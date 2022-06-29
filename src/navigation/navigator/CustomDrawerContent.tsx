import { Alert, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import Theme from '../../utils/Theme'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Avatar from '../../components/avatar/Avatar'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Drawer } from 'react-native-paper'
import OpenURLButton from '../../components/buttons/OpenURLButton'
import { drawers } from '../../constant'
import { logout } from '../../features/authenticationSlice'
import GeneralButton from '../../components/buttons/GeneralButton'
import AuthenticationScreen from '../../screens/authentication/AuthenticationScreen'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  function handleLogout(props: DrawerContentComponentProps) {
    return Alert.alert('Logout', 'Are you sure ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          const response = await dispatch(logout())
          if (response.meta.requestStatus === 'fulfilled') {
            props.navigation.navigate('HomeTab')
            props.navigation.closeDrawer()
            Alert.alert('Logout successfully')
          } else {
            Alert.alert('Something wrong!')
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.innerContainer}>
          <Drawer.Section>
            {isAuthenticated ? (
              <TouchableOpacity onPress={() => props.navigation.navigate('Account')}>
                <Avatar firstName={user.firstName as string} lastName={user.lastName as string} />
              </TouchableOpacity>
            ) : (
              <GeneralButton
                bgColor={Theme.palette.main.primary}
                onPress={handleOpenModal}
                isLoading={false}
                label="Sign in"
                isAlignCenter={true}
                txtColor={Theme.palette.white.primary}
              />
            )}
            {drawers.map((drw, index) => (
              <DrawerItem
                key={index}
                labelStyle={{
                  color: Theme.palette.main.primary,
                  ...Theme.fonts.body.body1,
                }}
                icon={() => (
                  <Ionicons
                    name={
                      drw.icon === 'home'
                        ? 'home'
                        : drw.icon === 'business'
                        ? 'business'
                        : drw.icon === 'document'
                        ? 'document'
                        : 'archive'
                    }
                    color={Theme.palette.main.primary}
                    size={24}
                  />
                )}
                label={drw.label}
                onPress={() => props.navigation.navigate(drw.navigate)}
              />
            ))}
          </Drawer.Section>
          <View style={styles.socialLinks}>
            <OpenURLButton url="https://www.facebook.com/nhan.ho.14019">
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../../assets/images/facebook.png')}
              />
            </OpenURLButton>
            <OpenURLButton url="https://www.youtube.com/channel/UC4F4wansipyY1b5FnrA2xOQ">
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../../assets/images/youtube.png')}
              />
            </OpenURLButton>
            <OpenURLButton url="https://join.skype.com/invite/V8Sbqdc6SoRy">
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../../assets/images/skype.png')}
              />
            </OpenURLButton>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        {isAuthenticated && (
          <DrawerItem
            onPress={() => handleLogout(props)}
            icon={() => <Ionicons name="exit" color={Theme.palette.red.signOut} size={24} />}
            label="Sign out"
            labelStyle={{
              ...Theme.fonts.body.body1,
              color: Theme.palette.red.signOut,
            }}
            style={{
              paddingHorizontal: 16,
              backgroundColor: Theme.palette.white.primary,
            }}
          />
        )}
      </Drawer.Section>
      {showModal && (
        <AuthenticationScreen
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          navigation={props.navigation}
        />
      )}
    </SafeAreaView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
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
