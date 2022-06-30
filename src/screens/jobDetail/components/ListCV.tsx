import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import corporationApi from '../../../api/corporation/corporationApi'
import studentApi from '../../../api/university/studentApi'
import { screenHeight, screenWidth } from '../../../constant'
import { useAppSelector } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'
import { Utils } from '../../../utils/Utils'
import CVCardToApply from './CVCardToApply'

type ListCVProps = {
  corpId: string
  jobId: string
  handleCloseModal: () => void
}

const ListCV: React.FC<ListCVProps> = ({ corpId, jobId, handleCloseModal }) => {
  const CVs = useAppSelector((state) => state.cv.CVs)
  const studentId = useAppSelector((state) => state.auth.user.studentId)

  const chooseCVToApply = (cvId: string) => {
    return Alert.alert('Confirm', 'Do you want to use this CV to apply job?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          let candidates = []
          try {
            candidates.push({
              studentId,
              cvId,
              jobId,
            })
            const response = await corporationApi.applyCV(corpId, candidates)
            if (response.candidate.length > 0) {
              Alert.alert(response.message)
            } else {
              Alert.alert('Fail to apply your CV')
            }
          } catch (error) {
            Alert.alert('Something wrong!')
          }
        },
      },
    ])
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Ionicons name="close" onPress={handleCloseModal} size={30} style={{ width: 50 }} />
            <Text style={{ marginVertical: 8, ...Theme.fonts.headline.h6 }}>Choose your CV</Text>
            <FlatList
              data={CVs}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CVCardToApply
                  key={index}
                  cvId={item.id as string}
                  name={item.name}
                  position={`Position: ${item.position}`}
                  createdAt={`Created at : ${Utils.convertDateString(item.createdAt)}`}
                  chooseCVToApply={chooseCVToApply}
                />
              )}
              ListEmptyComponent={() => (
                <View>
                  <Text>You don't have any CVs yet.</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ListCV

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.6,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Theme.shadow.depth2,
  },
})
