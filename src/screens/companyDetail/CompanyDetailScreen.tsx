import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useState } from 'react'
import Theme from '../../utils/Theme'
import { screenHeight, screenWidth } from '../../constant'
import CompanyInformation from './components/CompanyInformation'
import CompanyName from './components/CompanyName'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonGroup from './components/ButtonGroup'
import CompanyIntroduction from './components/CompanyIntroduction'

type CompanyDetailScreenProps = {}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = () => {
  const [index, setIndex] = useState(0)

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  return (
    <ScrollView>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={1}
        />
        {/* Company Name */}
        <CompanyName />
        {/* Company Information */}
        <CompanyInformation />
      </View>
      {/* Button Group */}
      <ButtonGroup index={index} handleChangeIndex={handleChangeIndex} />

      {index === 0 ? (
        <CompanyIntroduction />
      ) : (
        <View>
          <Text>FlatList</Text>
        </View>
      )}
    </ScrollView>
  )
}

export default CompanyDetailScreen

const styles = StyleSheet.create({
  backgroundImageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  backgroundImage: {
    flex: 1,
    width: screenWidth,
  },
})
