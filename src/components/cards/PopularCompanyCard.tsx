import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Theme from '../../utils/Theme'

type PopularCompanyCardProps = {
  navigation: NavigationProp<ParamListBase>
  companyId: string
  companyName: string
  location: string
  overtimeRequire: string
  special: string
}

type CompanyDetailInformationProps = {
  icon: string
  content: string
}

const CompanyDetailInformation: React.FC<CompanyDetailInformationProps> = ({ icon, content }) => {
  return (
    <View style={styles.info}>
      <Ionicons
        color={Theme.palette.white.secondary}
        size={20}
        name={
          icon === 'location' ? 'location' : icon === 'briefcase' ? 'briefcase' : 'share-social'
        }
      />
      <Text style={[styles.content]} numberOfLines={1} ellipsizeMode="head">
        {content}
      </Text>
    </View>
  )
}

const PopularCompanyCard: React.FC<PopularCompanyCardProps> = ({
  navigation,
  companyId,
  companyName,
  location,
  overtimeRequire,
  special,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('CompanyDetailScreen', {
          companyId: companyId,
        })
      }
    >
      <View style={styles.innerContainer}>
        <View style={styles.hot}>
          <Text style={styles.hotText}>Hot</Text>
        </View>
        <Text style={styles.heading}>{companyName}</Text>
      </View>
      <View style={styles.companyInfo}>
        <CompanyDetailInformation icon="briefcase" content={overtimeRequire} />
        <CompanyDetailInformation icon="location" content={location} />
        <CompanyDetailInformation icon="time" content={special} />
      </View>
    </TouchableOpacity>
  )
}

export default PopularCompanyCard

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Theme.palette.main.primary,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
  },
  info: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  heading: {
    marginLeft: 12,
    ...Theme.fonts.headline.h6,
    fontWeight: '600',
  },
  hot: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Theme.palette.red.signOut,
  },
  hotText: {
    color: Theme.palette.white.primary,
  },
  content: {
    marginLeft: 4,
    color: Theme.palette.black.primary,
  },
  companyInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})
