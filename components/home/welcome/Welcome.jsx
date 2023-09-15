import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SIZES, icons } from '../../../constants'
import styles from './welcome.style'

const jobTypes = ["Full Time", "Part Time", "Contractor"]

const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {

  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState("Full Time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello! Fano</Text>
        <Text style={styles.welcomeMessage}>let's look for a new job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
           >
          </TextInput>
        </View>  
        <TouchableOpacity style={styles.searchBtn} onPress={() => {handleClick}}>
          <Image source={icons.search } resizeMode='contain' style={styles.searchBtnImage}/>
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.tab(activeJobType, item )} onPress={() => {
              setActiveJobType(item)
              router.push(`search/${item}`)
            }}>
              <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap:SIZES.small}}
          horizontal={true}
          >
        </FlatList>
      </View>
    </View>
  )
}

export default Welcome