import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

type EditProfileButtonProps = {}

const EditProfileButton: React.FC<EditProfileButtonProps> = (props) => {
  return (
    <View style={styles.editProfileContainer}>
      <TouchableOpacity style={styles.btnEditProfile}>
        <View>
          <Image
            style={styles.editProfileImage}
            resizeMode="contain"
            source={require('../../../assets/images/icon-person.png')}
          />
        </View>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditProfileButton

const styles = StyleSheet.create({
  editProfileContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.white.primary,
    marginHorizontal: 16,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnEditProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  editProfileImage: {
    width: 30,
    height: 30,
  },
  editProfileText: {
    marginLeft: 25,
    color: Theme.palette.main.third,
    ...Theme.fonts.headline.h6,
  },
})
