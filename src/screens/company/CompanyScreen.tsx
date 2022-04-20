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
import TopKeyword from './components/TopKeyword'

type CompanyScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyScreen: React.FC<CompanyScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const user = useAppSelector((state) => state.auth.user)
  const getLimitedCorporation = useAppSelector((state) => state.corp.corporationsByLimit)
  console.log(getLimitedCorporation)

  useEffect(() => {
    dispatch(getCorporationsByLimit(5))
  }, [dispatch])

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<TopKeyword />}
        data={newestCompany}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <NewestCard card={item} navigation={navigation} />
          </View>
        )}
        ListFooterComponent={<PopularCompanies />}
      />
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
