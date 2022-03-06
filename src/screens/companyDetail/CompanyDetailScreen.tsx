import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { screenHeight, screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import ButtonGroup from './components/ButtonGroup'
import CompanyInformation from './components/CompanyInformation'
import CompanyIntroduction from './components/CompanyIntroduction'
import CompanyJobList from './components/CompanyJobList'
import CompanyName from './components/CompanyName'
import { Ionicons } from '@expo/vector-icons'

type CompanyDetailScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = ({
  navigation,
}) => {
  const [index, setIndex] = useState(0)

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  return (
    <ScrollView>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{
            uri: 'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png',
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={10}
        />
        {/* Company Name */}
        <CompanyName navigation={navigation} />
        {/* Company Information */}
        <CompanyInformation />
      </View>
      <ButtonGroup index={index} handleChangeIndex={handleChangeIndex} />

      {index === 0 ? <CompanyIntroduction /> : <CompanyJobList />}
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
  buttonGoBack: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Theme.palette.white.primary,
    padding: 4,
  },
})
