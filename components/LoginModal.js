import React, { useState, useContext }from 'react';
import {Modal, StyleSheet, Dimensions, View, Text } from 'react-native';
import LoginForm from '../components/LoginForm';
import { UserContext } from '../components/common/UserContext';

const screenHeight = Dimensions.get('window').height;

const LoginModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const {user} = useContext(UserContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!user}        
      >
        <View>
          <View style={styles.modalView}>
            <LoginForm />
          </View>
        </View>
      </Modal>  

  );
};

export default LoginModal;
const styles = StyleSheet.create({
  modalView: {
    backgroundColor:"rgba(255,255,255,.85)",
    alignItems: "center",
    justifyContent:'center',
    height:screenHeight-40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
})