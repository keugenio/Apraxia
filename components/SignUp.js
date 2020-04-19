import React, { useState } from 'react';
import { ScrollView, View, TouchableHighlight, Text, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import Colors from '../constants/Colors';
import Firebase from '../components/Firebase';

const screenHeight = Dimensions.get('window').height;
export default function SignUp() {
  const [ firstName, setFirstName] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ password2, setPassword2 ] = useState();
  const [error, setError] = useState();
  const navigation = useNavigation();

  function CreateAccount(){
    if (firstName && lastName && email && password && password2 ){
      if (password == password2){
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result)=>{
          result.user.updateProfile({
            displayName: firstName
          })
        })
        .then(()=>{
          navigation.navigate('Main');
        })
        .catch((err)=>{
          // if error on create account, 
          setError(err);
        })
      } else {
        setError('passwords do not match')
      }
    } else {
      setError('please fill all fields')
    }
  }

  return (
    <ScrollView style={{width:'100%'}} contentContainerStyle={{backgroundColor:Colors.yellow, height:screenHeight+200}}>
    
      <Text style={{alignSelf:'center', color:Colors.dark, margin:40, fontSize:20}}>Create New Account</Text>
      <View style={{backgroundColor:Colors.white, paddingTop:20, paddingBottom:20}}>
        <Input
          placeholder='first name'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(firstName)=>{setFirstName(firstName); setError(null)}}
          value={firstName}
          label="First"
        />
        <Input
          placeholder='last name'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(lastName)=>{setLastName(lastName); setError(null)}}
          value={lastName}
          label="Last"
        />
        <Input
          placeholder='email'
          keyboardType='email-address'
          textContentType='emailAddress'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(email)=>{setEmail(email); setError(null)}}
          value = {email}
          label="Email"
        />
        <Input
          placeholder='password'
          secureTextEntry={true}
          textContentType='password'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(password) => {setPassword(password); setError(null)}}
          value = {password}
          label="Password"
        />
        <Input
          secureTextEntry={true}
          textContentType='password2'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(password) => {setPassword2(password); setError(null)}}
          value = {password2}
          label="Confirm passowrd"
        />        
        <Text style={{color:'red', alignSelf:'center'}}>{error}</Text>
        <Button
          title="Create"
          type="outline"
          style={{alignSelf:'center', marginTop:20, borderWidth:1, borderRadius:10, borderColor:'blue'}}
          onPress={()=>CreateAccount()}
        />
      </View>
      <TouchableHighlight 
        onPress={()=>navigation.goBack()}
        style={{alignSelf:'flex-end', marginTop:20, marginRight:20}}>
        <Text style={{color:Colors.dark}}>Cancel</Text>
      </TouchableHighlight>
   
    </ScrollView>
  ) 
};