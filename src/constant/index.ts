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
    navigate: 'HomeStack',
  },
  {
    icon: 'archive',
    label: 'Applied Job',
    navigate: 'HomeStack',
  },
  {
    icon: 'call',
    label: 'Contact',
    navigate: 'HomeStack',
  },
]

export const IS_FIRST_TIME = 'IS_FIRST_TIME'
export const FIRST_TIME_OPEN_VALUE = 'FIRST_TIME_OPEN_VALUE'
export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height
