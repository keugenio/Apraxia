import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import MyExercises from '../screens/MyExercises';
import Profile from '../screens/Profile';
import Colors from '../constants/Colors';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'MyExercises';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
      
      tabBarOptions={{
        activeTintColor:Colors.orange,
        inactiveTintColor:Colors.white,
        showLabel:false,
        style:{
          backgroundColor:Colors.dark
        }
      }}>
      <BottomTab.Screen
        name="MyExercises"
        component={MyExercises}
        options={{
          title: 'My Exercises',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book"/>,
        }}
        
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person"/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'MyExercises':
      return 'My Exercises';
    case 'Profile':
      return 'My Profile';
  }
}
