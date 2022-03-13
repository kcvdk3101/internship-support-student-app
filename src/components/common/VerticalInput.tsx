import React from 'react'
import { Control, Controller } from 'react-hook-form'
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import Theme from '../../utils/Theme'

type VerticalInputProps = {
  label: string
  type: string
  inputName: string
  placeholder: string
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined
  returnKeyType: ReturnKeyTypeOptions
  keyboardType: KeyboardTypeOptions
  control: Control<any, any>
  errors: any
}

function checkTypeInput(type: string) {
  switch (type) {
    case 'email':
      return 'email'
    case 'username':
      return 'username'
    case 'name':
      return 'name'
    case 'password':
      return 'password'
    case 'number':
      return 'tel'
    default:
      break
  }
}

const VerticalInput: React.FC<VerticalInputProps> = ({
  label,
  type,
  inputName,
  placeholder,
  autoCapitalize,
  returnKeyType,
  keyboardType,
  control,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCompleteType={checkTypeInput(type)}
            autoCorrect={false}
            onBlur={onBlur}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={Theme.palette.paragraph.primary}
            value={value}
            onChangeText={onChange}
          />
        )}
        name={inputName}
      />
      {errors?.[inputName] && (
        <Text style={{ color: Theme.palette.red.error }}>
          This field is required
        </Text>
      )}
    </View>
  )
}

export default VerticalInput

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
