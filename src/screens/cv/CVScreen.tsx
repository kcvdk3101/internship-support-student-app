import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateCVButton from '../../components/buttons/CreateCVButton'
import LoginButton from '../../components/buttons/LoginButton'
import CVCard from '../../components/cards/CVCard'
import { cvData } from '../../db/CVData'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import AuthenticationScreen from '../authentication/AuthenticationScreen'

type CVScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CVScreen: React.FC<CVScreenProps> = ({ navigation }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const [showModal, setShowModal] = useState(false)

  const handleLogin = () => {
    console.log('clicked')
  }

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imgLogo}
        resizeMode="contain"
        source={require('../../assets/images/FITSI.png')}
      />

      {isAuthenticated ? (
        <View>
          <ScrollView style={styles.cvList}>
            <Text style={styles.heading}>CV / Cover Letter</Text>
            <ScrollView>
              {cvData.map((cv, index) => (
                <CVCard
                  key={index}
                  name={cv.name}
                  createdAt={cv.createdAt}
                  createdBy={cv.createdBy}
                />
              ))}
            </ScrollView>
          </ScrollView>
          <View
            style={{
              padding: 15,
              backgroundColor: 'transparent',
            }}
          >
            <CreateCVButton />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              ...Theme.fonts.headline.h6,
              color: Theme.palette.black.primary,
              textAlign: 'center',
            }}
          >
            Login to create or edit your CV
          </Text>
          <LoginButton handleLogin={handleShowModal} isAlignCenter={true} />
        </View>
      )}
      {showModal && (
        <AuthenticationScreen
          handleLogin={handleLogin}
          handleShowModal={handleShowModal}
        />
      )}
    </SafeAreaView>
  )
}

export default CVScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgLogo: {
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  heading: {
    marginVertical: 15,
    ...Theme.fonts.headline.h5,
    color: Theme.palette.black.primary,
  },
  cvList: {
    padding: 15,
  },
})
