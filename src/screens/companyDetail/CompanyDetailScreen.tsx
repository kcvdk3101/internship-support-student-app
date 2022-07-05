import { NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { screenHeight, screenWidth } from '../../constant'
import { getCorporationsById } from '../../features/corporationSlice'
import { useAppDispatch } from '../../hooks/redux'
import { CorporationModel } from '../../models/corporation.model'
import Theme from '../../utils/Theme'
import ButtonGroup from './components/ButtonGroup'
import CompanyInformation from './components/CompanyInformation'
import CompanyJobList from './components/CompanyJobList'
import CompanyReview from './components/CompanyReview'

type CompanyDetailScreenProps = {
  navigation: NavigationProp<ParamListBase>
  route: any
}

const CompanyDetailScreen: React.FC<CompanyDetailScreenProps> = ({ route, navigation }) => {
  const { companyId } = route.params
  const dispatch = useAppDispatch()

  const [companyDetail, setCompanyDetail] = useState<CorporationModel[]>([])
  const [index, setIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [openReviewForm, setOpenReviewForm] = useState(false)

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true)
  }

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    const response = await dispatch(getCorporationsById(companyId))
    if (response.payload !== undefined) {
      setCompanyDetail(response.payload as CorporationModel[])
      setRefreshing(false)
    } else {
      setRefreshing(false)
    }
  }, [])

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
        setIndex(0)
      }
    })()
  }, [companyId, refreshing, openReviewForm])

  const handleChangeIndex = (num: number) => {
    setIndex(num)
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ backgroundColor: 'white' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.backgroundImageContainer}>
          {companyDetail?.length > 0 && (
            <CompanyInformation
              companyDetail={companyDetail[0]}
              navigation={navigation}
              setIndex={setIndex}
            />
          )}
        </View>
        {companyDetail.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <ButtonGroup
              index={index}
              titleTab1="Opening"
              titleTab2="Reviews"
              handleChangeIndex={handleChangeIndex}
            />
            {index === 0 ? (
              <CompanyJobList companyId={companyId} navigation={navigation} />
            ) : (
              <CompanyReview
                openReviewForm={openReviewForm}
                companyId={companyId}
                companyReviews={companyDetail[0].review}
                navigation={navigation}
                handleOpenReviewForm={handleOpenReviewForm}
                handleCloseReviewForm={handleCloseReviewForm}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CompanyDetailScreen

const styles = StyleSheet.create({
  backgroundImageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  buttonGoBack: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: Theme.palette.white.primary,
    padding: 4,
  },
})
