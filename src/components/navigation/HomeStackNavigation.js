import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../../screens/HomeScreen';
import { scale } from '../../utils/scaling';

import ConnectionStatus from '../../utils/components/connexionStatus'

const Stack = createNativeStackNavigator();

export default function HomeStackNavigation() {


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
    <Stack.Navigator >
        <Stack.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            title: 'Home',
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus />,
          }}
        />

    </Stack.Navigator>
  );
}
