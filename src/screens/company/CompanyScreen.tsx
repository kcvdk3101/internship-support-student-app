import React from 'react'
import {
  Dimensions,
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import ChipButton from '../../components/buttons/ChipButton'
import ButtonChip from '../../components/buttons/ChipButton'
import CompanyCard from '../../components/cards/CompanyCard'
import NewestCard from '../../components/cards/NewestCard'
import { newestCompany } from '../../db/NewestCompanyData'
import { keywordData } from '../../db/KeywordData'
import Theme from '../../utils/Theme'
import TopKeyword from './components/TopKeyword'
import PopularCompanies from './components/PopularCompanies'

type CompanyScreenProps = {}

const width = Dimensions.get('screen').width

const CompanyScreen: React.FC<CompanyScreenProps> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={newestCompany}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <NewestCard card={item} />
          </View>
        )}
        ListHeaderComponent={TopKeyword}
        ListFooterComponent={PopularCompanies}
        ListFooterComponentStyle={{ width: width }}
      />
    </View>
    // <ScrollView style={styles.container}>
    //   <FlatList
    //     data={companyData}
    //     keyExtractor={(item, index) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <View>
    //         <Text>{item.title}</Text>
    //         <FlatList
    //           data={item.innerArray}
    //           renderItem={({ item }) => <Text>{item.name}</Text>}
    //           keyExtractor={(item) => item.id.toString()}
    //         />
    //       </View>
    //     )}
    //   />
    //   <FlatList
    //     data={companyData}
    //     keyExtractor={(item, index) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <View>
    //         <Text>{item.title}</Text>
    //         <FlatList
    //           data={item.innerArray}
    //           renderItem={({ item }) => <Text>{item.name}</Text>}
    //           keyExtractor={(item) => item.id.toString()}
    //         />
    //       </View>
    //     )}
    //   />
    //   <FlatList
    //     data={companyData}
    //     keyExtractor={(item, index) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <View>
    //         <Text>{item.title}</Text>
    //         <FlatList
    //           data={item.innerArray}
    //           renderItem={({ item }) => <Text>{item.name}</Text>}
    //           keyExtractor={(item) => item.id.toString()}
    //         />
    //       </View>
    //     )}
    //   />
    //   <View style={styles.topKeywordGroup}>
    //     <Text style={styles.heading}>top keyword</Text>
    //     <View style={styles.topKeywordList}>
    //       {keywordData.map((kw, index) => (
    //         <ButtonChip
    //           key={index}
    //           name={kw.name}
    //           bgColor={kw.bgColor}
    //           txtColor={kw.txtColor}
    //         />
    //       ))}
    //     </View>
    //   </View>
    //   <View>
    //     <Text style={styles.heading}>newest</Text>
    //     <NewestCard />
    //   </View>
    //   <View>
    //     <Text style={styles.heading}>popular comapanies</Text>
    //     <View style={styles.popularCompaniesGroup}>
    //       <CompanyCard />
    //       <CompanyCard />
    //       <CompanyCard />
    //       <CompanyCard />
    //     </View>
    //   </View>
    // </ScrollView>
  )
}

export default CompanyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    // paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  heading: {
    textTransform: 'capitalize',
    ...Theme.fonts.headline.h6,
    color: Theme.palette.black.primary,
  },
})
