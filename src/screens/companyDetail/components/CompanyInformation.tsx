import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { CorporationModel } from '../../../models/corporation.model'

type CompanyInformationProps = {
  navigation: NavigationProp<ParamListBase>
  companyDetail: CorporationModel
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ companyDetail, navigation }) => {
  const { name, email, location, origin, numberEmployees, special } = companyDetail
  const { details, street, district } = location[0]
  const locationDetail = `${details}, ${street} Street, District ${district}`

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
            uri: 'https://picsum.photos/200',
          }}
        />
        <Text style={styles.companyName}>{name}</Text>
      </View>
      <View style={styles.containerInformation}>
        <View style={styles.detailsContainer}>
          <Ionicons
            name="globe-sharp"
            size={20}
            color={Theme.palette.black.primary}
            style={styles.icon}
          />
          <Text>{email}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons
            name="location"
            size={20}
            color={Theme.palette.black.primary}
            style={styles.icon}
          />
          <Text>{locationDetail}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={styles.detailsContainer}>
            <Ionicons
              name="people"
              size={20}
              color={Theme.palette.black.primary}
              style={styles.icon}
            />
            <Text>{numberEmployees}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Ionicons
              name="briefcase"
              size={20}
              color={Theme.palette.black.primary}
              style={styles.icon}
            />
            <Text>{special}</Text>
          </View>
          <View />
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="flag" size={20} color={Theme.palette.black.primary} style={styles.icon} />
          <Text>{origin}</Text>
        </View>
      </View>
    </View>
  )
}

export default CompanyInformation

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
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
    alignItems: 'center',
  },
  companyLogo: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  companyName: {
    textAlign: 'center',
    marginVertical: 16,
    ...Theme.fonts.headline.h4,
    color: Theme.palette.main.secondary,
  },
  containerInformation: {
    marginHorizontal: 32,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 15,
    padding: 20,
    ...Theme.shadow.depth2,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    flexShrink: 0,
    marginRight: 4,
  },
})
