import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import googleAuth from '../screens/googleAuth';
import sugarGraph from '../screens/sugarGraph';

const screens = {
    //the first screen you put here will be the defualt
    //we do want it to be the google auth screen (at least for now...)
    googleAuth: {
        screen: googleAuth
    },
    sugarGraph: {
        screen: sugarGraph
    }
}

const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack);