import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CreateCVButton from '../../components/buttons/CreateCVButton'
import CVCard from '../../components/cards/CVCard'
import { cvData } from '../../db/CVData'
import Theme from '../../utils/Theme'

type CVScreenProps = {}

const CVScreen: React.FC<CVScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cvList}>
        <Image
          style={styles.imgLogo}
          resizeMode="contain"
          source={require('../../assets/images/FITSI.png')}
        />
        <Text style={styles.heading}>CV / Cover Letter</Text>
        <ScrollView>
          {cvData.map((cv, index) => (
            <CVCard
              key={index}
              name={cv.name}
              createdAt={cv.createdAt}
              createdBy={cv.createdBy}
            />
          ))}
        </ScrollView>
      </ScrollView>
      <View
        style={{
          padding: 15,
          backgroundColor: 'transparent',
        }}
      >
        <CreateCVButton />
      </View>
    </SafeAreaView>
  )
}

export default CVScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgLogo: {
    height: 40,
    alignSelf: 'center',
  },
  heading: {
    marginVertical: 15,
    ...Theme.fonts.headline.h5,
    color: Theme.palette.black.primary,
  },
  cvList: {
    padding: 15,
  },
})
