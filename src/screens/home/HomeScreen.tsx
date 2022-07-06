import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import corporationApi from '../../api/corporation/corporationApi'
import jobApi from '../../api/corporation/jobApi'
import PopularCompanyCard from '../../components/cards/PopularCompanyCard'
import RecommendedJobCard from '../../components/cards/RecommendedJobCard'
import { useAppSelector } from '../../hooks/redux'
import { CorporationModel } from '../../models/corporation.model'
import { JobModel } from '../../models/job.model'
import Theme from '../../utils/Theme'
import { Utils } from '../../utils/Utils'
import SkeletonComponentScreen from '../company/components/SkeletonComponentScreen'

type HomeScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const SearchBar: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {
  const { t } = useTranslation()

  return (
    <TouchableOpacity
      style={seacrhbar.searchbar}
      onPress={() => navigation.navigate('SearchScreen')}
    >
      <View style={seacrhbar.buttonSearch}>
        <Ionicons name="search" size={20} color={Theme.palette.black.primary} />
      </View>
      <Text style={seacrhbar.textInput} onPress={() => navigation.navigate('SearchScreen')}>
        {t('Search fullname')}
      </Text>
    </TouchableOpacity>
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
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  const [loading, setLoading] = useState<boolean>(false)
  const [recommendedJobs, setRecommendedJobs] = useState<JobModel[]>([])
  const [popularCompanies, setPopularCompanies] = useState<CorporationModel[]>([])

  async function init() {
    setLoading(true)
    try {
      const jobsResult = await jobApi.getAllJobsByCity('Ho Chi Minh', 5, 0)
      const companiesResult = await corporationApi.getCorporations({ limit: 5, offset: 0 })
      setRecommendedJobs(jobsResult.data)
      setPopularCompanies(companiesResult.data)
    } catch (error) {
      setRecommendedJobs([])
      setPopularCompanies([])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    init()
  }, [])

  useEffect(() => {
    init()
    return () => {
      setRecommendedJobs([])
      setPopularCompanies([])
    }
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <SkeletonComponentScreen />
      ) : (
        <ScrollView
          style={styles.innerContainer}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        >
          <View>
            {isAuthenticated && user && (
              <Text style={styles.helloText}>
                {t('Welcome')}, {user.lastName} {user.firstName}
              </Text>
            )}
            <Text style={styles.bannerText}>{t('Find Your')}</Text>
            <Text style={styles.bannerText}>{t('Dream Job')}</Text>
          </View>

          <SearchBar navigation={navigation} />

          {/* Popular From Companies */}
          <View>
            <View style={styles.subContainer}>
              <Text style={styles.heading}>{t('Recommended')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                <Text style={styles.showText}>{t('Show more')}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              pagingEnabled
              alwaysBounceHorizontal
              style={{
                paddingVertical: 8,
                minHeight: 200,
                maxHeight: 230,
              }}
            >
              {recommendedJobs.length > 0 &&
                recommendedJobs.map((job, index) => (
                  <RecommendedJobCard
                    key={index}
                    navigation={navigation}
                    jobId={job.id}
                    jobTitle={job.title}
                    dateCreated={Utils.convertDateString(job.dateCreated)}
                    salary={`${job.details.salary[0].gt} - ${job.details.salary[0].lt} ${job.details.salary[0].unit}`}
                    corpName={job.details.corporation[0].name}
                    city={job.details.location[0].city}
                  />
                ))}
            </ScrollView>
          </View>

          {/* Popular From Companies */}
          <View style={{ marginBottom: 16 }}>
            <View style={styles.subContainer}>
              <Text style={styles.heading}>{t('Popular comapanies')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('JobScreen')}>
                <Text style={styles.showText}>{t('Show more')}</Text>
              </TouchableOpacity>
            </View>
            {popularCompanies.length > 0 &&
              popularCompanies.map((company, index) => (
                <PopularCompanyCard
                  key={index}
                  navigation={navigation}
                  companyId={company.id}
                  companyName={company.name}
                  location={`District ${company.location[0].district}, ${company.location[0].city}`}
                  overtimeRequire={company.overtimeRequire}
                  special={company.special}
                />
              ))}
          </View>
        </ScrollView>
      )}
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
