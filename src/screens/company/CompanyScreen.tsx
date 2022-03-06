import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import NewestCard from '../../components/cards/NewestCard'
import { screenWidth } from '../../constant'
import { newestCompany } from '../../db/NewestCompanyData'
import Theme from '../../utils/Theme'
import PopularCompanies from './components/PopularCompanies'
import TopKeyword from './components/TopKeyword'

type CompanyScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyScreen: React.FC<CompanyScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefeshing = () => {
    console.log('refeshed')
    // setIsLoading(!isLoading)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newestCompany}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <NewestCard card={item} navigation={navigation} />
          </View>
        )}
        ListHeaderComponent={TopKeyword}
        ListFooterComponent={PopularCompanies}
        ListFooterComponentStyle={{ width: screenWidth }}
        refreshing={isLoading}
        onRefresh={handleRefeshing}
      />
    </View>
  )
}

export default CompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    // paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
})
