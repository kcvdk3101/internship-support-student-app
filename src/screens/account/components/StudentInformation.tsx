import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { StudentModel } from '../../../models/student.model'
import Theme from '../../../utils/Theme'

type StudentInformationProps = {
  student: StudentModel
}

const StudentInformation: React.FC<StudentInformationProps> = ({ student }) => {
  return (
    <>
      {student && (
        <>
          <View style={styles.profile}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200/300' }} />
            </View>
            <Text style={styles.profileText}>{student.fullName}</Text>
          </View>

          <View style={styles.container}>
            <Text style={{ ...Theme.fonts.headline.h6, marginBottom: 8 }}>Student Information</Text>

            <View style={styles.row}>
              <Text style={styles.title}>Student ID:</Text>
              <Text style={styles.content}>{student.identityNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Class:</Text>
              <Text style={styles.content}>{student.class}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>School year:</Text>
              <Text style={styles.content}>{student.term}</Text>
            </View>
          </View>
        </>
      )}
    </>
  )
}

export default StudentInformation

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
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    textAlign: 'center',
    marginTop: 20,
    ...Theme.fonts.headline.h4,
    ...Theme.shadow.depth2,
    color: Theme.palette.white.primary,
  },
  avatarContainer: {
    position: 'relative',
    ...Theme.shadow.depth3,
  },
  avatar: {
    width: 165,
    height: 165,
    borderRadius: 100,
  },
  notFound: { ...Theme.fonts.body.body1, marginBottom: 16 },
})
