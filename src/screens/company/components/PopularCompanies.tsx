import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CompanyCard from '../../../components/cards/CompanyCard'
import { popularcompaniesData } from '../../../db/PopularCompanyData'
import Theme from '../../../utils/Theme'

type PopularCompaniesProps = {}

const PopularCompanies: React.FC<PopularCompaniesProps> = () => {
  return (
    <View>
      <Text style={styles.heading}>Popular from comapanies</Text>
      {popularcompaniesData.map((company, index) => (
        <CompanyCard key={index} company={company} />
      ))}
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
