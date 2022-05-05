import { Dimensions } from 'react-native'
import Theme from '../utils/Theme'

export const socialLinks = [
  {
    icon: 'logo-facebook',
    path: 'https://www.facebook.com/',
    color: Theme.palette.black.primary,
  },
  {
    icon: 'logo-youtube',
    path: 'https://www.youtube.com/channel/UC4F4wansipyY1b5FnrA2xOQ',
    color: Theme.palette.black.primary,
  },
  {
    icon: 'logo-github',
    path: 'https://github.com/kcvdk3101',
    color: Theme.palette.black.primary,
  },
]

export const drawers = [
  {
    icon: 'home',
    label: 'Home',
    navigate: 'MenuTab',
  },
  {
    icon: 'business',
    label: 'Company',
    navigate: 'CompanyTab',
  },
  {
    icon: 'document',
    label: 'Your CV',
    navigate: 'CVTab',
  },
  {
    icon: 'archive',
    label: 'Applied Job',
    navigate: 'AppliedJob',
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

export const gender = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const IS_FIRST_TIME = 'IS_FIRST_TIME'
export const FIRST_TIME_OPEN_VALUE = 'FIRST_TIME_OPEN_VALUE'

export const API_CORPORATION_URL = 'https://corporation-app.herokuapp.com'
export const API_CV_URL = 'https://f4ce-2405-4802-90bb-4bd0-6858-48f8-77f-4a6b.ngrok.io'

export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height
