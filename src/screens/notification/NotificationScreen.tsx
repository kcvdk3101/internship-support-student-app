import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { notificationsData } from '../../db/NotificationData'
import NotificationCard from '../../components/cards/NotificationCard'

type NotificationScreenProps = {}

const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefeshing = () => {
    console.log('refresh new notification')
    // setIsLoading(!isLoading)
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isLoading}
        onRefresh={handleRefeshing}
        data={notificationsData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <NotificationCard
            key={index}
            title={item.title}
            content={item.content}
            createdAt={item.createdAt}
            hadRead={item.hadRead}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>You have no notifications.</Text>
          </View>
        )}
      />
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
