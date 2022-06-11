import { NavigationProp, ParamListBase } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
  const status = useAppSelector((state) => state.corp.status)
  const getLimitedCorporation = useAppSelector((state) => state.corp.corporationsByLimit)

  console.log(getLimitedCorporation)

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
          {getLimitedCorporation.length > 0 ? (
            getLimitedCorporation.map((corp, index) => (
              <View key={index} style={{ marginHorizontal: 20 }}>
                <NewestCard
                  card={{
                    companyId: corp.id,
                    banner: 'https://picsum.photos/200',
                    name: corp.name,
                    location: `${corp.location[0].details}, ${corp.location[0].street} Street, Ward ${corp.location[0].ward}, District ${corp.location[0].district} District`,
                    jobs: corp.numberEmployees,
                  }}
                  navigation={navigation}
                />
              </View>
            ))
          ) : (
            <View>
              <Text>Result not found</Text>
            </View>
          )}
        </ScrollView>
        // <FlatList
        //   ListHeaderComponent={<TopKeyword />}
        //   data={getLimitedCorporation}
        //   keyExtractor={(item, index) => index.toString()}
        //   renderItem={({ item }) => (
        //     <View
        //       style={{
        //         marginHorizontal: 20,
        //       }}
        //     >
        // <NewestCard
        //   card={{
        //     companyId: item.id,
        //     banner: 'https://picsum.photos/200',
        //     name: item.name,
        //     location: `${item.location[0].details}, ${item.location[0].street} Street, Ward ${item.location[0].ward}, District ${item.location[0].district} District`,
        //     jobs: item.numberEmployees,
        //   }}
        //   navigation={navigation}
        // />
        //     </View>
        //   )}
        // />
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
