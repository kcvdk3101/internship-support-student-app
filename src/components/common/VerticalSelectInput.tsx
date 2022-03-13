import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Theme from '../../utils/Theme'
import RNPickerSelect from 'react-native-picker-select'

type VerticalSelectInputProps = {
  selectedLanguage: string
  items: any
  placeHolderLabel: string
  label: string
  type: string
  inputName: string
  control: Control<any, any>
  handleSelectedLanguage: (value: string) => void
}

const VerticalSelectInput: React.FC<VerticalSelectInputProps> = ({
  selectedLanguage,
  placeHolderLabel,
  items,
  label,
  inputName,
  control,
  handleSelectedLanguage,
}) => {
  const placeholder = {
    label: placeHolderLabel,
    value: null,
    color: Theme.palette.black.primary,
  }

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <RNPickerSelect
            {...field}
            placeholder={placeholder}
            items={items}
            onValueChange={(value) => {
              handleSelectedLanguage(value)
            }}
            style={pickerSelectStyles}
            value={selectedLanguage}
            useNativeAndroidPickerStyle={false}
          />
        )}
        name={inputName}
      />
    </View>
  )
}

export default VerticalSelectInput

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
  inputAndroid: {
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
