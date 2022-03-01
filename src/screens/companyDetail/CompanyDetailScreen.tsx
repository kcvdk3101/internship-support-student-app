import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type CompanyDetailScreenProps = {}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = () => {
  return (
    <View>
      <View>
        <View>Background Image</View>
        <View>
          Float
          <View>Image</View>
          <View>Company Name</View>
          <View>Information</View>
        </View>
      </View>
      <View>Button Tab Group</View>
      <View>Show Content based on Button</View>
    </View>
  )
}

export default CompanyDetailScreen

const styles = StyleSheet.create({})
