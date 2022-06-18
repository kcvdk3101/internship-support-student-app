import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type RecommendedJobCardProps = {
  jobTitle: string
  salary: string
  dateCreated: string
  corpName: string
  city: string
}

const RecommendedJobCard: React.FC<RecommendedJobCardProps> = ({
  jobTitle,
  salary,
  dateCreated,
  corpName,
  city,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
        <View style={styles.jobContainer}>
          <View style={styles.jobDetailContainer}>
            <Ionicons color={Theme.palette.white.secondary} size={20} name="cash" />
            <Text style={styles.jobDetailContent}>{salary}</Text>
          </View>
          <View style={styles.jobDetailContainer}>
            <Ionicons color={Theme.palette.white.secondary} size={20} name="time" />
            <Text style={styles.jobDetailContent}>{dateCreated}</Text>
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
          <Text style={{ color: Theme.palette.black.primary }}>{corpName}</Text>
          <Text>{city}</Text>
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
