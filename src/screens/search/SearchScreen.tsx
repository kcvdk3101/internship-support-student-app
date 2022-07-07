import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import corporationApi from '../../api/corporation/corporationApi'
import jobApi from '../../api/corporation/jobApi'
import JobCard from '../../components/cards/JobCard'
import PopularCompanyCard from '../../components/cards/PopularCompanyCard'
import NoSearching from '../../components/common/NoSearching'
import { screenHeight, screenWidth } from '../../constant'
import { CorporationModel } from '../../models/corporation.model'
import { JobModel } from '../../models/job.model'
import Theme from '../../utils/Theme'
import ButtonGroup from '../companyDetail/components/ButtonGroup'

type SearchScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

type SearchBarProps = {
  searchInput: string
  handleOnChange: (value: string) => void
  handleSubmit: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, handleOnChange, handleSubmit }) => {
  const { t } = useTranslation()

  return (
    <KeyboardAvoidingView style={seacrhbar.searchbar}>
      <View style={seacrhbar.buttonSearch}>
        <Ionicons name="search" size={20} color={Theme.palette.black.primary} />
      </View>
      <TextInput
        style={seacrhbar.textInput}
        placeholder={t('Search fullname')}
        placeholderTextColor={Theme.palette.black.primary}
        focusable={true}
        autoFocus={true}
        value={searchInput}
        onChangeText={(text) => handleOnChange(text)}
        onSubmitEditing={() => handleSubmit()}
      />
    </KeyboardAvoidingView>
  )
}

const seacrhbar = StyleSheet.create({
  searchbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    padding: 16,
  },
  buttonSearch: {
    marginRight: 8,
    ...Theme.shadow.depth5,
  },
  textInput: {
    flex: 1,
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
  },
})

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const [index, setIndex] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const [jobsResult, setJobsResult] = useState<JobModel[]>([])
  const [companiesResult, setCompaniesResult] = useState<CorporationModel[]>([])

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  async function searching() {
    setLoading(true)
    try {
      let jobs
      if (index === 0) {
        if (searchInput === '') {
          jobs = await jobApi.getAllJobs({ limit: 10, offset })
        } else {
          jobs = await jobApi.getAllJobsByTitle(searchInput, 10, offset)
        }
        if (jobs.data.length > 0) {
          setJobsResult(jobs.data)
          setLoading(false)
        }
      } else {
        const companies = await corporationApi.getCorporationByName(searchInput)
        if (companies.corporation.length > 0) {
          setCompaniesResult(companies.corporation)
          setLoading(false)
        }
      }
    } catch (error) {
      Alert.alert('Something wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searching()
  }, [navigation, index, searchInput])

  const handleOnChange = (value: string) => {
    setSearchInput(value)
  }

  const handleSubmit = async () => {
    searching()
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => {
              navigation.goBack()
              setIndex(0)
              setSearchInput('')
              setOffset(0)
              setJobsResult([])
              setCompaniesResult([])
            }}
            style={styles.icon}
          >
            <Ionicons name="arrow-back" size={24} color={Theme.palette.black.primary} />
          </Pressable>
          <SearchBar
            searchInput={searchInput}
            handleOnChange={handleOnChange}
            handleSubmit={handleSubmit}
          />
        </View>
        <View style={{ marginTop: 16, alignSelf: 'stretch' }}>
          <ButtonGroup
            index={index}
            titleTab1={t('Job')}
            titleTab2={t('Company')}
            handleChangeIndex={handleChangeIndex}
          />
        </View>
        {loading ? (
          <View style={{ marginVertical: 16 }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            {index === 0 ? (
              <View>
                {jobsResult.length === 0 ? (
                  <NoSearching />
                ) : (
                  jobsResult.map((job, index) => (
                    <JobCard
                      key={index}
                      jobId={job.id}
                      title={job.title}
                      location={`District ${job.details.location[0].district}, ${job.details.location[0].city}`}
                      salary={`${job.details.salary[0].gt} - ${job.details.salary[0].lt} ${job.details.salary[0].unit}`}
                      timestamp={job.details.corporation[0].overtimeRequire}
                      navigation={navigation}
                    />
                  ))
                )}
              </View>
            ) : (
              <View>
                {companiesResult.map((company, index) => (
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
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    ...Theme.fonts.headline.h4,
    backgroundColor: Theme.palette.white.primary,
  },
})
