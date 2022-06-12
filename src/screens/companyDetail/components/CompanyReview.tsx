import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Review } from '../../../models/review.model'
import Theme from '../../../utils/Theme'
import { Rating, AirbnbRating } from 'react-native-ratings'

type CompanyReviewProps = {
  companyReview: Review[]
}

const CompanyReview: React.FC<CompanyReviewProps> = ({ companyReview }) => {
  const [rating, setRating] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List review</Text>
      <View>
        <Text>Review Heading Text</Text>
        <Text>Comment</Text>
        <View>
          <Rating
            ratingCount={4}
            showReadOnlyText
            showRating
            onFinishRating={(rating: string) => console.log(rating)}
            style={{ paddingVertical: 10 }}
          />
        </View>
      </View>
    </View>
  )
}

export default CompanyReview

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  heading: {
    marginVertical: 8,
    color: Theme.palette.black.primary,
    ...Theme.fonts.headline.h6,
  },
  text: {
    ...Theme.fonts.body.body1,
  },
})
