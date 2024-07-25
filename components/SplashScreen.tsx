import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;

const SplashScreen = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('WelcomeScreen');
    });
  }, [navigation, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/Campcare.png')} style={styles.image} />
      <Text style={styles.text}>Health At Your Fingertips</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    resizeMode: 'contain',
  },
  text: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveWidth(5),
    color: '#073BD9',
    fontWeight: 'bold',
  },
});

export default SplashScreen;


