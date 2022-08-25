import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPointeaux, postPointeaux } from '../../redux/reducers/pointeaux.reducer'
import { scale } from '../../utils/scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import NfcProxy from "../../components/nfc/NfcProxy";
import { renderPayload } from "../../components/nfc/Utils";
import { Ndef } from "react-native-nfc-manager";


const PointeauxScreen = ({ navigation }) => {
  
  const listPointeaux = useSelector(state => state.pointeau);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(getPointeaux());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  readNdef = async () => {
    let identifiantNFC

    const tag = await NfcProxy.readTag();
    if (tag) {
      const ndefData =
        Array.isArray(tag?.ndefMessage) && tag?.ndefMessage.length > 0
          ? tag?.ndefMessage[0]
          : null;

      if (ndefData) {
        identifiantNFC = renderPayload(Ndef, ndefData)
        console.log(identifiantNFC)

        dispatch(postPointeaux({ name: identifiantNFC }))
          .unwrap()
          .then(data => {
            console.log('Post pointeau success');
          })
          .catch(e => {
            console.log(e);
          });
      }
    }

  }

  return (
    <View style={styles.mainView}>
      <View>
        <Text style={styles.titre}>Liste des pointeaux</Text>
        <ScrollView style={styles.scrollView}>
          {listPointeaux && listPointeaux.map((data) =>
            <TouchableOpacity key={data.id} onPress={() => navigation.navigate('POINTEAUX_DETAILS', {
              data
            })}>
              <Card style={styles.list}  >
                <View style={styles.deuxColonnes}>
                  <Text style={styles.textList}>{data.name}</Text>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={40}
                    color={'#025976'}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          )}

        </ScrollView>
      </View>

      <View style={styles.addCircle}>
        <TouchableOpacity
          onPress={() => { readNdef() }}
          style={styles.validationButton}>
          <Ionicons
            name="add-outline"
            size={40}
            color={'#FFF'}
          />
        </TouchableOpacity>
      </View>

    </View>


  );
};
const styles = StyleSheet.create({
  mainView: { flex: 1 },
  addCircle: {
    alignSelf: 'flex-end',
    flex: 1,
    elevation: 3,
    alignItems: 'flex-end',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  scrollView: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
    width: "100%",
  },
  validationButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#025976',
    borderRadius: 50,
  },
  titre: {
    marginVertical: '2%',
    fontSize: scale(22),
    fontWeight: 'bold',
    width: "100%",
    color: "black",
    textAlign: 'center'
  },
  list: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 5,

  },
  textList: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'black'
  },

  deuxColonnes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',

  }


});

export default PointeauxScreen;