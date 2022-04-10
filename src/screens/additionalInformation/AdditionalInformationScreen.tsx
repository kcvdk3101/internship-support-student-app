import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'

type AdditionalInformationScreenProps = {}

const AdditionalInformationScreen: React.FC<AdditionalInformationScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.heading}>Project</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.heading}>Certificate</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default AdditionalInformationScreen

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 16,
    padding: 8,
  },
  heading: {
    ...Theme.fonts.headline.h6,
    paddingHorizontal: 8,
  },
})
