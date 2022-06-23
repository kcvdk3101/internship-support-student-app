import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import AuthenticationScreen from '../authentication/AuthenticationScreen'

type CVScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CVScreen: React.FC<CVScreenProps> = ({ navigation }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const { studentId } = useAppSelector((state) => state.auth.user)
  const { CVs } = useAppSelector((state) => state.cv)

  const dispatch = useAppDispatch()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await dispatch(getCVByStudentId({ studentId, limit: 10, offset: 0 }))
        if (response.meta.requestStatus === 'fulfilled') {
          setLoading(false)
        }
      } catch (error) {
        Alert.alert('Something wrong!')
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated])

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      {isAuthenticated ? (
        <View>
          <View style={styles.buttonCreateCV}>
            <GeneralButton
              bgColor={Theme.palette.main.third}
              txtColor={Theme.palette.white.primary}
              isAlignCenter={true}
              label="CREATE NEW CV"
              onPress={() => navigation.navigate('CVForm')}
              isLoading={false}
            />
          </View>
          <ScrollView style={styles.cvList}>
            <Text style={styles.heading}>CV / Cover Letter</Text>
            <ScrollView>
              {loading ? (
                <View>
                  <ActivityIndicator size="large" color={Theme.palette.background.modal} />
                </View>
              ) : (
                <View>
                  {CVs ? (
                    <View>
                      {CVs.map((cv, index) => (
                        <CVCard key={index} name={cv.name} createdAt={cv.createdAt as string} />
                      ))}
                    </View>
                  ) : (
                    <View>
                      <Text>You don't have any CVs yet</Text>
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          </ScrollView>
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
            isLoading={false}
          />
        </View>
      )}
      {showModal && (
        <AuthenticationScreen
          handleShowModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          navigation={navigation}
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
  heading: {
    // marginVertical: 15,
    ...Theme.fonts.headline.h5,
    color: Theme.palette.black.primary,
  },
  cvList: {
    paddingHorizontal: 16,
  },
  buttonCreateCV: {
    marginHorizontal: 16,
    marginTop: -28,
    marginBottom: 8,
  },
})
