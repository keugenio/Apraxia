import React, { useState, useMemo } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { UserContext } from './components/common/UserContext';

import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Firebase, { UsersToExercises, Exercises } from '../Apraxia/components/Firebase';
import { _storeData } from '../Apraxia/components/common/AsyncStorage';
import MyExercises from '../Apraxia/screens/MyExercises';
import Profile from '../Apraxia/screens/Profile';
import LoginForm from '../Apraxia/components/LoginForm';
import SignUp from '../Apraxia/components/SignUp';

import useLinking from './navigation/useLinking';
import Colors from './constants/Colors';

const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [user, setUser] = useState(null);

  const providerValue = useMemo(()=>({user, setUser}), [user, setUser]);

  const exercises = [];
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
        Firebase.auth().onAuthStateChanged((aUser)=>{
          if (aUser){
            try {              
              const keys = [];
              const values = [];
              UsersToExercises.doc(aUser.uid).get()
                .then(doc=>{
                  const exercises = doc.data()
                  Object.keys(exercises).forEach(function (item) {
                    Exercises.doc(item).get()
                      .then((doc2)=>{
                        values.push(doc2.data())
                      })
                  });
              })
              .then(()=>{               
                setUser({ ...aUser, assignments:values })                                  
                //user && user.assignments ? (()=>_storeData('assignments',JSON.stringify({'assignments':user.assignments}))) : null ;
                _storeData('displayName', user.displayName);
                _storeData('email', user.email);
                // _retrieveData('assignments').then((result)=>{
                //   console.log(result.assignments[0].title);                  
                // });
                 
              })              
            }
            catch (error) {
              console.log('login error:' + error);
            }
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
            <RootStack.Navigator mode="modal" initialRouteName="Main" >
              <RootStack.Screen
                name="Main"
                component={MainStackScreen}
                options={{headerShown:false}}
              />
              <RootStack.Screen name="LoginModal" component={LoginScreen} options={{headerShown:false}}/>
              <RootStack.Screen name="SignUpModal" component={SignUpScreen} options={{headerShown:false}}/>
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
      initialRouteName="Exercises"
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
function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm />
    </View>
  );
}
function SignUpScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SignUp />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
});
