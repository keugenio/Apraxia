import { AsyncStorage } from 'react-native';

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.log('retrieve Data error:', error);
  }
  return null;
};

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("storeData error:", error);
    
    // Error saving data
  }
};