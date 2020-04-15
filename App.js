import React, { useState, useMemo } from 'react';
import { Platform, StatusBar, StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import { UserContext } from './components/common/UserContext';

import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import firebase from 'firebase';
import firebaseKey from './components/keys/firebaseKey';

import MyExercises from '../Apraxia/screens/MyExercises';
import Profile from '../Apraxia/screens/Profile';
import LoginForm from '../Apraxia/components/LoginForm';

import useLinking from './navigation/useLinking';
import Colors from './constants/Colors';

const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const firebaseConfig = {
  apiKey: firebaseKey.apiKey,
  authDomain: firebaseKey.authDomain,
  databaseURL: firebaseKey.databaseURL,
  projectId: firebaseKey.projectId,
  storageBucket: firebaseKey.storageBucket,
  messagingSenderId: firebaseKey.messagingSenderId,
  appId: firebaseKey.appId,
  measurementId: firebaseKey.measurementId
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [user, setUser] = useState(null);

  const providerValue = useMemo(()=>({user, setUser}), [user, setUser]);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        // Load firebase
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user)=>{
          if (user){
            setUser({...user})
         }
        })           
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <UserContext.Provider value={providerValue}>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState} >
            <RootStack.Navigator mode="modal" initialRouteName="LoginModal" >
              <RootStack.Screen
                name="Main"
                component={MainStackScreen}
                options={{headerShown:false}}
              />
              <RootStack.Screen name="LoginModal" component={ModalScreen} options={{headerShown:false}}/>
            </RootStack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </View>
    );
  }
}

function MainStackScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor={Colors.orange}
      inactiveColor={Colors.gray}
      barStyle={{ backgroundColor: Colors.dark, justifyContent:"flex-end" }}
      labeled={false}
    >
        <Tab.Screen 
          name="Exercises"
          component={MyExercises}
          options={{
            tabBarLabel: 'Exercises',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="library" color={color} size={26} />
            ),
          }}/> 
        <Tab.Screen 
          name="Lessons"
          component={MyExercises}
          options={{
            tabBarLabel: 'Lessons',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pencil" color={color} size={26} />
            ),
          }}/>               
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={26} />
            ),
          }}
          />           
      
    </Tab.Navigator>
  );
}

function ModalScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm />
      <Button onPress={() => navigation.navigate('Main')} title="Dismiss" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,

  },
});
