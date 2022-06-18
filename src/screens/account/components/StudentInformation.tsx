import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { UserModel } from '../../../models/user.model'
import Theme from '../../../utils/Theme'

type StudentInformationProps = {
  user: UserModel | null
}

const StudentInformation: React.FC<StudentInformationProps> = ({ user }) => {
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

      <View>
        <Text>User information</Text>
      </View>
    </>
  )
}

export default StudentInformation

const styles = StyleSheet.create({
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
