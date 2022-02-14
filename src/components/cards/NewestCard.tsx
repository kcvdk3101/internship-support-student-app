import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { keywordData } from '../../db/KeywordData'
import Theme from '../../utils/Theme'
import ChipButton from '../buttons/ChipButton'

type KeyWord = {
  name: string
  bgColor: string
  txtColor: string
}

type NewestCardProps = {
  card: {
    banner: string
    name: string
    desc: string
    image: string
    jobs: number
    kw: KeyWord[]
  }
}

const NewestCard: React.FC<NewestCardProps> = ({ card }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.image}
        source={{ uri: card.banner }}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.companyName}>{card.name}</Text>
        <Text numberOfLines={2} style={styles.companyDesc}>
          {card.desc}
        </Text>
        <View style={styles.jobAvailableContainer}>
          <Image
            style={styles.jobAvailableImage}
            source={{ uri: card.image }}
            resizeMode="contain"
          />
          <Text style={styles.jobAvailable}>
            {card.jobs} {card.jobs > 1 ? 'Jobs' : 'Job'} Available
          </Text>
        </View>
        <View style={styles.skillList}>
          {card.kw.map((kw, index) => (
            <ChipButton
              key={index}
              name={kw.name}
              bgColor={kw.bgColor}
              txtColor={kw.txtColor}
              fsize={14}
              disabled={true}
              mrgnV={6}
            />
          ))}
        </View>
      </View>
    </View>
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
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  jobAvailableImage: {
    flexShrink: 0,
    width: 20,
    height: 20,
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