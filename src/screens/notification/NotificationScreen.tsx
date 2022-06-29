import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import postApi from '../../api/university/postApi'
import NotificationCard from '../../components/cards/NotificationCard'
import { ADMIN } from '../../constant'
import { PostModel } from '../../models/post.model'

type NotificationScreenProps = {}

const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<PostModel[]>([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await postApi.getAllPosts(ADMIN, offset)
        if (response.data.length > 0) {
          setData(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <NotificationCard
            key={index}
            title={item.title}
            content={item.content}
            hadRead={item.isPublished}
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
    padding: 8,
  },
})
