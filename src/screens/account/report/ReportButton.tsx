import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'

type ReportButtonProps = {
  handleOpenForm: (action: string) => void
}

const ReportButton: React.FC<ReportButtonProps> = ({ handleOpenForm }) => {
  return (
    <View style={styles.reportContainer}>
      <TouchableOpacity style={styles.btnReport} onPress={() => handleOpenForm('openReportForm')}>
        <Ionicons name="file-tray-full-sharp" size={24} color="black" />
        <Text style={styles.reportText}>Report files</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReportButton

const styles = StyleSheet.create({
  reportContainer: {
    ...Theme.shadow.depth2,
    backgroundColor: Theme.palette.white.primary,
    marginHorizontal: 16,
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnReport: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reportText: {
    marginLeft: 16,
    color: Theme.palette.main.third,
    ...Theme.fonts.headline.h6,
  },
})
