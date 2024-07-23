import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Campcare.png')} style={styles.image} />
      <Text style={styles.text}>Health At Your Fingertips</Text>
    </View>
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
    color: '#318CE7',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
