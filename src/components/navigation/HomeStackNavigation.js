import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../../screens/HomeScreen';
import { scale } from '../../utils/scaling';

import ConnectionStatus from '../../utils/components/connexionStatus'
import PointeauxScreen from '../../screens/pointeaux/PointeauxScreen';
import PointeauxDetailScreen from '../../screens/pointeaux/PointeauxDetailScreen';

import RondsScreen from '../../screens/ronds/RondsScreen';
import RondsDetailScreen from '../../screens/ronds/RondsDetailScreen';

import { AuthContext } from '../../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigation() {
  const {userInfo} = useContext(AuthContext);

  let headerStyle = {
    borderBottomWidth: 0,
    elevation: 0, //remove shadow on Android
    shadowOpacity: 0, //remove shadow on iOS
  };

  let headerTitleStyle = {
    fontSize: scale(14),
    textAlign: 'center',
    color: 'white'
  };
  const MainBlue = '#025976';

  return (
    <Stack.Navigator screenOptions={{title: userInfo?.data?.username}}>
        <Stack.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus color={'white'} />,
          }}
        />
        <Stack.Screen
          name="POINTEAUX"
          component={PointeauxScreen}
          options={{
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus color={'white'} />,
          }}
        />

        <Stack.Screen
          name="POINTEAUX_DETAILS"
          component={PointeauxDetailScreen}
          options={{
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus color={'white'} />,
          }}
        />

        <Stack.Screen
          name="RONDS"
          component={RondsScreen}
          options={{
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus color={'white'} />,
          }}
        />
        <Stack.Screen
          name="RONDS_DETAILS"
          component={RondsDetailScreen}
          options={{
            animationTypeForReplace: 'push',
            headerShown: true,
            headerLeft: null,
            headerStyle: [headerStyle, { backgroundColor: MainBlue }],
            headerTitleStyle,
            headerTitleAlign: 'center',
             headerRight: () => <ConnectionStatus color={'white'} />,
          }}
        />

    </Stack.Navigator>
  );
}
