import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <Text style={styles.contentContainer}>
          "is an acquired oral motor speech disorder affecting an individual's ability to translate conscious speech plans into motor plans, which results in limited and difficult speech ability. By the definition of apraxia, AOS affects volitional (willful or purposeful) movement patterns, however AOS usually also affects automatic speech."
        [1]
        </Text>
        </View>
      </ScrollView>

      
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  contentContainer: {
    padding: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});
