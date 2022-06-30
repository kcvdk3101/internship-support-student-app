import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Theme from '../../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'
import studentApi from '../../../api/university/studentApi'

type CVCardToApplyProps = {
  cvId: string
  name: string
  position: string
  createdAt: string
  chooseCVToApply: (cvId: string) => void
}

const CVCardToApply: React.FC<CVCardToApplyProps> = ({
  cvId,
  name,
  position,
  createdAt,
  chooseCVToApply,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.cvItemName}>{name}</Text>
        <View style={{ marginTop: 4 }}>
          <Text style={styles.text}>{position}</Text>
          <Text style={styles.text}>{createdAt}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => chooseCVToApply(cvId)}>
        <Ionicons name="arrow-undo-circle" size={40} color={Theme.palette.main.primary} />
      </TouchableOpacity>
    </View>
  )
}

export default CVCardToApply

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  cvItemContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: Theme.palette.main.fourth,
    borderRadius: 10,
    marginBottom: 15,
  },
  cvItemName: {
    fontWeight: 'bold',
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
  },
  text: {
    ...Theme.fonts.body.body2,
    marginTop: 4,
  },
})
