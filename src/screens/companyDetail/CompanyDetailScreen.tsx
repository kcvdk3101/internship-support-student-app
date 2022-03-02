import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import { screenHeight, screenWidth } from '../../constant'
import CompanyInformation from './components/CompanyInformation'

type CompanyDetailScreenProps = {}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = () => {
  return (
    <View>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={1}
        />
        <View style={styles.companyLogoContainer}>
          <Image
            style={styles.companyLogo}
            source={{ uri: 'https://picsum.photos/200' }}
          />
        </View>
        <CompanyInformation />
      </View>
      {/* <View>
        <Text>Button Tab Group</Text>
      </View>
      <View>
        <Text>Show Content based on Button</Text>
      </View> */}
    </View>
  )
}

export default CompanyDetailScreen

const styles = StyleSheet.create({
  backgroundImageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight * 0.4,
  },
  backgroundImage: {
    flex: 1,
    width: screenWidth,
  },
  companyLogoContainer: {
    position: 'absolute',
    top: screenWidth * 0.1,
    ...Theme.shadow.depth2,
  },
  companyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
})
