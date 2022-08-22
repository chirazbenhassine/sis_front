import React, { useState } from "react";
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import NfcProxy from "../components/nfc/NfcProxy";
import { renderPayload } from "../components/nfc/Utils";
NfcManager.start();

const NfcScreen = ({ navigation }) => {
    const [ndef, setNdef] = useState();
    
     readNdef = async() => {
        let usernameNfc

        const tag = await NfcProxy.readTag();
        if (tag) {
          const ndefData =
            Array.isArray(tag?.ndefMessage) && tag?.ndefMessage.length > 0
            ? tag?.ndefMessage[0]
            : null;
                
             if(ndefData) {
              
              setNdef(ndefData)
              usernameNfc = renderPayload(Ndef,ndefData)
              navigation.navigate('Login', {
                usernameNfc
              });
            } 
        }

      }

      return (
        <View style={styles.wrapper}>
      
          <Button 
            styleText ={styles.texteBouton} 
            color="#BDB76B"
            uppercase={false}
            mode="contained"
            onPress={() => {readNdef()}}>
                  Veuillez scanner votre carte
          </Button>
                  
        </View>
      );
};

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    section: {
        padding: 8,
        borderRadius: 8,
        marginBottom: 15,
    },
    sectionLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
    textHandleScan: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
  },
    texteBouton :{
        color: 'black'
    }
  });

export default NfcScreen;