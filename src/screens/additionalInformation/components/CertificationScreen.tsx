import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import VerticalInput from '../../../components/common/VerticalInput'
import Theme from '../../../utils/Theme'
import DateTimePicker from '@react-native-community/datetimepicker'
import { screenHeight } from '../../../constant'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { useAppDispatch } from '../../../hooks/redux'
import { addProject } from '../../../features/cvSlice'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

type CertificationScreenProps = {}

const CertificationScreen: React.FC<CertificationScreenProps> = () => {
  return (
    <View>
      <Text>CertificationScreen</Text>
    </View>
  )
}

export default CertificationScreen

const styles = StyleSheet.create({})
