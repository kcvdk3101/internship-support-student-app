import { Ionicons } from '@expo/vector-icons'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import qs from 'qs'
import React from 'react'
import { Linking, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GeneralButton from '../../../components/buttons/GeneralButton'
import { screenHeight, screenWidth } from '../../../constant'
import { login } from '../../../features/authenticationSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import Theme from '../../../utils/Theme'

type SendOutlookMailProps = {
  visible: boolean
  handleCloseForm: () => void
}

const SendOutlookMail: React.FC<SendOutlookMailProps> = ({ visible, handleCloseForm }) => {
  const dispatch = useAppDispatch()
  // const user = useAppSelector((state) => state.auth.user)

  async function init() {
    try {
      let email = await AsyncStorageLib.getItem('@email')
      let password = await AsyncStorageLib.getItem('@password')
      if (email && password) {
        await dispatch(login({ email, password }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleCloseForm()
    }
  }

  // async function sendEmail(to: string, subject: string, body: string) {
  //   let url = `mailto:${to}`

  //   // Create email link query
  //   const query = qs.stringify({
  //     subject: subject,
  //     body: body,
  //   })

  //   if (query.length) {
  //     url += `?${query}`
  //   }

  //   // check if we can use this link
  //   const canOpen = await Linking.canOpenURL(url)

  //   if (!canOpen) {
  //     throw new Error('Provided URL can not be handled')
  //   } else {
  //     init()
  //   }

  //   return Linking.openURL(url)
  // }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <SafeAreaView>
          <View
            style={{
              height: screenHeight,
              justifyContent: 'flex-end',
            }}
          >
            <View style={styles.container}>
              <Ionicons name="close" onPress={async () => init()} size={30} style={{ width: 50 }} />
              <Text style={styles.heading}>Đăng ký Giảng viên thành công</Text>
              <Text style={styles.subheading}>
                Thư đăng ký Giảng viên hướng dẫn của bạn đã được gửi đến hộp thư thoại của Giảng
                viên.
              </Text>

              {/* <GeneralButton
                bgColor={Theme.palette.main.primary}
                onPress={async () =>
                  sendEmail(
                    'ngan.ddb@huflit.edu.vn',
                    `Mail xác nhận hướng dẫn của sinh viên ${user.student?.fullName}`,
                    ` Họ tên: ${user.student?.fullName}. Mã số sinh viên: ${user.student?.identityNumber},
                      Nay tôi viết mail này xin thầy/cô chấp nhận hướng dẫn thực tập,

                      Kính trọng,
                      ${user.student?.fullName}
                    `,
                  )
                }
                isLoading={false}
                label="Send by outlook"
                isAlignCenter={true}
                txtColor={Theme.palette.white.primary}
              /> */}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default SendOutlookMail

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Theme.palette.white.primary,
    height: screenHeight * 0.4,
    width: screenWidth,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  heading: {
    ...Theme.fonts.headline.h6,
  },
  subheading: {
    ...Theme.fonts.body.body2,
    marginTop: 8,
    marginBottom: 20,
  },
})
