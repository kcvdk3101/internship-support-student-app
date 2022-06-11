import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import PopularCompanyCard from '../../components/cards/PopularCompanyCard'
import { screenWidth } from '../../constant'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'
import RecommendedJobCard from '../../components/cards/RecommendedJobCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View>
          {isAuthenticated && user && (
            <Text style={styles.helloText}>
              Welcome, {user.lastName} {user.firstName}
            </Text>
          )}
          <Text style={styles.bannerText}>Find Your</Text>
          <Text style={styles.bannerText}>Dream Job</Text>
        </View>

        {/* Popular From Companies */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.heading}>Recommended</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobDetailScreen')}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  ...Theme.fonts.body.body2,
                  color: Theme.palette.background.modal,
                  marginTop: 24,
                }}
              >
                Show all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            alwaysBounceHorizontal
            style={{
              paddingVertical: 8,
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <RecommendedJobCard key={index} />
            ))}
          </ScrollView>
        </View>

        {/* Popular From Companies */}
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.heading}>Popular comapanies</Text>
          <PopularCompanyCard />
          <PopularCompanyCard />
          <PopularCompanyCard />
          <PopularCompanyCard />
          <PopularCompanyCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
  },
  helloText: {
    marginBottom: 8,
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
  bannerText: {
    ...Theme.fonts.headline.h4,
    color: Theme.palette.black.primary,
  },
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
    marginTop: 24,
  },
})
