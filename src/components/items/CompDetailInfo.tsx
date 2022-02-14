import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Theme from '../../utils/Theme'

type CompDetailInfoProps = {
  imageSrc: any
  imageSize: number
  fSize: number
  content: string
}

const CompDetailInfo: React.FC<CompDetailInfoProps> = ({
  imageSrc,
  imageSize,
  fSize,
  content,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.logo,
          {
            width: imageSize,
            height: imageSize,
          },
        ]}
        source={imageSrc}
      />
      <Text
        style={[
          styles.content,
          {
            fontSize: fSize,
          },
        ]}
      >
        {content}
      </Text>
    </View>
  )
}

export default CompDetailInfo

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
  },
  logo: {
    tintColor: Theme.palette.paragraph.primary,
  },
  content: {
    marginLeft: 4,
    color: Theme.palette.white.primary,
  },
})
