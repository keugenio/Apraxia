import React, {useRef, useState, useEffect} from 'react';
import { Card } from 'react-native-elements';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ExerciseCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const ENTRIES = props.words;

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <Card containerStyle={styles.cardStyle}>
          <Text style={styles.textStyle} numberOfLines={2}>
            {item.word}
          </Text>        
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={screenWidth - 100}
        itemHeight={screenHeight - 150}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={false}
      />
    </View>
  );
};

export default ExerciseCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 100,
    height: screenHeight - 150,
    justifyContent:'center',
    shadowColor:Colors.dark,
    shadowOpacity:.25,
    shadowRadius:3,
    shadowOffset:{width:1, height:10}
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  cardStyle: {
    height:screenHeight/2, 
    justifyContent:'center',
    backgroundColor:Colors.white  
  },
  textStyle:{
    textAlign:"center",
    fontSize:40,
    color:Colors.orange
  }
});