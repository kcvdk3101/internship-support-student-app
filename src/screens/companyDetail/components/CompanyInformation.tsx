import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type CompanyInformationProps = {}

const CompanyInformation: React.FC<CompanyInformationProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Ionicons
          name="globe-sharp"
          size={20}
          color={Theme.palette.black.primary}
          style={styles.icon}
        />
        <Text
          style={{ color: 'blue' }}
          onPress={() => Linking.openURL('https://momo.vn/')}
        >
          https://momo.vn/
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Ionicons
          name="location"
          size={20}
          color={Theme.palette.black.primary}
          style={styles.icon}
        />
        <Text>288 Su Van Hanh, District 10</Text>
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
          <Text>500-100</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons
            name="briefcase"
            size={20}
            color={Theme.palette.black.primary}
            style={styles.icon}
          />
          <Text>10 Jobs</Text>
        </View>
        <View />
      </View>
      <View style={styles.detailsContainer}>
        <Ionicons
          name="flag"
          size={20}
          color={Theme.palette.black.primary}
          style={styles.icon}
        />
        <Text>Vietnam</Text>
      </View>
    </View>
  )
}

export default CompanyInformation

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -(screenWidth * 0.3),
    width: screenWidth * 0.8,
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
