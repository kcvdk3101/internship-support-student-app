import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'

type CompanyReviewProps = {}

const CompanyReview: React.FC<CompanyReviewProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List review</Text>
    </View>
  )
}

export default CompanyReview

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  heading: {
    marginVertical: 8,
    color: Theme.palette.black.primary,
    ...Theme.fonts.headline.h6,
  },
  text: {
    ...Theme.fonts.body.body1,
  },
})
