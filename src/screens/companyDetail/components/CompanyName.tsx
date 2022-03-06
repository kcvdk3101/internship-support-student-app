import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

type CompanyNameProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyName: React.FC<CompanyNameProps> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonGoBack} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGoBack}>
          <Ionicons name="ios-heart" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.companyLogoContainer}>
        <Image
          style={styles.companyLogo}
          source={{
            uri: 'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png',
          }}
        />
        <Text style={styles.companyName}>Momo</Text>
      </View>
    </View>
  )
}

export default CompanyName

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    position: 'absolute',
    top: screenWidth * 0.1,
    ...Theme.shadow.depth2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  buttonGoBack: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: Theme.palette.white.primary,
    padding: 8,
  },
  companyLogoContainer: {
    position: 'absolute',
    left: screenWidth * 0.25,
    right: screenWidth * 0.25,
    ...Theme.shadow.depth2,
    alignItems: 'center',
  },
  companyLogo: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  companyName: {
    marginTop: 4,
    ...Theme.fonts.headline.h4,
    color: Theme.palette.white.primary,
  },
})
