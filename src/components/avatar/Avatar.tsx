import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { User } from '../../models/user'
import Theme from '../../utils/Theme'

type AvatarProps = User

const Avatar: React.FC<AvatarProps> = ({
  image,
  firstName,
  lastName,
  phone,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: image }} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexShrink: 0,
    marginRight: 16,
    ...Theme.shadow.depth1,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Theme.fonts.headline.h5,
    color: Theme.palette.black.primary,
  },
  phone: {
    marginTop: 8,
    fontStyle: 'italic',
    ...Theme.fonts.body.body1,
    color: Theme.palette.paragraph.primary,
  },
})
