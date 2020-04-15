import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SectionList, ImageBackground} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {auth} from '../components/Firebase';

import Colors from '../constants/Colors';
import { UserContext } from '../components/common/UserContext';

export default function Profile() {
  const {user, setUser} = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/images/profile_bg.jpg')} style={styles.image}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{backgroundColor:Colors.background}}>
      
        {user && <SectionList
          sections={[
            {title: 'Profile', data: ['email:' + user.email, (user.displayName && 'display Name:' + user.displayName)]},
            {title: 'Your Therapist', data: ['Jackson', 'James']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        /> }     
      </View>
      
      <OptionButton
        icon="md-chatboxes"
        label="Your Therapist"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      {user && <OptionButton
        icon="md-information-circle"
        label={user.email}
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />}

      {user && <OptionButton
        icon="md-exit"
        label="Logout"
        onPress={() => auth.signOut().then(()=>{
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
    </ScrollView>
    </ImageBackground>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton underlayColor={Colors.orange} style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
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
    backgroundColor: '#fdfdfd',
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
    backgroundColor: 'rgba(247,247,247,1.0)',
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
});
