import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/app/store'
import * as Font from 'expo-font'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import Home from './src/Home'
import Theme from './src/utils/Theme'

const fetchFonts = () =>
  Font.loadAsync({
    'Roboto-Bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),

    'OpenSans-Bold': require('./src/assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./src/assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./src/assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  })

export default function App() {
  const [loadedAsset, setLoadedAsset] = useState(false)

  if (!loadedAsset) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoadedAsset(true)}
        onError={() => setLoadedAsset(false)}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!
      </Text>
      <Home />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.main.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Theme.fonts.body.body1,
    color: Theme.palette.white.primary,
  },
})
