import React, { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import { renderPayload } from "../components/nfc/Utils";
NfcManager.start();

const NfcScreen = ({ navigation }) => {
    const [ndef, setNdef] = useState();
    
     readNdef = async() => {
        let usernameNfc
        try {
          // register for the NFC tag with NDEF in it
          await NfcManager.requestTechnology(NfcTech.Ndef);
          // the resolved tag object will contain `ndefMessage` property
          const tag = await NfcManager.getTag();
          // console.warn('Tag found', tag);
          const ndefData =
            Array.isArray(tag?.ndefMessage) && tag?.ndefMessage.length > 0
            ? tag?.ndefMessage[0]
            : null;
                
             if(ndefData)  usernameNfc = renderPayload(Ndef,ndefData)

             navigation.navigate('Login', {
                usernameNfc
              });

            
            console.log("NFC OK", usernameNfc)
        } catch (ex) {
          console.warn('Oops!', ex);
        } finally {
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
        }
      }


      const handleChangesUsername = (username) => {
        console.log("username", username);
        // setUsername(username)
      }
    
      return (
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={readNdef}>
            <Text>Scan a Tag</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>NDEF</Text>
            {ndef && <NdefMessage ndef={ndef} onSelectUsername={handleChangesUsername}/> }
    
        </View>
        </View>
      );
};

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray'
    },
    section: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'black',
        marginBottom: 15,
    },
    sectionLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
  });

export default NfcScreen;