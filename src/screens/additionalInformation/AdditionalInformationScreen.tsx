import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Theme from '../../utils/Theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useAppSelector } from '../../hooks/redux'

type AdditionalInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AdditionalInformationScreen: React.FC<AdditionalInformationScreenProps> = ({
  navigation,
}) => {
  const projects = useAppSelector((state) => state.cv.cv.projects)
  const certificates = useAppSelector((state) => state.cv.cv.certificates)

  const [checkedProject, setCheckedProject] = useState(false)
  const [checkedCertificate, setCheckedertificate] = useState(false)

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.heading}>Project</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 8,
              marginVertical: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BouncyCheckbox
                size={25}
                fillColor={Theme.palette.main.primary}
                iconStyle={{ borderColor: Theme.palette.main.primary, borderWidth: 2 }}
                isChecked={checkedProject}
                onPress={() => setCheckedProject(!checkedProject)}
              />
              <Text>Has project</Text>
            </View>
            {checkedProject && (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('ProjectScreen')}>
                  <View style={styles.buttonContainer}>
                    <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
                    <Text style={styles.buttonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {checkedProject && projects.length > 0 && (
            <View>
              <Text>List project</Text>
            </View>
          )}
        </View>
        <View style={styles.block}>
          <Text style={styles.heading}>Certificate</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 8,
              marginVertical: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BouncyCheckbox
                size={25}
                fillColor={Theme.palette.main.primary}
                iconStyle={{ borderColor: Theme.palette.main.primary, borderWidth: 2 }}
                isChecked={checkedCertificate}
                onPress={() => setCheckedertificate(!checkedCertificate)}
              />
              <Text>Has certificate</Text>
            </View>
            {checkedCertificate && (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('CertificationScreen')}>
                  <View style={styles.buttonContainer}>
                    <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
                    <Text style={styles.buttonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {checkedProject && certificates.length > 0 && (
            <View>
              <Text>List certificate</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default AdditionalInformationScreen

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 16,
    padding: 8,
  },
  heading: {
    ...Theme.fonts.headline.h6,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    ...Theme.fonts.body.body1,
    color: Theme.palette.main.primary,
  },
})
