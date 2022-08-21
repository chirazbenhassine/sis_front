import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoutScreen from '../../screens/LogoutScreen';
import {scale} from '../../utils/scaling';

const Stack = createNativeStackNavigator();

export default function LogoutStackNavigation() {

  
    let headerStyle = {
      borderBottomWidth: 0,
      elevation: 0, //remove shadow on Android
      shadowOpacity: 0, //remove shadow on iOS
    };
  
    let headerTitleStyle = {
      fontSize: scale(14),
      textAlign: 'center',
    };
    const MainBlue = '#025976';

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SettingsScreen"
        component={LogoutScreen}
        options={{
          title: '',
          headerShown: true,
          headerLeft: null,
          headerStyle: [headerStyle, { backgroundColor: MainBlue }],
          headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      /> 
    </Stack.Navigator>
  );
}
