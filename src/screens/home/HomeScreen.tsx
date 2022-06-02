import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import PopularCompanies from '../company/components/PopularCompanies'

type HomeScreenProps = {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return (
    <View style={styles.container}>
      <View>
        {isAuthenticated && user && <Text style={styles.helloText}>Hello, {user.fullName}</Text>}
        <Text style={styles.bannerText}>Find Your</Text>
        <Text style={styles.bannerText}>Dream Job</Text>
      </View>
      <PopularCompanies />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  helloText: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
  },
  bannerText: {
    ...Theme.fonts.headline.h4,
    color: Theme.palette.black.primary,
  },
})
