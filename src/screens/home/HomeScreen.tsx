import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PopularCompanyCard from '../../components/cards/PopularCompanyCard'
import RecommendedJobCard from '../../components/cards/RecommendedJobCard'
import { useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const SearchBar = () => {
  return (
    <View style={seacrhbar.searchbar}>
      <View style={seacrhbar.buttonSearch}>
        <Ionicons name="search" size={20} color={Theme.palette.black.primary} />
      </View>
      <Text style={seacrhbar.textInput}>Search Job</Text>
    </View>
  )
}

const seacrhbar = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  buttonSearch: {
    marginRight: 8,
    ...Theme.shadow.depth5,
  },
  textInput: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
  },
})

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

        <SearchBar />

        {/* Popular From Companies */}
        <View>
          <View style={styles.subContainer}>
            <Text style={styles.heading}>Recommended</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobScreen')}>
              <Text style={styles.showText}>Show all</Text>
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
          <View style={styles.subContainer}>
            <Text style={styles.heading}>Popular comapanies</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobScreen')}>
              <Text style={styles.showText}>Show all</Text>
            </TouchableOpacity>
          </View>
          {Array.from({ length: 5 }).map((_, index) => (
            <PopularCompanyCard key={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showText: {
    textTransform: 'capitalize',
    ...Theme.fonts.body.body2,
    color: Theme.palette.background.modal,
    marginTop: 24,
  },
})
