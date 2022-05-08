import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StudentModel } from '../../models/index'
import Theme from '../../utils/Theme'

type AvatarProps = {
  firstName: string
  lastName: string
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: 'https://picsum.photos/id/237/200/300' }} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.seemore}>See your profile</Text>
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
    marginVertical: 8,
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
    color: Theme.palette.white.primary,
  },
  seemore: {
    marginTop: 4,
    ...Theme.fonts.body.body1,
    color: Theme.palette.paragraph.primary,
  },
})
