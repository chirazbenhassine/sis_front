import React from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';


const LogoutScreen = () => {


    return (
        <View style= {styles.container}>
            <Text style = {styles.textUsername}>Hello logout</Text>

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

export default LogoutScreen;