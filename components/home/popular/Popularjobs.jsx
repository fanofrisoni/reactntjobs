import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'

import { COLORS, SIZES } from '../../../constants'
import styles from './popularjobs.style'

import useFetch from '../../../hook/useFetch'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'


const Popularjobs = () => {

  const router = useRouter()
  const {data, isLoading, error} = useFetch
  ('search', {
    query: 'React',
    num_pages:1,
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading? (
          <ActivityIndicator size='large' colors={COLORS.primary}></ActivityIndicator>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <PopularJobCard item={item} />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal={true}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs