import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-datepicker'
import Theme from '../../utils/Theme'

type VerticalDateTimePickerProps = {}

const VerticalDateTimePicker: React.FC<VerticalDateTimePickerProps> = () => {
  return (
    <View style={styles.container}>
      <Text>VerticalDateTimePicker</Text>
      <DatePicker
        style={{ width: 200 }}
        date={new Date()}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2020-04-16"
        maxDate="2030-04-16"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        // onDateChange={(date) => {
        //   this.setState({ date: date })
        // }}
      />
    </View>
  )
}

export default VerticalDateTimePicker

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
