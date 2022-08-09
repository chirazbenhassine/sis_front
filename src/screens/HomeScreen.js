import React, { useContext } from "react";
import { View, Text, Button, StyleSheet} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";


const HomeScreen = () => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style= {styles.container}>
            <Spinner visible={isLoading}/>
            <Text> Welcome {userInfo.data.nom} </Text>
            <Button 
                title="Logout"
                color="red"
                onPress={logout}
            />    
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;