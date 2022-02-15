import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import NewestCard from '../../components/cards/NewestCard'
import { newestCompany } from '../../db/NewestCompanyData'
import Theme from '../../utils/Theme'
import PopularCompanies from './components/PopularCompanies'
import TopKeyword from './components/TopKeyword'

type CompanyScreenProps = {}

const width = Dimensions.get('screen').width

const CompanyScreen: React.FC<CompanyScreenProps> = () => {
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
            <NewestCard card={item} />
          </View>
        )}
        ListHeaderComponent={TopKeyword}
        ListFooterComponent={PopularCompanies}
        ListFooterComponentStyle={{ width: width }}
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
