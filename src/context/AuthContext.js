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
        const user = {
            "token": {
                "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJc2FhY2FiZCIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjU3OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjYyNzE0MjcyfQ.pdlscb0vsuKNAbmxrnm89zMlGVH0BOu25vVyuHMScrA",
                "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJc2FhY2FiZCIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEuNTc6ODA4MC9hcGkvbG9naW4iLCJleHAiOjE2NjI3MTQyNzJ9.jHhwy0MvyFZz6J19NfNXAP4KMTzR1bfI9dBJrCng5vQ"
            },
            "data": {
                "nom": "Abdelli",
                "prenom": "Isaac",
                "username": "Isaacabd",
                "roles": [
                    "ROLE_USER"
                ]
            }
        }
        AsyncStorage.setItem('userInfo',JSON.stringify(user));

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
            console.log(userInfo.token.access_token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userInfo.token.access_token;
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