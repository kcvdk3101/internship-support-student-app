import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { Platform, StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Theme from '../../utils/Theme'

type VerticalSelectInputProps = {
  items: any
  placeHolderLabel: string
  label: string
  type: string
  inputName: string
  control: Control<any, any>
  errors: any
}

const VerticalSelectInput: React.FC<VerticalSelectInputProps> = ({
  placeHolderLabel,
  items,
  label,
  inputName,
  control,
  errors,
}) => {
  const placeholder = {
    label: placeHolderLabel,
    value: '',
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
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            items={items}
            onValueChange={onChange}
            placeholder={placeholder}
            style={pickerSelectStyles}
            value={value}
            useNativeAndroidPickerStyle={Platform.OS === 'ios' ? false : true}
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
