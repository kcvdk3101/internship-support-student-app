import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../constant'
import Theme from '../../utils/Theme'

type NotificationCardProps = {
  title: string
  content: string
  createdAt: string | Date | number
  hadRead: boolean
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  content,
  createdAt,
  hadRead,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hadRead
            ? Theme.palette.white.primary
            : Theme.palette.main.secondary,
        },
      ]}
    >
      <View style={styles.headingContainer}>
        <Text
          style={[
            styles.heading,
            {
              color: hadRead
                ? Theme.palette.black.primary
                : Theme.palette.white.primary,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.timestamp,
            {
              color: hadRead
                ? Theme.palette.black.primary
                : Theme.palette.white.primary,
            },
          ]}
        >
          {createdAt}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.content,
            {
              color: hadRead
                ? Theme.palette.black.primary
                : Theme.palette.white.primary,
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
    width: screenWidth,
    padding: 12,
    ...Theme.shadow.depth3,
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
