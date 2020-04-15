import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Icon, Card } from 'react-native-elements';
import Colors from '../constants/Colors';

class SignUp extends Component {
  constructor(props){
    super(props)
  }
  state = {
    firstName:'', lastName:'', email:'', password:''
  }

  handleChange = (event = {}) => {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;
    const navigation = useNavigation();
    
    this.setState({[name]: value});
  }
    render(){  
      
      return (
        <View style={{backgroundColor:Colors.white, width:'95%', paddingTop:10, paddingBottom:10}}>
          <Text style={{alignSelf:'center', color:Colors.orange}}>Create New Account</Text>
          <Input
            placeholder='first name'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(firstName)=>this.setState({firstName})}
            value={this.state.firstName}
            label="First"
          />
          <Input
            placeholder='last name'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(lastName)=>this.setState({lastName})}
            value={this.state.lastName}
            label="Last"
          />
          <Input
            placeholder='email'
            keyboardType='email-address'
            textContentType='emailAddress'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(email)=>this.setState({email})}
            value = {this.state.email}
            label="Email"
          />
          <Input
            placeholder='password'
            secureTextEntry={true}
            textContentType='password'
            inputStyle = {{paddingLeft:10}}
            onChangeText = {(password)=>this.setState({password})}
            value = {this.state.password}
            label="Password"
          />
            <Button
              title="Create"
              type="outline"
              style={{alignSelf:'center', marginTop:20}}
            />
          <TouchableHighlight onPress={()=>navigation.navigate('Main')} style={{alignSelf:'flex-end', marginTop:20, marginRight:20}}><Text style={{color:'silver'}}>Cancel</Text></TouchableHighlight>
         
          
        </View>
    )}  
};
export default SignUp;