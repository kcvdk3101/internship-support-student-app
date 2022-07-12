import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import { useTranslation } from 'react-i18next'

type AvatarProps = {
  firstName: string
  lastName: string
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {lastName} {firstName}
      </Text>
      <Text style={styles.seemore}>{t('See your profile')}</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  name: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
  seemore: {
    marginTop: 4,
    ...Theme.fonts.body.body1,
    color: Theme.palette.paragraph.primary,
  },
})
