import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'

type JobCardProps = {
  jobId: string
  title: string
  location: string
  salary: string
  timestamp: string
  navigation: NavigationProp<ParamListBase>
}

const JobCard: React.FC<JobCardProps> = ({
  jobId,
  title,
  location,
  salary,
  timestamp,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('JobDetail', { jobId })}>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Ionicons
              name="location"
              size={20}
              color={Theme.palette.paragraph.primary}
              style={styles.icon}
            />
            <Text style={styles.text}>{location}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons
              name="cash"
              size={20}
              color={Theme.palette.paragraph.primary}
              style={styles.icon}
            />
            <Text style={styles.text}>{salary}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons
              name="time"
              size={20}
              color={Theme.palette.paragraph.primary}
              style={styles.icon}
            />
            <Text style={styles.text}>{timestamp}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default JobCard

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: Theme.palette.white.primary,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Theme.palette.main.third,
    padding: 20,
    marginVertical: 8,
  },
  heading: {
    ...Theme.fonts.headline.h6,
  },
  detailsContainer: {
    marginTop: 4,
  },
  icon: {
    flexShrink: 0,
    marginRight: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  text: {
    flexGrow: 1,
    ...Theme.fonts.body.body1,
  },
})
