import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from "react-native";
import TabBarIcon from '../components/TabBarIcon';
import Profile from '../screens/Profile';
import LinksScreen from '../screens/LinksScreen';
import Excercises from '../screens/Excercises';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
      styles={styles.contentContainer} 
      tabBarOptions= {{
        showLabel: false, // hide labels
        activeTintColor: Colors.orange, // active icon color
        inactiveTintColor: Colors.green,  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }}
      }>
      <BottomTab.Screen
      name="Excercises"
      component={Excercises}
      options={{
        title: 'Excercises',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" color={Colors.green}/>,
      }}
      />    
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon name="md-person" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon name="md-globe" />,
        }}
      />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Excercises':
      return 'My Excercises';
    case 'Links':
      return 'Links to learn more';
    case 'Profile':
      return 'Profile Settings';      
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBarOptions:{
      backgroundColor: '#171F33' // TabBar background
  }
})