import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../context/AuthContext";


function ConnectionStatus() {
    const { isConnected } = useContext(AuthContext);
  return (
    <View style={styles.iconContainer}>
        <Ionicons name="wifi" size={35} color={isConnected ? 'lightgreen' : 'red'} />
    </View>
  );
}

const styles = StyleSheet.create({
    iconContainer: {
      right: 10,
    }
  });

export default ConnectionStatus;
