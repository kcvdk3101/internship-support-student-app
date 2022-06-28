import AppLoading from 'expo-app-loading'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import AppNavigator from './src/navigation/AppNavigator'
import LoadAssets from './src/utils/FetchAssets'
import Theme from './src/utils/Theme'

export default function App() {
  const [loadedAsset, setLoadedAsset] = useState(false)

  if (!loadedAsset) {
    return (
      <AppLoading
        startAsync={async () => LoadAssets()}
        onFinish={() => setLoadedAsset(true)}
        onError={() => setLoadedAsset(false)}
      />
    )
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Theme.palette.main.primary} />
      <AppNavigator />
    </Provider>
  )
}
