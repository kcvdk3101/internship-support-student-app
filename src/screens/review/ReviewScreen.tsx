import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import GeneralButton from '../../components/buttons/GeneralButton'
import { screenHeight } from '../../constant'
import Theme from '../../utils/Theme'
import ReviewForm from './components/ReviewForm'

type ReviewScreenProps = {
  companyId: string
  handleCloseReviewForm: () => void
  navigation: NavigationProp<ParamListBase>
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({
  companyId,
  handleCloseReviewForm,
  navigation,
}) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={{ flex: 1, backgroundColor: Theme.palette.background.modal }}>
          <View
            style={{
              height: screenHeight,
              justifyContent: 'flex-end',
            }}
          >
            <ReviewForm companyId={companyId} handleCloseReviewForm={handleCloseReviewForm} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({})
