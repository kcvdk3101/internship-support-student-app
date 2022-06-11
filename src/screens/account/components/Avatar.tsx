import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'
import { StudentModel } from '../../../models/student.model'

type AvatarProps = {
  user: StudentModel | null
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <View style={styles.profile}>
      <View style={styles.avatarContainer}>
        <View style={styles.btnEdit}>
          <TouchableOpacity>
            <Image
              style={styles.btnEditImage}
              source={require('../../../assets/images/icon-edit.png')}
            />
          </TouchableOpacity>
        </View>
        <Image style={styles.avatar} source={{ uri: 'https://picsum.photos/id/237/200/300' }} />
      </View>
      <Text style={styles.profileText}>
        {user?.firstName} {user?.lastName}
      </Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginTop: 30,
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
  btnEdit: {
    zIndex: 2,
    position: 'absolute',
    bottom: -10,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
    backgroundColor: Theme.palette.main.third,
  },
  btnEditImage: {
    width: 24,
    height: 24,
    tintColor: Theme.palette.white.primary,
  },
})
