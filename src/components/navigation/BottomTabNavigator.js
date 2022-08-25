import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigation from './HomeStackNavigation';
import LogoutStackNavigation from './LogoutStackNavigation';
import { Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  const {logout} = React.useContext(AuthContext);
  const showAlert = () => {
    Alert.alert(
      'Se déconnecter',
      'Etes vous sûr de vouloir vous  déconnecter ?',
      [
        { text: 'NON', onPress: () => console.log('NO Pressed'), style: 'cancel' },
        {
          text: 'OUI', onPress: () => {
            logout();
          }
        },
      ]
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } /* else if (route.name === 'profil') {
            iconName = focused ? 'person' : 'person-outline';
          } */ 
          else if (route.name === 'logout') {
            iconName = focused ? 'log-out' : 'log-out-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#011630',
        },
        headerShown: false
      })}
      tabBarOptions={{
        activeTintColor: '#f7c505',
        inactiveTintColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name={'home'}
        component={HomeStackNavigation}
        options={{
          tabBarVisible: true,
          title: 'Acceuil'
        }}
      />
     {/*  <Tab.Screen
        name={'profil'}
        component={ProfileStackNavigation}
      /> */}
     
      <Tab.Screen
        name={'logout'}
        component={LogoutStackNavigation}
        options={{
          title: 'Se déconnecter',
          tabBarButton: props => <TouchableOpacity {...props} onPress={showAlert} />
        }}
      />
    </Tab.Navigator>
  );
}
