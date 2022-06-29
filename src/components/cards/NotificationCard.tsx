import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'

type NotificationCardProps = {
  title: string
  content: string
  hadRead: boolean
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, content, hadRead }) => {
  const hadBeenRead = hadRead ? Theme.palette.black.primary : Theme.palette.white.primary

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hadRead ? Theme.palette.white.primary : Theme.palette.main.secondary,
        },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text
          style={[
            styles.heading,
            {
              color: hadBeenRead,
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.content,
            {
              color: hadBeenRead,
            },
          ]}
        >
          {content}
        </Text>
      </View>
    </View>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  container: {
    padding: 12,
    ...Theme.shadow.depth3,
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    ...Theme.fonts.headline.h6,
  },
  timestamp: {
    ...Theme.fonts.body.caption1,
  },
  contentContainer: {
    marginVertical: 8,
  },
  content: {
    ...Theme.fonts.body.body1,
  },
})
