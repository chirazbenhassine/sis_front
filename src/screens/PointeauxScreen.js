import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPointeaux } from '../redux/reducers/pointeaux.reducer'
import { scale } from '../utils/scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';


const PointeauxScreen = () => {

  const [pointeaux, setPointeaux] = useState([]);
  const [loading, setLoading] = useState(true);

  const listPointeaux = useSelector(state => state.pointeau);
  const dispatch = useDispatch();
  console.log(listPointeaux)

  const initFetch = useCallback(() => {
    dispatch(getPointeaux());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const onPress = () => console.log("yeww")

  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.buttonText}>Gestion des pointeaux</Text>
        {listPointeaux && listPointeaux.map((data) =>
          <TouchableOpacity style={{}} onPress={() => console.log('heeyyy: ', data.name)}>
            <Card style={styles.list} key={data.id} >
              <View style={styles.aaa}>
                <Text style={styles.textList}>{data.name}</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={40}
                  color={'#f7c505'}
                />
              </View>
            </Card>
          </TouchableOpacity>
        )}

      </ScrollView>

      <View style={styles.parentView}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={styles.validationButton}>
          <Ionicons
            name="add-outline"
            size={40}
            color={'#f7c505'}
          />
        </TouchableOpacity>
      </View>
    </View>


  );
};
const styles = StyleSheet.create({
  mainView: { flexDirection: 'row', flex: 2 },
  parentView: {
    alignSelf: 'flex-end',
    flex: 1,
    elevation: 3,
    alignItems: 'flex-end',
    width: '100%'
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
    width: 100,
    height: 100,
    backgroundColor: '#025976',
    borderRadius: 50,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonText: {
    //textAlign: 'center',
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

  aaa: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',

  }


});

export default PointeauxScreen;