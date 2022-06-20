import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'

type TeacherInformationProps = {}

const TeacherInformation: React.FC<TeacherInformationProps> = ({}) => {
  return (
    <View style={styles.container}>
      <GeneralButton
        bgColor={Theme.palette.main.third}
        isAlignCenter={true}
        label="Register Teacher"
        txtColor={Theme.palette.white.primary}
        isLoading={false}
      />
    </View>
  )
}

export default TeacherInformation

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: Theme.palette.white.primary,
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 10,
  },
})
