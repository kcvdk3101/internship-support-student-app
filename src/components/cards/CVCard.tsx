import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../../utils/Theme'

type CVItemProps = {
  name: string
  position: string
  createdAt: string
}

const CVCard: React.FC<CVItemProps> = ({ name, position, createdAt }) => {
  return (
    <View style={styles.cvItemContainer}>
      <Text style={styles.cvItemName}>{name}</Text>
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
  deleteIcon: {
    width: 30,
    height: 30,
    tintColor: Theme.palette.red.signOut,
  },
  text: {
    ...Theme.fonts.body.body1,
    marginTop: 4,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: Theme.palette.paragraph.primary,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Theme.palette.white.secondary,
    borderRadius: 10,
  },
  btnItemText: {
    textTransform: 'uppercase',
    ...Theme.fonts.body.button,
  },
})
