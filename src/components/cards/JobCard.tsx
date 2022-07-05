import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

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
            <Text style={styles.text}>{salary} USD</Text>
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
    backgroundColor: Theme.palette.white.primary,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Theme.palette.main.third,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  heading: {
    ...Theme.fonts.headline.h6,
  },
  detailsContainer: {
    marginTop: 4,
  },
  icon: {
    marginRight: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    ...Theme.fonts.body.body2,
  },
})
