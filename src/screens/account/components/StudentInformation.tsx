import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UserModel } from '../../../models/user.model'
import Theme from '../../../utils/Theme'

type StudentInformationProps = {
  user: UserModel | null
}

const StudentInformation: React.FC<StudentInformationProps> = ({ user }) => {
  console.log(user)

  return (
    <>
      <View style={styles.profile}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/id/237/200/300' }} />
        </View>
        <Text style={styles.profileText}>
          {user?.lastName} {user?.firstName}
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Student ID:</Text>
          <Text style={styles.content}>18DH110815</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Class:</Text>
          <Text style={styles.content}>PM1804</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>School year:</Text>
          <Text style={styles.content}>K24</Text>
        </View>
      </View>
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
