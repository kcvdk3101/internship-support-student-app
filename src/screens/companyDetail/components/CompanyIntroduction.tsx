import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'

type CompanyIntroductionProps = {}

const CompanyIntroduction: React.FC<CompanyIntroductionProps> = () => {
  return (
    <View style={styles.container}>
      {/* Company Introduction */}
      <Text style={styles.heading}>Introduction</Text>
      <Text style={styles.text}>
        M_Service was established in October 2007 and owns the MoMo brand. Since
        October 2010, the brand MoMo (MoMo stands for Mobile Money) has been
        present at Vietnam market. MoMo is a pioneer in mobile payments area
        with a mission to use technology to provide equal opportunities for all
        Vietnamese people to access financial services and products.
      </Text>
    </View>
  )
}

export default CompanyIntroduction

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
