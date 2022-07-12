import { Dimensions } from 'react-native'

export const drawers = [
  {
    icon: 'home',
    label: 'Home',
    navigate: 'HomeTab',
  },
  {
    icon: 'business',
    label: 'Company',
    navigate: 'CompanyTab',
  },
  {
    icon: 'document',
    label: 'CV',
    navigate: 'CVTab',
  },
]

export const languages = [
  {
    label: 'Vietnamese',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'eng',
  },
]

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const IS_FIRST_TIME = 'IS_FIRST_TIME'
export const FIRST_TIME_OPEN_VALUE = 'FIRST_TIME_OPEN_VALUE'

export const ADMIN = '91066FB2-C09D-4098-9C7F-9046289F454A'

export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height
