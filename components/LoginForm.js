import React, { useState, useContext } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import Firebase from '../components/Firebase';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import SignUp from './SignUp';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { UserContext } from '../components/common/UserContext';

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(UserContext);
  const navigation = useNavigation();

  Login = () => {
    
    setLoading(true);

    //sign in
    Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
      setEmail(null);
      setPassword(null);
      setLoading(false);
      setUser({... res.results})
      navigation.navigate('Main')
      // that's all for now, just reset this form and
      // let auth().onAuthStateChanged handle setting up the user in App.js
    })
    .catch((err)=>{
      // if no previous accoount create an account with email and password
   ;   setError(err)
    })
  }
  
  return (
    <View style={styles.container}>
        <TouchableHighlight onPress={()=>navigation.navigate("Main")} style={{alignSelf:'flex-end', marginRight:10}}>
          <Text style={{fontSize:20, color:Colors.white}}>X</Text>
        </TouchableHighlight>
        <View style={{height:screenHeight/3}}>
          <Image source={require('../assets/images/login_bg.png')}
            style={{
              width:screenWidth/3,
              height:screenHeight/10,
              padding:100
            }}
          />
        </View>
        <View style={{
          backgroundColor:Colors.white,
          height:screenHeight/4,
          width:'100%',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
          <Input
            placeholder='email'
            leftIcon={
              <Icon
                  type='font-awesome'
                  name='envelope'
                  size={24}
                  color={Colors.orange}
                />
              }
            keyboardType='email-address'
            textContentType='emailAddress'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(email)=>setEmail(email)}
            value = {email}
          />
          <Input
            placeholder='password'
            secureTextEntry={true}
            leftIcon={
              <Icon
                  type='font-awesome'
                  name='key'
                  size={24}
                  color={Colors.orange}
                />
              }
            textContentType='password'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(password)=>setPassword(password)}
            value = {password}
          />
          <Text style={{color:'red', fontWeight:'900', alignSelf:'center'}}>{error}</Text>
          <Button
            icon={<Icon name='account-circle' color='#ffffff' />}
            buttonStyle={{borderRadius: 20, width:screenWidth/4, marginBottom:40}}
            title='Login'
            onPress = {()=>{Login()}} 
            loading={loading}
          />
        </View>
        <View style={{flex:1, justifyContent:'center',alignSelf:'flex-end', paddingRight:5}}>
          <TouchableHighlight onPress={() => navigation.navigate("SignUpModal")} >
            <Text style={{color:Colors.white}}>Sign Up</Text>
          </TouchableHighlight>
        </View>
    </View>)
}

const styles = StyleSheet.create({
  container:{
    width:screenWidth-50,
    height:screenHeight-200,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.orange }
})