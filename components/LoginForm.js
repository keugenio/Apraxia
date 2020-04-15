import React, { useState, useContext } from 'react';
import { Dimensions, View, Image, Text, TouchableHighlight, StyleSheet, Modal } from 'react-native';
import firebase from "firebase";
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
// import SignUp from './SignUp';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { UserContext } from '../components/common/UserContext';

export default function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [viewSignUpForm, setViewSignUpForm] = useState(false)
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  
  Login = () => {
    const navigation = useNavigation();
    setLoading(true);

    //sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
      setEmail(null);
      setPassword(null);
      setLoading(false);
      setUser({... res.results})
      navigation.navigate('Exercises')
      // that's all for now, just reset this form and
      // let firebase.auth().onAuthStateChanged handle setting up the user in App.js
    })
    .catch(()=>{
      // if no previous accoount create an account with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((err)=>{
        // if error on create account, 
        setError('Authentication failed');
        console.log(err);
        setEmail(null);
        setPassword(null);
        setLoading(false);
      })
    })
  }
  
  return (
    <View style={styles.container}>
        <View style={{height:screenHeight/3}}>
          <TouchableHighlight 
            style={{alignSelf:'flex-end'}}
            onPress={()=>{}}>
            <Text style={{color:Colors.white}}>close</Text></TouchableHighlight>
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
            onChangeText = {(email)=>this.setState({email})}
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
            onChangeText = {(password)=>this.setState({password})}
            value = {password}
          />
          <Text style={{color:'red', fontWeight:'900', alignSelf:'center'}}>{error}</Text>
          <Button
            icon={<Icon name='account-circle' color='#ffffff' />}
            buttonStyle={{borderRadius: 20, width:screenWidth/4}}
            title='Login'
            onPress = {()=>{this.Login()}} 
            loading={loading}
          />
        </View>
        <View style={{flex:1, justifyContent:'center',alignSelf:'flex-end', paddingRight:5}}>
          <TouchableHighlight onPress={() => { this.setState({viewSignUpForm:true })}} >
            <Text style={{color:Colors.white}}>Sign Up</Text>
          </TouchableHighlight>
        </View>
    </View>)
}

const styles = StyleSheet.create({
  container:{
    width:screenWidth-50,
    height:screenHeight-230,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.orange }
})