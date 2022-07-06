import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import NewestCard from '../../components/cards/NewestCard'
import { getCorporationsByLimit } from '../../features/corporationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import SkeletonComponentScreen from './components/SkeletonComponentScreen'
import TopKeyword from './components/TopKeyword'

type CompanyScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyScreen: React.FC<CompanyScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.corp.status)
  const getLimitedCorporation = useAppSelector((state) => state.corp.corporationsByLimit)
  useEffect(() => {
    ;(async () => {
      try {
        dispatch(getCorporationsByLimit(5))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch])

  return (
    <View style={styles.container}>
      {status === 'loading' ? (
        <SkeletonComponentScreen />
      ) : (
        <ScrollView>
          <TopKeyword />
          <Text style={styles.heading}>{t('Recommended Company')}</Text>
          {getLimitedCorporation.length > 0 ? (
            getLimitedCorporation.map((corp, index) => (
              <View key={index} style={{ marginHorizontal: 16 }}>
                <NewestCard
                  card={{
                    companyId: corp.id,
                    banner: 'https://picsum.photos/200',
                    name: corp.name,
                    location: `${corp.location[0].details}, ${corp.location[0].street} Street, District ${corp.location[0].district}`,
                    jobs: corp.numberEmployees,
                  }}
                  navigation={navigation}
                />
              </View>
            ))
          ) : (
            <View style={{ marginHorizontal: 20 }}>
              <Text>Result not found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  )
}

export default CompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  newest: {
    marginTop: 24,
  },
})
