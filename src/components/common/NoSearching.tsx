import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Theme from '../../utils/Theme'
import { screenHeight } from '../../constant'

const NoSearching: React.FC = () => {
  const { t } = useTranslation()

  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={require('../../assets/images/searching.png')} style={styles.tinyLogo} />
      <Text style={{ ...Theme.fonts.headline.h6, color: Theme.palette.main.primary }}>
        {t('Discover Job/Company')}
      </Text>
    </View>
  )
}

export default NoSearching

const styles = StyleSheet.create({
  tinyLogo: {
    height: screenHeight * 0.5,
  },
})
