import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import { COLORS, SIZES, icons, images } from '../constants';
export default Home = () => {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen options={{
                headerStyle:{backgroundColor:COLORS.lightWhite},
                headerShadowVisible:false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%'/>
                ),
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension='100%'/>
                ),
                headerTitle:''
                }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                    style={{
                        flex:1,
                        paddingHorizontal: SIZES.medium,
                    }}>
                        <Welcome
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleClick={() => {
                                router.push(`search/${searchTerm}`)
                                
                            }}
                        />
                        <Popularjobs 
                        
                        />
                        <Nearbyjobs
                        
                        />
                    </View>

                </ScrollView>
        </SafeAreaView>
    );
}