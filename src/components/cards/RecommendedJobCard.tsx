import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type RecommendedJobCardProps = {}

const RecommendedJobCard: React.FC<RecommendedJobCardProps> = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.jobTitle}>Job Title</Text>
        <View style={styles.jobContainer}>
          <View style={styles.jobDetailContainer}>
            <Ionicons color={Theme.palette.white.secondary} size={20} name="cash" />
            <Text style={styles.jobDetailContent}>up to 10000 usd</Text>
          </View>
          <View style={styles.jobDetailContainer}>
            <Ionicons color={Theme.palette.white.secondary} size={20} name="time" />
            <Text style={styles.jobDetailContent}>64 days ago</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View>
          <Image style={styles.btnEditImage} source={{ uri: 'https://picsum.photos/200' }} />
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text>Company Name</Text>
          <Text>Ho Chi Minh</Text>
        </View>
      </View>
    </View>
  )
}

export default RecommendedJobCard

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75,
    backgroundColor: Theme.palette.main.third,
    borderRadius: 16,
    padding: 16,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  jobTitle: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.white.primary,
  },
  jobContainer: {
    marginVertical: 8,
  },
  jobDetailContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  jobDetailContent: {
    marginLeft: 8,
    color: Theme.palette.white.secondary,
  },
  btnEditImage: {
    width: 36,
    height: 36,
    borderRadius: 4,
  },
})
