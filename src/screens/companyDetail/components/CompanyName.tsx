import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'

type CompanyNameProps = {}

const CompanyName: React.FC<CompanyNameProps> = () => {
  return (
    <View style={styles.companyLogoContainer}>
      <Image
        style={styles.companyLogo}
        source={{
          uri: 'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png',
        }}
      />
      <Text style={styles.companyName}>Momo</Text>
    </View>
  )
}

export default CompanyName

const styles = StyleSheet.create({
  companyLogoContainer: {
    position: 'absolute',
    top: screenWidth * 0.1,
    ...Theme.shadow.depth2,
    alignItems: 'center',
  },
  companyLogo: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  companyName: {
    marginTop: 8,
    ...Theme.fonts.headline.h4,
    color: Theme.palette.white.primary,
  },
})
