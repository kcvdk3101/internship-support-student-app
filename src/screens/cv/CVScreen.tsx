import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GeneralButton from '../../components/buttons/GeneralButton'
import CVCard from '../../components/cards/CVCard'
import { getCVByStudentId } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { Utils } from '../../utils/Utils'
import AuthenticationScreen from '../authentication/AuthenticationScreen'

type CVScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CVScreen: React.FC<CVScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const { studentId } = useAppSelector((state) => state.auth.user)
  const { CVs } = useAppSelector((state) => state.cv)

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const onRefresh = useCallback(async () => {
    if (studentId !== '') {
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
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (studentId !== '') {
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
      }
    })()
  }, [isAuthenticated, navigation])

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
          <View style={styles.buttonCreateCV}>
            <GeneralButton
              bgColor={Theme.palette.main.third}
              txtColor={Theme.palette.white.primary}
              isAlignCenter={true}
              label={t('Create New CV')}
              onPress={() => navigation.navigate('CVForm')}
              isLoading={false}
            />
          </View>
          <View style={styles.cvList}>
            <View>
              <View style={{ marginVertical: 8 }}>
                {CVs && CVs.length > 0 ? (
                  <View>
                    {CVs.map((cv, index) => (
                      <CVCard
                        key={index}
                        name={cv.name}
                        position={`Position: ${cv.position}`}
                        createdAt={`Created at : ${Utils.convertDateString(cv.createdAt)}`}
                      />
                    ))}
                  </View>
                ) : (
                  <View>
                    <Text style={{ ...Theme.fonts.body.body1 }}>
                      {t("You don't have any CVs yet")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.logoContent}>{t('Login to create or edit your CV')}</Text>
          <GeneralButton
            bgColor={Theme.palette.main.primary}
            onPress={handleShowModal}
            label={t('Sign in')}
            isAlignCenter={true}
            txtColor={Theme.palette.white.primary}
            isLoading={false}
          />
        </View>
      )}

      <AuthenticationScreen
        visible={showModal}
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        navigation={navigation}
      />
    </View>
  )
}

export default CVScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  cvList: {
    paddingHorizontal: 16,
  },
  buttonCreateCV: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContent: {
    marginBottom: 10,
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
    textAlign: 'center',
  },
})
