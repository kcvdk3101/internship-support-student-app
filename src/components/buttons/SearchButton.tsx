import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather, Entypo } from '@expo/vector-icons'
import Theme from '../../utils/Theme'

type SearchButtonProps = {}

const width = Dimensions.get('screen').width

const SearchButton: React.FC<SearchButtonProps> = () => {
  return (
    <View style={styles.container}>
      <View
        // style={
        //   !props.clicked
        //     ? styles.searchBar__unclicked
        //     : styles.searchBar__clicked
        // }
        style={styles.searchBar__unclicked}
      >
        {/* search Icon */}
        <Feather name="search" size={20} color={Theme.palette.black.primary} />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          // value={props.searchPhrase}
          // onChangeText={props.setSearchPhrase}
          // onFocus={() => {
          //   props.setClicked(true)
          // }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        <Entypo
          name="cross"
          size={20}
          color={Theme.palette.black.primary}
          // onPress={() => {
          //   props.setSearchPhrase('')
          // }}
        />
      </View>
    </View>
  )
}

export default SearchButton

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.palette.main.primary,
    paddingVertical: 10,
  },
  searchBar__unclicked: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.75,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 15,
    padding: 10,
  },
  // searchBar__clicked: {
  //   padding: 10,
  //   flexDirection: 'row',
  //   width: '80%',
  //   backgroundColor: '#d9dbda',
  //   borderRadius: 15,
  //   alignItems: 'center',
  //   justifyContent: 'space-evenly',
  // },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 20,
  },
})
