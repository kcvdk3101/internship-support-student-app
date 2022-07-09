import { ActivityIndicator, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GeneralButton from '../../../components/buttons/GeneralButton'
import Theme from '../../../utils/Theme'
import { TeacherModel } from '../../../models/teacher.model'
import { useTranslation } from 'react-i18next'

type TeacherInformationProps = {
  teacher: TeacherModel[]
  loading: boolean
  handleActionOpenForm: (
    action: 'openForm' | 'openRegisterForm' | 'openReportForm' | 'openSendEmailTeacher',
  ) => void
}

const TeacherInformation: React.FC<TeacherInformationProps> = ({
  teacher,
  loading,
  handleActionOpenForm,
}) => {
  const { t } = useTranslation()

  const openContact = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const openZalo = (phoneNumber: string) => {
    Linking.openURL(`https://zalo.me/${phoneNumber}`)
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...Theme.fonts.headline.h6, marginBottom: 8 }}>
        {t('Lecturer information')}
      </Text>
      {loading ? (
        <View style={{ marginVertical: 8 }}>
          <ActivityIndicator size="large" color={Theme.palette.background.modal} />
        </View>
      ) : (
        <View>
          {teacher && teacher[0].id !== '' ? (
            <>
              <View style={styles.row}>
                <Text style={styles.title}>{t('Full name')}: </Text>
                <Text style={styles.content}>{teacher[0].fullName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>{t('Email')}:</Text>
                <Text style={styles.content} selectable={true}>
                  {teacher[0].email}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>{t('Phone')}:</Text>
                <Text style={styles.phone} onPress={() => openContact(teacher[0].phoneNumber)}>
                  {teacher[0].phoneNumber}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>Zalo:</Text>
                <Text style={styles.phone} onPress={() => openZalo(teacher[0].phoneNumber)}>
                  {teacher[0].phoneNumber}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.title}>{t('Department')}:</Text>
                <Text style={styles.content}>{teacher[0].department}</Text>
              </View>
            </>
          ) : (
            <GeneralButton
              bgColor={Theme.palette.main.third}
              isAlignCenter={true}
              label={t('Register teacher')}
              txtColor={Theme.palette.white.primary}
              isLoading={false}
              onPress={() => handleActionOpenForm('openRegisterForm')}
            />
          )}
        </View>
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
