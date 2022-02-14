import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { keywordData } from '../../../db/KeywordData'
import ChipButton from '../../../components/buttons/ChipButton'
import Theme from '../../../utils/Theme'

type TopKeywordProps = {}

const TopKeyword: React.FC<TopKeywordProps> = () => {
  return (
    <View style={styles.topKeywordGroup}>
      <Text style={styles.heading}>top keyword</Text>
      <View style={styles.topKeywordList}>
        {keywordData.map((kw, index) => (
          <ChipButton
            key={index}
            name={kw.name}
            bgColor={kw.bgColor}
            txtColor={kw.txtColor}
          />
        ))}
      </View>
      <Text style={[styles.heading, styles.newest]}>newest</Text>
    </View>
  )
}

export default TopKeyword

const styles = StyleSheet.create({
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
    marginHorizontal: 10,
  },
  newest: {
    marginTop: 24,
  },
  topKeywordGroup: {
    marginBottom: 10,
  },
  topKeywordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
})
