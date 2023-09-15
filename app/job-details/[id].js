import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import useFetch from '../../hook/useFetch'


const JobDetails = () => {
    const params = useGlobalSearchParams()
    const router = useRouter()
    const tabs = ["About", "Qualifications", "Responsibilities"]
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    
    const onRefresh = () => {

    }

    const displayTabContent = (activeTab) => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics
                        title="Qualifications"
                        points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
                    />
            case "Responsibilities":
                return <Specifics
                title="Responsibilities"
                points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
            />
            case "About":
                return <JobAbout
                    info={data[0]?.job_description ?? "No data provided"}
                />
            default:
                break;
        }
    }
    
    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id: params.id
    })
  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension={'60%'}
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension={'60%'}
                    />
                ),
                headerTitle: '',
            }}
        />
        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                {isLoading? (
                    <ActivityIndicator size='large' color={COLORS.primary}/>
                ) : error? (
                    <Text>Something went wrong</Text>
                ) : data.length===0 ?(
                    <Text>Job not found</Text>
                ) : (
                    <View style={{padding:SIZES.medium, paddingBottom: 100}}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {displayTabContent(activeTab)}
                    </View>
                )}
            </ScrollView>
            <JobFooter 
                url={data[0]?.job_google_link ?? "careers.google.com/jobs/results"}
            />
        </>
    </SafeAreaView>
  )
}

export default JobDetails