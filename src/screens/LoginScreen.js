import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
    const [username, setUsername] =useState(null);
    const [password, setPassword] =useState(null);

    const {isLoading, login} = useContext(AuthContext);

    return (
        <View style= {styles.container}>
            <Spinner visible={isLoading}/>
            <View style={styles.wrapper}>
                <TextInput 
                style = {styles.input} 
                value= {username}
                placeholder=" Enter username"
                onChangeText={text => setUsername(text)}/> 

                <TextInput 
                style = {styles.input}
                value = {password}
                placeholder=" Enter password"
                onChangeText={text => setPassword(text)}
                secureTextEntry/>  

                <Button 
                styleText ={styles.baseText} 
                title="Login"
                color="#BDB76B"
                onPress={() => {login(username, password)}}/>
               
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper :{
        width: '80%',

    },
    input : {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    baseText :{
        fontWeight: 'bold',
      }
});

export default LoginScreen;