import * as Font from 'expo-font'

async function LoadAssets() {
  const fetchFonts = Font.loadAsync({
    'OpenSans-Bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  })

  await fetchFonts
}

export default LoadAssets
