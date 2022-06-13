import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-ratings'
import { Review } from '../../../models/review.model'
import Theme from '../../../utils/Theme'
import ReviewScreen from '../../review/ReviewScreen'

type CompanyReviewProps = {
  companyReviews: Review[]
  navigation: NavigationProp<ParamListBase>
}

const CompanyReview: React.FC<CompanyReviewProps> = ({ companyReviews, navigation }) => {
  const [openReviewForm, setOpenReviewForm] = useState(false)

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true)
  }

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false)
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.heading}>List Review</Text>
        <TouchableOpacity onPress={handleOpenReviewForm}>
          <Text style={[styles.text, { color: Theme.palette.main.primary }]}>Write comment</Text>
        </TouchableOpacity>
      </View>
      {companyReviews.length <= 0 ? (
        <Text>Let's write your own review !!!</Text>
      ) : (
        <>
          {companyReviews.map((review, index) => (
            <View
              key={index}
              style={{
                borderBottomColor: Theme.palette.main.primary,
                borderBottomWidth: 3,
                paddingBottom: 8,
              }}
            >
              <Text style={{ ...Theme.fonts.headline.h6 }}>{review.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 8,
                }}
              >
                <Rating
                  startingValue={review.rating}
                  readonly={true}
                  style={{ alignSelf: 'flex-start' }}
                />
                <Text style={styles.text}>Good</Text>
              </View>
              <Text style={styles.text}>{review.comment}</Text>
            </View>
          ))}
        </>
      )}

      {openReviewForm && (
        <ReviewScreen handleCloseReviewForm={handleCloseReviewForm} navigation={navigation} />
      )}
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
    ...Theme.fonts.headline.h5,
  },

  text: {
    ...Theme.fonts.body.body1,
  },
})
