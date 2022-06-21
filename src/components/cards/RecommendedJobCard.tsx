import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

type RecommendedJobCardProps = {
  navigation: NavigationProp<ParamListBase>
  jobTitle: string
  jobId: string
  salary: string
  dateCreated: string
  corpName: string
  city: string
}

const RecommendedJobCard: React.FC<RecommendedJobCardProps> = ({
  navigation,
  jobTitle,
  jobId,
  salary,
  dateCreated,
  corpName,
  city,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={() =>
        navigation.navigate('JobDetail', {
          jobId: jobId,
        })
      }
    >
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
      <View style={styles.corp}>
        <View>
          <Image style={styles.image} source={{ uri: 'https://picsum.photos/200' }} />
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: Theme.palette.white.secondary }}>{corpName}</Text>
          <Text style={{ color: Theme.palette.background.modal }}>{city}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  corp: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 4,
  },
})
