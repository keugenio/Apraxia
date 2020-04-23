import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useContext } from 'react';
import { Modal, StyleSheet, View, Alert, TouchableHighlight, Text, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import ExerciseCarousel from "../components/Carousel";
import { UserContext } from '../components/common/UserContext';
import { _retrieveData } from '../components/common/AsyncStorage';

const screenWidth = Dimensions.get('window').width;

keyExtractor = (item, index) => index.toString()

export default function MyExercises() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseType, setExerciseType] = useState();

  useEffect(()=>{
    _retrieveData('assignments').then((result)=>{
      setExercises((result.assignments))                      
    });

  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{backgroundColor:Colors.backgroundColor}}>         
          { exercises.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                bottomDivider
                chevron
                badge={{ value: item.words.length, textStyle: { color: Colors.white}, containerStyle: { marginTop: 0 } }}
                onPress = {()=>{
                  setCurrentWords(item.words);
                  setModalVisible(true);
                  setExerciseType(item.type);
                }}
              />
            ))
              } 
        </View>    
      </ScrollView>      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>{exerciseType}</Text>
            <ExerciseCarousel words={currentWords} />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>  
  );
}


MyExercises.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainer: {
    paddingTop: 30,
    backgroundColor:Colors.dark
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {

  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.orange,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:screenWidth/2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
