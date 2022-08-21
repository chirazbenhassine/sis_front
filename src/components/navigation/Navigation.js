
import React, {useContext} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from '../../screens/LoginScreen'
import { AuthContext } from "../../context/AuthContext";
import SplashScreen from "../../screens/SplashScreen";
import NfcScreen from "../../screens/NfcScreen";
import NfcPromptAndroid from "../nfc/NfcPromptAndroid";

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <NfcPromptAndroid />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {splashLoading ? 
                 (
                   <Stack.Screen 
                   name="Splash Screen" 
                   component = {SplashScreen} 
                   /> 
                ) : 
                userInfo?.token?.access_token ? (
                      //<Stack.Screen name="Home" component = {HomeScreen} />
                      <Stack.Screen
                            name="Home"
                            component={BottomTabNavigator}
                        />
                ) : (
                    <>
                    <Stack.Screen 
                            name="TagNFC" 
                            component={NfcScreen} 
                         />
                         <Stack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                         />
                    </>
                )}
               {/*<Stack.Screen name="nfc" component={NfcScreen} /> */}   
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;