import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { screenWidth } from '../../../constant'
import { CorporationModel } from '../../../models/corporation.model'
import Theme from '../../../utils/Theme'

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

  const linkToGoogleMap = (destination: string) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonGoBack} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} />
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
          <Text style={{ ...Theme.fonts.body.body2 }}>{email}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons
            name="location"
            size={20}
            color={Theme.palette.black.primary}
            style={styles.icon}
          />
          <Text
            style={{ ...Theme.fonts.body.body2, textDecorationLine: 'underline', color: '#0194f3' }}
            onPress={() => linkToGoogleMap(locationDetail)}
          >
            {locationDetail}
          </Text>
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
            <Text style={{ ...Theme.fonts.body.body2 }}>{numberEmployees}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Ionicons
              name="briefcase"
              size={20}
              color={Theme.palette.black.primary}
              style={styles.icon}
            />
            <Text style={{ ...Theme.fonts.body.body2 }}>{special}</Text>
          </View>
          <View />
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="flag" size={20} color={Theme.palette.black.primary} style={styles.icon} />
          <Text style={{ ...Theme.fonts.body.body2 }}>{origin}</Text>
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
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 15,
    marginHorizontal: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    ...Theme.shadow.depth2,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  icon: {
    flexShrink: 0,
    marginRight: 8,
  },
})
