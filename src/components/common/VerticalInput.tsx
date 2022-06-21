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
  label?: string
  type: string
  inputName: string
  defaultValue?: string
  multiline?: boolean
  placeholder?: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
  returnKeyType: ReturnKeyTypeOptions
  keyboardType: KeyboardTypeOptions
  editable: boolean
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
  defaultValue,
  placeholder,
  multiline,
  autoCapitalize,
  returnKeyType,
  keyboardType,
  editable,
  control,
  errors,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text>{label}</Text>
        <Text style={{ color: Theme.palette.red.error, marginLeft: 8 }}>*</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name={inputName}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize={autoCapitalize}
            autoCompleteType={checkTypeInput(type)}
            autoCorrect={false}
            defaultValue={defaultValue}
            onBlur={onBlur}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            style={[styles.textInput, { height: multiline ? 120 : 'auto' }]}
            placeholder={placeholder}
            placeholderTextColor={Theme.palette.paragraph.primary}
            value={value}
            secureTextEntry={type === 'password'}
            clearButtonMode="always"
            onChangeText={onChange}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 0}
            blurOnSubmit={multiline}
            editable={editable}
          />
        )}
      />
      {errors?.[inputName] && (
        <Text style={{ color: Theme.palette.red.error }}>{errors?.[inputName].message}</Text>
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
