
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';


export default function App() {
 
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <View style={styles.container}>

        <Text style={styles.welcome}>Hello, World!</Text>

      </View>
    </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  welcome: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 32,
    
  },
});
