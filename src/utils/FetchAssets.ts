import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

async function LoadAssets() {
  const iconAssets = Asset.loadAsync([
    require('../assets/images/icon-bolt.png'),
    require('../assets/images/icon-company.png'),
    require('../assets/images/icon-cv.png'),
    require('../assets/images/icon-delete.png'),
    require('../assets/images/icon-edit.png'),
    require('../assets/images/icon-home.png'),
    require('../assets/images/icon-label.png'),
    require('../assets/images/icon-logout.png'),
    require('../assets/images/icon-person.png'),
    require('../assets/images/icon-place.png'),
    require('../assets/images/icon-supervisor.png'),
    require('../assets/images/icon-upload.png'),
  ])
  const fetchFonts = Font.loadAsync({
    'OpenSans-Bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  })

  await fetchFonts
  await iconAssets
}

export default LoadAssets
