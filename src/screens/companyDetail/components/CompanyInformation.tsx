import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type CompanyInformationProps = {}

const CompanyInformation: React.FC<CompanyInformationProps> = () => {
  return (
    <View style={styles.container}>
      <View>
        <Ionicons name="globe-sharp" />
        <Ionicons name="location" />
        <Ionicons name="briefcase" />
        <Ionicons name="folder-open" />
        <Text>Float</Text>
      </View>
      <View>
        <Text>Image</Text>
      </View>
      <View>
        <Text>Company Name</Text>
      </View>
      <View>
        <Text>Information</Text>
      </View>
    </View>
  )
}

export default CompanyInformation

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -(screenWidth * 0.2),
    width: screenWidth * 0.75,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
})
