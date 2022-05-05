import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GeneralButton from '../../components/buttons/GeneralButton'
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

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <View style={styles.buttonCreateCV}>
          <GeneralButton
            bgColor={Theme.palette.main.third}
            txtColor={Theme.palette.white.primary}
            isAlignCenter={true}
            label="CREATE NEW CV"
            onPress={() => navigation.navigate('CVForm')}
          />
        </View>
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
      </View> */}
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
            <GeneralButton
              bgColor={Theme.palette.main.third}
              isAlignCenter={true}
              label="CREATE NEW CV"
              txtColor={Theme.palette.white.primary}
            />
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
          <GeneralButton
            bgColor={Theme.palette.main.primary}
            onPress={handleShowModal}
            label="Sign in"
            isAlignCenter={true}
            txtColor={Theme.palette.white.primary}
          />
        </View>
      )}
      {showModal && <AuthenticationScreen handleShowModal={handleShowModal} />}
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
    paddingHorizontal: 16,
  },
  buttonCreateCV: {
    margin: 16,
  },
})
