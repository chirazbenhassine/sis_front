import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigation from './HomeStackNavigation';
import LogoutStackNavigation from './LogoutStackNavigation';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          console.log(route)
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
          //tabBarButton: () => null,
          tabBarVisible: true
        }}
      />
     {/*  <Tab.Screen
        name={'profil'}
        component={ProfileStackNavigation}
      /> */}
     
      <Tab.Screen
        name={'logout'}
        component={LogoutStackNavigation}
      />
    </Tab.Navigator>
  );
}
