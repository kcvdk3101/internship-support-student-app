import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Rating } from 'react-native-ratings'
import * as yup from 'yup'
import GeneralButton from '../../../components/buttons/GeneralButton'
import VerticalInput from '../../../components/common/VerticalInput'
import { screenHeight } from '../../../constant'
import { getCorporationsById } from '../../../features/corporationSlice'
import { addNewReview } from '../../../features/reviewSlice'
import { useAppDispatch } from '../../../hooks/redux'
import { Review } from '../../../models/review.model'
import Theme from '../../../utils/Theme'

type ReviewFormProps = {
  companyId: string
  handleCloseReviewForm: () => void
}

type Input = {
  title: string
  content: string
}

const reviewSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
})

const ReviewForm: React.FC<ReviewFormProps> = ({ companyId, handleCloseReviewForm }) => {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(reviewSchema),
  })

  const [loading, setLoading] = useState(false)
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

  const onSubmit = async (data: Input) => {
    let review: Review[] = []
    review.push({
      title: data.title,
      comment: data.content,
      isRecommendable: 'Yes',
      rating: (review1 + review2 + review3 + review4 + review5) / 5,
      subReview: [
        {
          content: 'Salary & benefits',
          rating: review1,
        },
        {
          content: 'Training & learning',
          rating: review2,
        },
        {
          content: 'Management cares about me',
          rating: review3,
        },
        {
          content: 'Culture & fun',
          rating: review4,
        },
        {
          content: 'Office * workspace',
          rating: review5,
        },
      ],
    })

    try {
      setLoading(true)
      const response = await dispatch(addNewReview({ corporationId: companyId, review }))
      if (response.meta.requestStatus === 'fulfilled') {
        setLoading(false)
      }
    } catch (error) {
      console.log(error as any)
    } finally {
      setLoading(false)
      handleCloseReviewForm()
    }
  }

  return (
    <View style={styles.form}>
      <Ionicons name="close" onPress={handleCloseReviewForm} size={30} style={{ width: 50 }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <VerticalInput
          label="Title"
          type="name"
          inputName="title"
          placeholder="Title"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="ascii-capable"
          editable={!loading}
          control={control}
          errors={errors}
        />
        <VerticalInput
          label="Content"
          type="name"
          inputName="content"
          placeholder="Write your review"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="ascii-capable"
          multiline={true}
          editable={!loading}
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
      </KeyboardAvoidingView>

      <GeneralButton
        isLoading={loading}
        label="Post Review"
        txtColor={Theme.palette.white.primary}
        bgColor={Theme.palette.main.third}
        isAlignCenter={true}
        onPress={handleSubmit(onSubmit)}
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
