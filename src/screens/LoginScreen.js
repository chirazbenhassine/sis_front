import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ route, navigation }) => {
    const [username, setUsername] =useState(null);
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
            <View style={styles.wrapper}>
                {/*<TextInput 
                style = {styles.input} 
                value= {username}
                placeholder=" Enter username"
                onChangeText={text => setUsername(text)}/> */}

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
                onPress={() => {login(usernameNfc, password)}}/>

                {errorLogin && <Text  style = {styles.msgErreur}>{errorLogin} </Text>}
               
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
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
        color: 'green'
    },
    baseText :{
        fontWeight: 'bold',
      },
      msgErreur :{
        color: 'red',
    }
});

export default LoginScreen;