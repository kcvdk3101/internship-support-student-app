import { Ionicons } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import cvApi from '../../api/university/cvApi'
import GeneralButton from '../../components/buttons/GeneralButton'
import { deleteCertification, deleteProject } from '../../features/cvSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Theme from '../../utils/Theme'

type AdditionalInformationScreenProps = {
  navigation: NavigationProp<ParamListBase>
}

const AdditionalInformationScreen: React.FC<AdditionalInformationScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector((state) => state.cv.curCV.details.project)
  const certificates = useAppSelector((state) => state.cv.curCV.details.certificated)
  const curCV = useAppSelector((state) => state.cv.curCV)

  const [checkedProject, setCheckedProject] = useState(false)
  const [checkedCertificate, setCheckedertificate] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (projects.length > 0) {
      setCheckedProject(true)
    }
    if (certificates.length > 0) {
      setCheckedertificate(true)
    }
  }, [projects, certificates])

  function hanldeDeleteProject(name: string) {
    return Alert.alert('Delete Project', 'Are you sure ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(deleteProject(name))
        },
      },
    ])
  }

  function hanldeDeleteCertification(name: string) {
    return Alert.alert('Delete Certification', 'Are you sure ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(deleteCertification(name))
        },
      },
    ])
  }

  const handleFinishCV = async () => {
    let project = projects.map((p) => ({ ...p, technology: [] }))
    setLoading(true)
    try {
      const responseProject = await cvApi.addNewProject(curCV.id as string, project)
      const responseCertificated = await cvApi.addNewCertificated(curCV.id as string, certificates)

      if (responseProject.data && responseCertificated.data) {
        Alert.alert('Create successfully')
        navigation.navigate('MenuTab')
        setLoading(false)
      }
    } catch (error) {
      Alert.alert('Something wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.heading}>Project</Text>
          <View style={styles.contentContainer}>
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={Theme.palette.main.primary}
                iconStyle={{ borderColor: Theme.palette.main.primary, borderWidth: 2 }}
                isChecked={checkedProject}
                onPress={() => setCheckedProject(!checkedProject)}
                disabled={loading}
              />
              <Text>Has project</Text>
            </View>
            {checkedProject === true && (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProjectScreen')}
                  disabled={loading}
                >
                  <View style={styles.buttonContainer}>
                    <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
                    <Text style={styles.buttonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {projects.length > 0 && (
            <View
              style={{
                margin: 8,
              }}
            >
              {projects.map((project, index) => (
                <View key={index} style={styles.listItemContainer}>
                  <View>
                    <Text style={{ marginBottom: 4 }}>{project.projectName}</Text>
                    <Text>{project.description}</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => hanldeDeleteProject(project.projectName)}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.block}>
          <Text style={styles.heading}>Certificate</Text>
          <View style={styles.contentContainer}>
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={Theme.palette.main.primary}
                iconStyle={{ borderColor: Theme.palette.main.primary, borderWidth: 2 }}
                isChecked={checkedCertificate}
                onPress={() => setCheckedertificate(!checkedCertificate)}
                disabled={loading}
              />
              <Text>Has certificate</Text>
            </View>
            {checkedCertificate && (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CertificationScreen')}
                  disabled={loading}
                >
                  <View style={styles.buttonContainer}>
                    <Ionicons name="add" size={24} color={Theme.palette.main.primary} />
                    <Text style={styles.buttonText}>Add</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {certificates.length > 0 && (
            <View
              style={{
                margin: 8,
              }}
            >
              {certificates.map((cert, index) => (
                <View key={index} style={styles.listItemContainer}>
                  <Text>{cert.name}</Text>

                  <View>
                    <Ionicons
                      name="trash"
                      size={24}
                      color="red"
                      onPress={() => hanldeDeleteCertification(cert.name)}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 32, marginBottom: 36 }}>
        <GeneralButton
          label="Finish"
          bgColor={Theme.palette.main.primary}
          txtColor={Theme.palette.white.primary}
          isAlignCenter={true}
          disabled={projects.length === 0 && certificates.length === 0}
          onPress={handleFinishCV}
          isLoading={loading}
        />
      </View>
    </View>
  )
}

export default AdditionalInformationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginVertical: 12,
    paddingBottom: 4,
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
