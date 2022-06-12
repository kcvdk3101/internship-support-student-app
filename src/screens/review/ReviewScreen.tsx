import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import GeneralButton from '../../components/buttons/GeneralButton'
import { screenHeight } from '../../constant'
import Theme from '../../utils/Theme'
import ReviewForm from './components/ReviewForm'

type ReviewScreenProps = {
  handleCloseReviewForm: () => void
  navigation: NavigationProp<ParamListBase>
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ handleCloseReviewForm, navigation }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={{ flex: 1, backgroundColor: Theme.palette.background.modal }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              height: screenHeight,
              justifyContent: 'flex-end',
            }}
          >
            <ReviewForm handleCloseReviewForm={handleCloseReviewForm} />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({})
