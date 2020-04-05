import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, View, Alert, TouchableHighlight, Text, Dimensions } from 'react-native';
import { ListItem, FlatList } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import ExerciseCarousel from "../components/Carousel";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    leftAvatar={{ source: { uri: item.avatar_url } }}
    bottomDivider
    chevron
  />
)

export default function MyExercises() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentWords, setCurrentWords] = useState([])
  const exercises = [
      {
        name: 'P',
        words: [
          {
            word:'page'
          },
          {
            word:'peer'
          },
          {
            word:'pit'
          },
          {
            word:'pond'
          },
          {
            word:'put'
          },
        ]
      },
      {
        name: 'C',
        words:[
          {
            word:'cage'
          },
          {
            word:'key'
          },
          {
            word:'kit'
          },
          {
            word:'koi'
          },
          {
            word:'coop'
          },
        ]
      },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          {
            exercises.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                badge={{ value: item.words.length, textStyle: { color: Colors.white}, containerStyle: { marginTop: 0 } }}
                onPress = {()=>{
                  setCurrentWords(item.words);
                  setModalVisible(true);
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
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
      
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          </View> */}
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
    paddingTop: 30
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
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
