import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'
import { TeacherModel } from '../../../models/teacher.model'

type TeacherInformationProps = {
  teacher: TeacherModel
  handleActionOpenForm: (action: string) => void
}

const TeacherInformation: React.FC<TeacherInformationProps> = ({
  teacher,
  handleActionOpenForm,
}) => {
  const openContact = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const openZalo = (phoneNumber: string) => {
    Linking.openURL(`https://zalo.me/${phoneNumber}`)
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...Theme.fonts.headline.h6, marginBottom: 8 }}>Teacher Information</Text>
      {teacher.id !== '' ? (
        <View>
          <View style={styles.row}>
            <Text style={styles.title}>Fullname: </Text>
            <Text style={styles.content}>{teacher.fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Email:</Text>
            <Text style={styles.content} selectable={true}>
              {teacher.email}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Phone number:</Text>
            <Text style={styles.phone} onPress={() => openContact(teacher.phoneNumber)}>
              {teacher.phoneNumber}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Zalo contact:</Text>
            <Text style={styles.phone} onPress={() => openZalo(teacher.phoneNumber)}>
              {teacher.phoneNumber}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Department:</Text>
            <Text style={styles.content}>{teacher.department}</Text>
          </View>
        </View>
      ) : (
        <GeneralButton
          bgColor={Theme.palette.main.third}
          isAlignCenter={true}
          label="Register Teacher"
          txtColor={Theme.palette.white.primary}
          isLoading={false}
          onPress={() => handleActionOpenForm('openRegisterForm')}
        />
      )}
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
  phone: {
    fontWeight: 'bold',
    ...Theme.fonts.body.body1,
    textDecorationLine: 'underline',
    color: '#0194f3',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { flex: 1, ...Theme.fonts.body.body1 },
  content: { fontWeight: 'bold', ...Theme.fonts.body.body1 },
})
