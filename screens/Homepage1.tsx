import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Homepage from './Homepage'; // Adjust the import path as needed

const Homepage1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homepage}>
        <Homepage />
      </View>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({

  homepage: {
    flex: 1,
    width: "100%",
    height: "auto"

    
  },
  container: {
    flex: 1,
  },
 
  
});

export default Homepage1;
