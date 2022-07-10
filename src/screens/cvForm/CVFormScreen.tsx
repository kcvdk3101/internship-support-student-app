import { yupResolver } from '@hookform/resolvers/yup'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import GeneralButton from '../../components/buttons/GeneralButton'
import VerticalImagePicker from '../../components/common/VerticalImagePicker'
import VerticalInput from '../../components/common/VerticalInput'
import { addCVName } from '../../features/cvSlice'
import { useAppDispatch } from '../../hooks/redux'
import Theme from '../../utils/Theme'

type CVFormScreenProps = {
  navigation: DrawerNavigationProp<ParamListBase>
}

type FieldProps = {
  cvName: string
}

const cvFormSchema = yup.object({
  cvName: yup.string().required('This field is required'),
})

const CVFormScreen: React.FC<CVFormScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FieldProps>({
    mode: 'onSubmit',
    defaultValues: {
      cvName: '',
    },
    resolver: yupResolver(cvFormSchema),
  })
  const dispatch = useAppDispatch()

  const [image, setImage] = useState<string>('')
  const [errorImage, setErrorImage] = useState<string>('')

  useEffect(() => {
    return () => {
      resetField('cvName')
      setImage('')
      setErrorImage('')
    }
  }, [])

  useEffect(() => {
    return () => {
      resetField('cvName')
      setImage('')
      setErrorImage('')
    }
  }, [navigation])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri)
      setErrorImage('')
    }
  }

  const onSubmit = (data: FieldProps) => {
    if (data.cvName === '') return
    if (image === '') {
      setErrorImage('Image is not empty')
      return
    }

    let filename: string = image.split('/').pop() as string

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`
    dispatch(
      addCVName({
        name: data.cvName,
        data: { uri: image, originalname: filename, mimetype: type },
      }),
    )
    navigation.navigate('GeneralInformationScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View>
          <Text style={styles.introductContent}>
            {t(
              'Create a CV quickly and free, exclusively for all students. Make your career more interesting with FITSI from today.',
            )}
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.form}
          >
            <VerticalInput
              label={t('CV name')}
              type="name"
              inputName="cvName"
              placeholder={t('Enter CV name')}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="ascii-capable"
              control={control}
              errors={errors}
              editable={!isSubmitting}
            />
            <VerticalImagePicker image={image} pickImage={pickImage} error={errorImage} />
          </KeyboardAvoidingView>
        </View>
        <View>
          <GeneralButton
            label={t('Start create CV')}
            bgColor={Theme.palette.main.primary}
            txtColor={Theme.palette.white.primary}
            isAlignCenter={true}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={{ height: 20 }} />
          <GeneralButton
            label={t('Cancel')}
            bgColor={Theme.palette.paragraph.primary}
            txtColor={Theme.palette.black.primary}
            isAlignCenter={true}
            isLoading={false}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  )
}

export default CVFormScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  innnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: Theme.palette.white.primary,
    ...Theme.shadow.depth2,
    padding: 20,
    margin: 8,
  },
  introductHeading: {
    ...Theme.fonts.headline.h6,
  },
  introductContent: {
    marginTop: 4,
    ...Theme.fonts.body.body2,
  },
  form: {
    marginTop: 8,
  },
})
