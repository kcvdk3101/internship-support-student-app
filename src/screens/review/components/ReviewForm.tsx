import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { screenHeight } from '../../../constant'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'
import { Rating } from 'react-native-ratings'
import GeneralButton from '../../../components/buttons/GeneralButton'
import VerticalInput from '../../../components/common/VerticalInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type ReviewFormProps = {
  handleCloseReviewForm: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ handleCloseReviewForm }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const [review1, setReview1] = useState(1)
  const [review2, setReview2] = useState(1)
  const [review3, setReview3] = useState(1)
  const [review4, setReview4] = useState(1)
  const [review5, setReview5] = useState(1)

  const hanldeChangeReview1 = (rating: number) => {
    setReview1(rating)
  }
  const hanldeChangeReview2 = (rating: number) => {
    setReview2(rating)
  }
  const hanldeChangeReview3 = (rating: number) => {
    setReview3(rating)
  }
  const hanldeChangeReview4 = (rating: number) => {
    setReview4(rating)
  }
  const hanldeChangeReview5 = (rating: number) => {
    setReview5(rating)
  }

  const reviewDetail = [
    {
      title: 'Salary & benefits',
      review: review1,
      handleChange: hanldeChangeReview1 as (rating: number) => void,
    },
    {
      title: 'Training & learning',
      review: review2,
      handleChange: hanldeChangeReview2 as (rating: number) => void,
    },
    {
      title: 'Employee care',
      review: review3,
      handleChange: hanldeChangeReview3 as (rating: number) => void,
    },
    {
      title: 'Culture & fun',
      review: review4,
      handleChange: hanldeChangeReview4 as (rating: number) => void,
    },
    {
      title: 'Office & workspace',
      review: review5,
      handleChange: hanldeChangeReview5 as (rating: number) => void,
    },
  ]

  return (
    <View style={styles.form}>
      <Ionicons name="close" onPress={handleCloseReviewForm} size={30} style={{ width: 50 }} />
      <View>
        <VerticalInput
          label="Title"
          type="name"
          inputName="title"
          placeholder="Title"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="ascii-capable"
          control={control}
          errors={errors}
        />
        <VerticalInput
          label="Content"
          type="name"
          inputName="content"
          placeholder="Write your review"
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="ascii-capable"
          multiline={true}
          control={control}
          errors={errors}
        />
        <View style={{ marginVertical: 16 }}>
          {reviewDetail.map((r, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...Theme.fonts.body.body2 }}>{r.title}</Text>

              <Rating
                ratingCount={5}
                startingValue={r.review}
                style={{
                  alignSelf: 'center',
                  marginVertical: 4,
                }}
                imageSize={30}
                onFinishRating={(rating: number) => r.handleChange(rating)}
              />
            </View>
          ))}
        </View>
      </View>

      <GeneralButton
        isLoading={false}
        label="Post Review"
        txtColor={Theme.palette.white.primary}
        bgColor={Theme.palette.main.third}
        isAlignCenter={true}
      />
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
  form: {
    height: 'auto',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
