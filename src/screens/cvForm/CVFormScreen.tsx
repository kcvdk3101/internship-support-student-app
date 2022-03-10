import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralButton from '../../components/buttons/GeneralButton'
import Theme from '../../utils/Theme'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'

type CVFormScreenProps = {
  navigation: DrawerNavigationProp<ParamListBase>
}

const CVFormScreen: React.FC<CVFormScreenProps> = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: Theme.palette.white.primary,
          ...Theme.shadow.depth2,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              ...Theme.fonts.headline.h6,
            }}
          >
            Start create CV on FITSI
          </Text>
          <Text
            style={{
              marginTop: 4,
              ...Theme.fonts.body.body1,
            }}
          >
            Create a CV quickly and always free, exclusively for all students.
            Make your career outstanding with FITSI from today
          </Text>
        </View>
        <View>
          <GeneralButton
            label="Start Making CV"
            bgColor={Theme.palette.main.primary}
            txtColor={Theme.palette.white.primary}
            isAlignCenter={true}
            onPress={() => navigation.navigate('AdditionalInformationScreen')}
          />
        </View>
        <View
          style={{
            marginTop: 8,
          }}
        >
          <GeneralButton
            label="Cancel"
            bgColor={Theme.palette.paragraph.primary}
            txtColor={Theme.palette.black.primary}
            isAlignCenter={true}
            onPress={() => navigation.navigate('AdditionalInformationScreen')}
          />
        </View>
      </View>
    </View>
  )
}

export default CVFormScreen

const styles = StyleSheet.create({})
