import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type CompanyCardProps = {
  company: {
    image: string
    name: string
    address: string
    group: number
    jobs: string
  }
}

type CompanyDetailInformationProps = {
  icon: string
  content: string
}

const CompanyDetailInformation: React.FC<CompanyDetailInformationProps> = ({
  icon,
  content,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        color={Theme.palette.white.primary}
        size={16}
        name={
          icon === 'location'
            ? 'location'
            : icon === 'people'
            ? 'people'
            : 'briefcase'
        }
      />
      <Text
        style={[
          styles.content,
          {
            fontSize: 12,
          },
        ]}
      >
        {content}
      </Text>
    </View>
  )
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardMedia}>
        <Image
          style={styles.logo}
          source={{ uri: company.image }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.companyName}>{company.name}</Text>
        <View style={styles.companyInfo}>
          <CompanyDetailInformation icon="location" content={company.address} />
          <CompanyDetailInformation
            icon="people"
            content={company.group.toString()}
          />
          <CompanyDetailInformation icon="briefcase" content={company.jobs} />
        </View>
      </View>
    </View>
  )
}

export default CompanyCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
  },
  content: {
    marginLeft: 4,
    color: Theme.palette.white.primary,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: Theme.palette.main.fourth,
    borderRadius: 10,
    ...Theme.shadow.depth1,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 8,
  },
  cardMedia: {
    ...Theme.shadow.depth2,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  cardBody: {
    marginTop: 8,
  },
  companyName: {
    alignSelf: 'center',
    color: Theme.palette.white.primary,
    ...Theme.fonts.body.body1,
    marginVertical: 4,
  },
  companyInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
})
