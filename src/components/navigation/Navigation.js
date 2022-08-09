
import React, {useContext} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from '../../screens/LoginScreen'
import HomeScreen from '../../screens/HomeScreen'
import { AuthContext } from "../../context/AuthContext";
import SplashScreen from "../../screens/SplashScreen";
import NfcScreen from "../../screens/NfcScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext);

    /*console.log("userInfo", userInfo?.toke?.access_token)*/

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ? 
                 (
                   <Stack.Screen 
                   name="Splash Screen" 
                   component = {SplashScreen} 
                   options = {{ headerShown: false }}
                   /> 
                ) : 
                userInfo?.token?.access_token ? (
                      <Stack.Screen name="Home" component = {HomeScreen} />
                ) : (
                    <>
                    <Stack.Screen 
                            name="TagNFC" 
                            component={NfcScreen} 
                            options = {{headerShown :false }}
                         />
                         <Stack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                            options = {{headerShown :false }}
                         />
                    </>
                )}
               {/*<Stack.Screen name="nfc" component={NfcScreen} /> */}   
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;