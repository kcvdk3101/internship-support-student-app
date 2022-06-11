import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { screenHeight, screenWidth } from '../../constant'
import { getCorporationsById } from '../../features/corporationSlice'
import { useAppDispatch } from '../../hooks/redux'
import { CorporationModel } from '../../models/corporation.model'
import Theme from '../../utils/Theme'
import ButtonGroup from './components/ButtonGroup'
import CompanyReview from './components/CompanyReview'
import CompanyJobList from './components/CompanyJobList'
import CompanyInformation from './components/CompanyInformation'

type CompanyDetailScreenProps = {
  navigation: NavigationProp<ParamListBase>
  route: any
}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = ({ route, navigation }) => {
  const { companyId } = route.params
  const dispatch = useAppDispatch()

  const [companyDetail, setCompanyDetail] = useState<CorporationModel[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (typeof companyId === 'string') {
        const response = await dispatch(getCorporationsById(companyId))
        if (response.payload !== undefined) {
          setCompanyDetail(response.payload as CorporationModel[])
        } else {
          setCompanyDetail([])
        }
      }
      return () => {
        setCompanyDetail([])
      }
    })()
  }, [companyId])

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  return (
    <ScrollView>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={{
            uri: 'https://picsum.photos/200',
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={10}
        />
        {companyDetail?.length > 0 && (
          <CompanyInformation companyDetail={companyDetail[0]} navigation={navigation} />
        )}
      </View>
      {companyDetail.length > 0 && (
        <>
          <ButtonGroup index={index} handleChangeIndex={handleChangeIndex} />
          {index === 0 ? (
            <CompanyJobList companyId={companyId} />
          ) : (
            <CompanyReview companyReview={companyDetail[0].review} />
          )}
        </>
      )}
    </ScrollView>
  )
}

export default CompanyDetailScreen

const styles = StyleSheet.create({
  backgroundImageContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  backgroundImage: {
    flex: 1,
    width: screenWidth,
  },
  buttonGoBack: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Theme.palette.white.primary,
    padding: 4,
  },
})
