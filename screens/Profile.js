import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SectionList, ImageBackground, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Firebase from '../components/Firebase';

import Colors from '../constants/Colors';
import { UserContext } from '../components/common/UserContext';
const screenWidth = Dimensions.get('window').width;

export default function Profile() {
  const {user, setUser} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/images/profile_bg.jpg')} style={styles.image}>
      <View style={{flex:6, marginTop:30}}>
        <View style={{backgroundColor:Colors.background, flex:6}}>
        
          {user && <SectionList
            sections={[
              {title: 'Profile', data: [(user.displayName && 'Name:' + user.displayName), 'email:' + user.email]},
              {title: 'Your Therapist', data: ['Terry Pist', 'terrypist@example.com']},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          /> }     
        </View>
        <View style={styles.loginButtonsStyle}>
          {user && <OptionButton
            icon="md-exit"
            label="Logout"
            onPress={() => Firebase.auth().signOut().then(()=>{
              setUser(null)
            })}
            isLastOption
          />}
              
          {!user && <OptionButton
            icon="md-person"
            label="Login"
            onPress={() => navigation.navigate("LoginModal")}
            isLastOption
          />}
        </View>
      </View>
    </ImageBackground>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton underlayColor={Colors.orange} style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={24} color="rgba(0,0,0,0.5)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
    backgroundColor:Colors.dark
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: Colors.white,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  loginButtonsStyle:{
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
    alignItems:'flex-end',
    backgroundColor: Colors.white,
    paddingVertical: 6,
    width:screenWidth
  }
});
