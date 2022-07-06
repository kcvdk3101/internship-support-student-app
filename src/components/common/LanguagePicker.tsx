import { StyleSheet, Text, View, Modal, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

type LanguagePickerProps = {
  showLanguagePicker: boolean
  handleCloseLanguagePicker: () => void
}

const languages = [
  { name: 'vn', label: 'Tiếng Việt' },
  { name: 'en', label: 'English' },
]

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  showLanguagePicker,
  handleCloseLanguagePicker,
}) => {
  const { i18n } = useTranslation() //i18n instance

  const LanguageItem = ({ name, label }: { name: string; label: string }) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name) // changes the app language
        handleCloseLanguagePicker()
      }}
    >
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  )

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={showLanguagePicker}>
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <Ionicons
              name="close"
              onPress={handleCloseLanguagePicker}
              size={22}
              style={{ width: 50 }}
            />
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default LanguagePicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background.modal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.5,
    borderRadius: 8,
    backgroundColor: Theme.palette.white.primary,
    padding: 16,
  },
  button: {
    alignSelf: 'center',
    padding: 8,
    marginVertical: 4,
  },
  textStyle: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.main.primary,
  },
})
