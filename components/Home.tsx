// components/Home.tsx

import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Home: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [nombre, setNombre] = useState('');

  const buttonOnPress = async () => {
    await Alert.alert('Hola', `Hola ${nombre}`);
    await Alert.alert('Otro alert', 'Una prueba de otro alert.');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#d7802040"
        translucent={false}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          <TouchableOpacity style={styles.buttonUser} onPress={buttonOnPress}>
            <Image
              source={require('../imagenes/image.png')} // Ruta corregida
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCor} onPress={buttonOnPress}>
            <Image
              source={require('../imagenes/tomarMed.png')} // Ruta corregida
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.bottomBar}>
            <Image
              source={require('../imagenes/barraMenu.png')} // Ruta corregida
              style={styles.backgroundImage}
            />
            <TouchableOpacity style={styles.button}>
              <Image
                source={require('../imagenes/reloj.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require('../imagenes/personita.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require('../imagenes/mensajes.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonUser: {
    backgroundColor: '#32CE8F',
    borderRadius: 1000,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 15,
    borderColor: '#32CE8F',
  },
  buttonCor: {
    width: 400,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'white'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 420,
    height: 80
  },
  button: {
    width: 50,
    height: 50,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Home;
