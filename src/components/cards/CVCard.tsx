import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type CVItemProps = {
  name: string
  position: string
  createdAt: string
}

const CVCard: React.FC<CVItemProps> = ({ name, position, createdAt }) => {
  return (
    <View style={styles.cvItemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.cvItemName}>{name}</Text>
        <Ionicons name="pencil" size={24} color={Theme.palette.main.third} />
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={styles.text}>{position}</Text>
        <Text style={styles.text}>{createdAt}</Text>
      </View>
    </View>
  )
}

export default CVCard

const styles = StyleSheet.create({
  cvItemContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: Theme.palette.main.fourth,
    borderRadius: 10,
    marginBottom: 15,
  },
  cvItemName: {
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
  text: {
    ...Theme.fonts.body.body1,
    marginTop: 4,
  },
})
