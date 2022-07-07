import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import { StudentModel } from '../../../models/student.model'
import Theme from '../../../utils/Theme'

type StudentInformationProps = {
  student: StudentModel
}

const StudentInformation: React.FC<StudentInformationProps> = ({ student }) => {
  const { t } = useTranslation()

  const openContact = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  return (
    <>
      {student && (
        <>
          <View style={styles.profile}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/200/300' }} />
            </View>
            <Text style={styles.profileText}>{student.fullName}</Text>
            <Text
              style={{
                marginTop: 8,
                fontStyle: 'italic',
                ...Theme.fonts.headline.h6,
                color:
                  student.status === 'Chưa thực tập'
                    ? Theme.palette.red.signOut
                    : student.status === 'Đang thực tập'
                    ? Theme.palette.paragraph.primary
                    : Theme.palette.green.success,
              }}
            >
              {student.status}
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontStyle: 'italic',
                ...Theme.fonts.body.body1,
                color: Theme.palette.paragraph.primary,
              }}
            >
              {student.nameTeacher === '' ? 'Chưa có Giảng viên' : 'Đã có Giảng viên'}
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={{ ...Theme.fonts.headline.h6, marginBottom: 8 }}>
              {t('Student information')}
            </Text>

            <View style={styles.row}>
              <Text style={styles.title}>{t('Indetity number')}:</Text>
              <Text style={styles.content}>{student.identityNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{t('Phone')}:</Text>

              <Text style={styles.phone} onPress={() => openContact(student.phoneNumber)}>
                {student.phoneNumber}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{t('Class')}:</Text>
              <Text style={styles.content}>{student.class}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{t('Academic year')}:</Text>
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
    marginBottom: 8,
  },
  title: { flex: 1, ...Theme.fonts.body.body1 },
  content: { fontWeight: 'bold', ...Theme.fonts.body.body1 },
  phone: {
    fontWeight: 'bold',
    ...Theme.fonts.body.body1,
    textDecorationLine: 'underline',
    color: '#0194f3',
  },
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
