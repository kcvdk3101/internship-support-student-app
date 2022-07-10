import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Theme from '../../utils/Theme'

type VerticalImagePickerProps = {
  image: string
  error: string
  pickImage: () => void
}

const VerticalImagePicker: React.FC<VerticalImagePickerProps> = ({ image, error, pickImage }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.contaier}>
      <Text>{t('Image')}</Text>
      <Pressable style={styles.inputContainer} onPress={pickImage}>
        <Text style={styles.inputText}>{t('Pick an image from gallery')}</Text>
      </Pressable>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {image !== '' && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
    </View>
  )
}

export default VerticalImagePicker

const styles = StyleSheet.create({
  contaier: { marginTop: 8 },
  inputContainer: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
  },
  imageContainer: { alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  image: { width: 180, height: 180, borderRadius: 12 },
  inputText: { color: Theme.palette.white.primary },
  error: { color: Theme.palette.red.error, marginTop: 4 },
})
