import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ButtonChip from '../../components/buttons/ChipButton'
import NewestCard from '../../components/cards/NewestCard'
import { keywordData } from '../../db/KeywordData'
import Theme from '../../utils/Theme'

type Props = {}

const CompanyScreen = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topKeywordGroup}>
        <Text style={styles.heading}>top keyword</Text>
        <View style={styles.topKeywordList}>
          {keywordData.map((kw, index) => (
            <ButtonChip
              key={index}
              name={kw.name}
              bgColor={kw.bgColor}
              txtColor={kw.txtColor}
            />
          ))}
        </View>
      </View>
      <View style={styles.newestGroup}>
        <Text style={styles.heading}>newest</Text>
        <NewestCard />
      </View>
      <View style={styles.popularCompaniesGroup}>
        <Text style={styles.heading}>popular comapanies</Text>
      </View>
    </ScrollView>
  )
}

export default CompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
  topKeywordGroup: {
    marginBottom: 10,
  },
  topKeywordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  newestGroup: {},
  popularCompaniesGroup: {},
})
