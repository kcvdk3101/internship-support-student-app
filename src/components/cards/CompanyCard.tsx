import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import CompDetailInfo from '../common/CompDetailInfo'

type CompanyCardProps = {
  company: {
    image: string
    name: string
    address: string
    group: number
    jobs: string
  }
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
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-place.png')}
            imageSize={16}
            fSize={12}
            content={company.address}
          />
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-supervisor.png')}
            imageSize={16}
            fSize={12}
            content={company.group.toString()}
          />
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-company.png')}
            imageSize={16}
            fSize={12}
            content={company.jobs}
          />
        </View>
      </View>
    </View>
  )
}

export default CompanyCard

const styles = StyleSheet.create({
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
