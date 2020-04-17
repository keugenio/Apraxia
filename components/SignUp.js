import React, { useState } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import Colors from '../constants/Colors';
import Firebase from '../components/Firebase';

export default function SignUp() {
  const [ firstName, setFirstName] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [error, setError] = useState();
  const navigation = useNavigation();

  function CreateAccount(){
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
  }

  return (
    <View style={{backgroundColor:Colors.yellow, width:'95%', paddingLeft:10, paddingRight:10, borderRadius:25, borderColor:Colors.orange, borderWidth:3}}>
      <Text style={{alignSelf:'center', color:Colors.dark, margin:40, fontSize:20}}>Create New Account</Text>
      <View style={{backgroundColor:Colors.white, paddingTop:20, paddingBottom:20}}>
        <Input
          placeholder='first name'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(firstName)=>setFirstName(firstName)}
          value={firstName}
          label="First"
        />
        <Input
          placeholder='last name'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(lastName)=>setLastName(lastName)}
          value={lastName}
          label="Last"
        />
        <Input
          placeholder='email'
          keyboardType='email-address'
          textContentType='emailAddress'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(email)=>setEmail(email)}
          value = {email}
          label="Email"
        />
        <Input
          placeholder='password'
          secureTextEntry={true}
          textContentType='password'
          inputStyle = {{paddingLeft:10}}
          onChangeText = {(password) => setPassword(password)}
          value = {password}
          label="Password"
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
    </View>
  ) 
};