import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {Button} from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ route, navigation }) => {
    const [password, setPassword] =useState(null);

    const {
        isLoading,
        login,
        errorLogin
    } = useContext(AuthContext);

    const { usernameNfc } = route.params;

    return (
        <View style= {styles.container}>
            <Spinner visible={isLoading}/>
            <Text style = {styles.textUsername}>{usernameNfc}</Text>
            <View style={styles.wrapper}>
                {/*<TextInput 
                style = {styles.input} 
                value= {username}
                placeholder=" Enter username"
                onChangeText={text => setUsername(text)}/> */}

                <TextInput 
                style = {styles.input}
                value = {password}
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                placeholderTextColor="#8E8E8E" 
                secureTextEntry/>  

   

                <Button 
                    styleText ={styles.texteBouton} 
                    
                    mode="contained"
                    color="#BDB76B"
                    uppercase={false}
                    onPress={() => {login(usernameNfc, password)}}>
                    Login
                </Button>

                {errorLogin && <Text  style = {styles.msgErreur}>{errorLogin} </Text>}
               
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper :{
        width: '80%'
    },
    input : {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        color: 'black',

    },
    texteBouton :{
        fontWeight: 'bold',
        color: 'black'
    },
    textUsername :{
        fontWeight: 'bold',
        color: 'black'
    },
    msgErreur :{
        color: 'red',
}
});

export default LoginScreen;