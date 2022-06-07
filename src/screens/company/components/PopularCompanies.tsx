import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'
import { popularcompaniesData } from '../../../db/PopularCompanyData'
import CompanyCard from '../../../components/cards/CompanyCard'

type PopularCompaniesProps = {}

const PopularCompanies: React.FC<PopularCompaniesProps> = () => {
  return (
    <View>
      <Text style={styles.heading}>popular comapanies</Text>
      <FlatList
        data={popularcompaniesData}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CompanyCard company={item} />}
      />
    </View>
  )
}

export default PopularCompanies

const styles = StyleSheet.create({
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
    marginTop: 24,
  },
})
