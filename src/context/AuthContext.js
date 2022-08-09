import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    
/*Function Login*/
    const login = (username, password) => {
        setIsLoading(true);

        const params = { 
            username,
            password
        }

        axios.post(`${BASE_URL}/login`, qs.stringify(params))
        .then(res => {
            let userInfo= res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        })
        .catch(e =>{
            console.log(`login_error ${e}`);
            setIsLoading(false);
        }); 
/*
        fetch('http://192.168.1.57:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify(params)
        }).then(response => response.json())
        .catch(error => console.log('err',error)); //Add this

        */
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

useEffect(() =>{
    isLoggedIn();
}, []);

    return(
        <AuthContext.Provider
         value={{
            isLoading,
            userInfo,
            splashLoading,
            login,
            logout
         }}>
            {children}
            </AuthContext.Provider>
    );
   
};