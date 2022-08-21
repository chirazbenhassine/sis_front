import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";
import React, { createContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(true)

    const [errorLogin, setErrorLogin] = useState();


    useEffect(() => {
        isLoggedIn();
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected)    
        });
    
        return () => {
            unsubscribe();
        } 
    }, []);
    
/*Function Login*/
    const login = (username, password) => {
        setIsLoading(true);
        const params = { 
            username,
            password
        }

        axios.post(`${BASE_URL}/login`, qs.stringify(params))
        .then(res => {
            setErrorLogin(null);

            let userInfo= res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        })
        .catch(e =>{
            setErrorLogin("Votre username ou votre mot de passe est erroné");
            console.log(`login_error ${e}`);
            setIsLoading(false);
        }); 
    };

    const logout = () => 
    {
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);

    };  
    const isLoggedIn = async() => {
        try{
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if(userInfo){
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        }catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }

    };


    return(
        <AuthContext.Provider
         value={{
            isLoading,
            userInfo,
            splashLoading,
            login,
            logout,
            errorLogin,
            isConnected
         }}>
            {children}
            </AuthContext.Provider>
    );
   
};