import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type NewestCardProps = {
  card: {
    companyId: string
    banner: string
    name: string
    location: string
    jobs: number
  }
  navigation: NavigationProp<ParamListBase>
}

const NewestCard: React.FC<NewestCardProps> = ({ card, navigation }) => {
  return (
    <TouchableWithoutFeedback
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('CompanyDetailScreen', {
          companyId: card.companyId,
        })
      }
    >
      <Image style={styles.image} source={{ uri: card.banner }} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.companyName}>{card.name}</Text>
        <View style={styles.jobAvailableContainer}>
          <Ionicons name="location-sharp" size={20} color={Theme.palette.black.primary} />

          <Text style={styles.jobAvailable}>{card.location}</Text>
        </View>
        <View style={styles.jobAvailableContainer}>
          <Ionicons name="briefcase" size={20} color={Theme.palette.black.primary} />
          <Text style={styles.jobAvailable}>
            {card.jobs} {card.jobs > 1 ? 'Jobs' : 'Job'} Available
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NewestCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: Theme.palette.white.primary,
    ...Theme.shadow.depth1,
    marginBottom: 16,
  },
  cardBody: {
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  image: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 160,
  },
  companyName: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.main.primary,
  },
  companyDesc: {
    ...Theme.fonts.body.body2,
    color: Theme.palette.black.primary,
    marginVertical: 8,
  },
  jobAvailableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  jobAvailable: {
    marginLeft: 8,
    ...Theme.fonts.body.body2,
    color: Theme.palette.black.primary,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
