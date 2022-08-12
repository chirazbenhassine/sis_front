import React, { useContext } from "react";
import { View, Text, StyleSheet} from "react-native";
import {Button} from 'react-native-paper';

import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";


const HomeScreen = () => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style= {styles.container}>
            <Spinner visible={isLoading}/>
            <Text> Welcome {userInfo.data.nom} </Text>
            <Button 
                color="red"
                mode="contained"
                uppercase={false}
                onPress={logout}
            >    
            Logout
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default HomeScreen;