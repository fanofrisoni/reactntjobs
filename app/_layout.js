import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as Splashscreen from 'expo-splash-screen';
import { useCallback } from 'react';

Splashscreen.preventAutoHideAsync();

export default Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    }) 

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await Splashscreen.hideAsync();
        }
    }, [fontsLoaded])

    if(!fontsLoaded){
        return null
    }

    return <Stack onLayout={onLayoutRootView}/>
}