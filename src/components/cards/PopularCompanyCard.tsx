import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../../utils/Theme'

type PopularCompanyCardProps = {}

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
        name={icon === 'location' ? 'location' : icon === 'cash' ? 'cash' : 'time'}
      />
      <Text style={[styles.content]}>{content}</Text>
    </View>
  )
}

const PopularCompanyCard: React.FC<PopularCompanyCardProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Company Name</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: 8,
        }}
      >
        <View style={styles.hot}>
          <Text style={styles.hotText}>Hot</Text>
        </View>
        <Text style={{ marginLeft: 8, ...Theme.fonts.body.body1, fontWeight: '600' }}>
          Job Title
        </Text>
      </View>
      <View style={styles.companyInfo}>
        <CompanyDetailInformation icon="location" content="District 3, Ho Chi Minh" />
        <CompanyDetailInformation icon="cash" content="1000-3000 USD" />
        <CompanyDetailInformation icon="time" content="1 day ago" />
      </View>
    </View>
  )
}

export default PopularCompanyCard

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Theme.palette.main.primary,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  info: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  heading: {
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
