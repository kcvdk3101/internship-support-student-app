import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenWidth } from '../../../constant'
import Theme from '../../../utils/Theme'
import { Ionicons } from '@expo/vector-icons'

type CompanyInformationProps = {}

const CompanyInformation: React.FC<CompanyInformationProps> = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 4,
        }}
      >
        <Ionicons
          name="globe-sharp"
          size={20}
          color={Theme.palette.black.primary}
          style={{
            flexShrink: 0,
            marginRight: 4,
          }}
        />
        <Text
          style={{ color: 'blue' }}
          onPress={() => Linking.openURL('http://google.com')}
        >
          http://google.com
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 4,
        }}
      >
        <Ionicons
          name="location"
          size={20}
          color={Theme.palette.black.primary}
          style={{
            flexShrink: 0,
            marginRight: 4,
          }}
        />
        <Text>288 Su Van Hanh, District 10</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
          }}
        >
          <Ionicons
            name="people"
            size={20}
            color={Theme.palette.black.primary}
            style={{
              flexShrink: 0,
              marginRight: 4,
            }}
          />
          <Text>500-100</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
          }}
        >
          <Ionicons
            name="briefcase"
            size={20}
            color={Theme.palette.black.primary}
            style={{
              flexShrink: 0,
              marginRight: 4,
            }}
          />
          <Text>10 Jobs</Text>
        </View>
        <View></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 4,
        }}
      >
        <Ionicons
          name="flag"
          size={20}
          color={Theme.palette.black.primary}
          style={{
            flexShrink: 0,
            marginRight: 4,
          }}
        />
        <Text>Vietnam</Text>
      </View>
    </View>
  )
}

export default CompanyInformation

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -(screenWidth * 0.3),
    width: screenWidth * 0.8,
    backgroundColor: Theme.palette.white.primary,
    borderRadius: 15,
    padding: 20,
  },
})
