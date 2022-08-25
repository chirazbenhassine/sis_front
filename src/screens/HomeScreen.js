import React, { useContext } from "react";
import { View, Text,TouchableOpacity,  StyleSheet} from "react-native";
import {scale} from '../utils/scaling';


import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";


const HomeScreen = ({navigation}) => {
    const {isLoading} = useContext(AuthContext);


    return (
        <View style= {styles.container}>
            <Spinner visible={isLoading}/>
            
            <TouchableOpacity
                style={[styles.button,styles.buttonPointeaux]}
                onPress={() => navigation.navigate('POINTEAUX')}
            >
                <Text style={styles.buttonText}>Liste des Pointeaux</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button,styles.buttonRondes]}
                onPress={() => navigation.navigate('RONDS')}
            >
                <Text style={styles.buttonText}>Liste des rondes</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        width: "100%",
        height: "20%",
        marginTop: "4%"
      },
      buttonText: {
        textAlign: 'center',
        fontSize: scale(16),
        fontWeight: 'bold',
        width: "100%",
      },
      buttonRondes: {
        backgroundColor: "goldenrod",
      },
      buttonPointeaux: {
        backgroundColor: "mediumseagreen",
      }
});

export default HomeScreen;