import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Theme from '../../utils/Theme'

type CustomSearchBarProps = {}

type FieldProps = {
  input: string
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      input: '',
    },
  })

  const onSubmit = (data: FieldProps) => Alert.alert(JSON.stringify(data))

  return (
    <View style={styles.container}>
      <View style={styles.buttonSearch}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Ionicons
            name="search"
            size={20}
            color={Theme.palette.white.primary}
          />
        </TouchableOpacity>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoCapitalize="none"
            autoCompleteType="name"
            autoCorrect={false}
            onBlur={onBlur}
            keyboardType="ascii-capable"
            returnKeyType="done"
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor={Theme.palette.white.primary}
            value={value}
            onChangeText={onChange}
            clearTextOnFocus
          />
        )}
        name="input"
      />
    </View>
  )
}

export default CustomSearchBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.palette.black.primary,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: 200,
  },
  buttonSearch: {
    marginRight: 8,
  },
  textInput: {
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
  },
})
