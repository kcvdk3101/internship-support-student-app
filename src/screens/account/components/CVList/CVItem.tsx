import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Theme from '../../../../utils/Theme'

type CVItemProps = {
  name: string
  createdAt: string
  createdBy: string
}

const CVItem: React.FC<CVItemProps> = ({ name, createdAt, createdBy }) => {
  return (
    <View style={styles.cvItemContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.cvItemName}>{name}</Text>
        <TouchableOpacity>
          <Image
            style={styles.deleteIcon}
            source={require('../../../../assets/images/icon-delete.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.flex}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/images/icon-bolt.png')}
          />
          <Text style={styles.text}>{createdAt}</Text>
        </View>
        <View style={styles.flex}>
          <Image
            style={styles.icon}
            source={require('../../../../assets/images/icon-upload.png')}
          />
          <Text style={styles.text}>{createdBy}</Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <View style={styles.btnItem}>
          <TouchableOpacity>
            <Text style={styles.btnItemText}>preview</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnItem}>
          <TouchableOpacity>
            <Text style={styles.btnItemText}>change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CVItem

const styles = StyleSheet.create({
  cvItemContainer: {
    padding: 16,
    borderWidth: 2,
    borderColor: Theme.palette.main.fourth,
    borderRadius: 10,
    marginBottom: 15,
  },
  cvItemName: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.black.primary,
  },
  deleteIcon: {
    width: 30,
    height: 30,
    tintColor: Theme.palette.red.signOut,
  },
  icon: {
    flexShrink: 0,
    width: 15,
    height: 15,
    tintColor: Theme.palette.paragraph.primary,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    ...Theme.shadow.depth5,
  },
  btnItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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
