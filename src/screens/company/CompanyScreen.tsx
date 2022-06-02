import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import NewestCard from '../../components/cards/NewestCard'
import { newestCompany } from '../../db/NewestCompanyData'
import { getCorporationsByLimit } from '../../features/corporationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import PopularCompanies from './components/PopularCompanies'
import SkeletonComponentScreen from './components/SkeletonComponentScreen'
import TopKeyword from './components/TopKeyword'

type CompanyScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyScreen: React.FC<CompanyScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const status = useAppSelector((state) => state.corp.status)
  const getLimitedCorporation = useAppSelector((state) => state.corp.corporationsByLimit)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
        <FlatList
          ListHeaderComponent={<TopKeyword />}
          data={getLimitedCorporation}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              <NewestCard
                card={{
                  banner: 'https://picsum.photos/200',
                  name: item.name,
                  desc: item.overtimeRequire,
                  jobs: item.numberEmployees,
                  kw: [
                    {
                      name: 'React',
                      bgColor: '#61dafb',
                      txtColor: '#282c34',
                    },
                    {
                      name: 'PHP',
                      bgColor: '#5c76b4',
                      txtColor: '#08090c',
                    },
                    {
                      name: 'JavaScript',
                      bgColor: '#e4d04b',
                      txtColor: '#2f302e',
                    },
                  ],
                }}
                navigation={navigation}
              />
            </View>
          )}
          // ListFooterComponent={<PopularCompanies />}
        />
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
  newest: {
    marginTop: 24,
  },
})
