import { Modal, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../../utils/Theme'
import { screenHeight, screenWidth } from '../../../constant'
import { useAppSelector } from '../../../hooks/redux'
import CVCard from '../../../components/cards/CVCard'
import { Utils } from '../../../utils/Utils'

type ListCVProps = {
  handleCloseModal: () => void
}

const ListCV: React.FC<ListCVProps> = ({ handleCloseModal }) => {
  const CVs = useAppSelector((state) => state.cv.CVs)

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Ionicons name="close" onPress={handleCloseModal} size={30} style={{ width: 50 }} />
            <FlatList
              data={CVs}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CVCard
                  key={index}
                  name={item.name}
                  position={`Position: ${item.position}`}
                  createdAt={`Created at : ${Utils.convertDateString(item.createdAt)}`}
                />
              )}
              ListEmptyComponent={() => (
                <View>
                  <Text>You have no notifications.</Text>
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
