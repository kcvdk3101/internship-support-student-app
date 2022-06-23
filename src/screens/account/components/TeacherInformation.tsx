import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'
import { TeacherModel } from '../../../models/teacher.model'

type TeacherInformationProps = {
  teacher?: string
  handleActionOpenForm: (action: string) => void
}

const TeacherInformation: React.FC<TeacherInformationProps> = ({
  teacher,
  handleActionOpenForm,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Theme.fonts.headline.h6, marginBottom: 8 }}>Teacher Information</Text>
      {teacher ? (
        <View>
          <View style={styles.row}>
            <Text style={styles.title}>Fullname: </Text>
            <Text style={styles.content}>{teacher}</Text>
          </View>
          {/* <View style={styles.row}>
            <Text style={styles.title}>Position:</Text>
            <Text style={styles.content}>{teacher.position}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Department:</Text>
            <Text style={styles.content}>{teacher.department}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Email:</Text>
            <Text style={styles.content}>{teacher.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Phone number:</Text>
            <Text style={styles.content}>{teacher.phoneNumber}</Text>
          </View> */}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: { flex: 1, ...Theme.fonts.body.body1 },
  content: { fontWeight: 'bold', ...Theme.fonts.body.body1 },
})
