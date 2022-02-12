import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'
import CompDetailInfo from '../items/CompDetailInfo'

type CompanyCardProps = {}

const CompanyCard: React.FC<CompanyCardProps> = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardMedia}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-company.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.companyName}>Company Name</Text>
        <View style={styles.companyInfo}>
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-place.png')}
            imageSize={16}
            fSize={12}
            content="District 3 Ho Chi Minh"
          />
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-supervisor.png')}
            imageSize={16}
            fSize={12}
            content="100"
          />
          <CompDetailInfo
            imageSrc={require('../../assets/images/icon-company.png')}
            imageSize={16}
            fSize={12}
            content="11 Jobs"
          />
        </View>
      </View>
    </View>
  )
}

export default CompanyCard

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
    backgroundColor: Theme.palette.main.fourth,
    borderRadius: 10,
    ...Theme.shadow.depth1,
    marginTop: 32,
    marginHorizontal: 5,
    padding: 8,
  },
  cardMedia: {
    ...Theme.shadow.depth2,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
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
