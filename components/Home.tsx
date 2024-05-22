import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image, useColorScheme, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../App';

type StartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Start'>;
};


function Home({navigation}: StartProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const irMenu = async () => {
    //Aquí se va a ir para el menú lateral
  };

  const irTomarMedicion = async () => {
    navigation.navigate('IngresarDatos');
  };

  const irHistorial = async () => {
    //Aquí se va a ir para ver historial
  };

  const irPersonita = async () => {
    //Aquí se va a ir para ver la personita
  };

  const irMensajes = async () => {
    navigation.navigate('Contactos');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#d7802040"
        translucent={false}
      />
      <View style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
          <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, flex: 1 }}>
            <TouchableOpacity style={styles.buttonUser} onPress={irMenu}>
              <Image
                source={require('../imagenes/image.png')} // Ruta corregida
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.centerContainer}>
              <TouchableOpacity style={styles.buttonCor} onPress={irTomarMedicion}>
                <Image
                  source={require('../imagenes/Heart.png')} // Ruta corregida
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.greetingText}>Tomar medición</Text>
            <Text style={styles.changeUserText}>Ingresar datos manualmente</Text>
            <View style={styles.flexibleSpace}></View>
          </View>
        </ScrollView>
        <View style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}>

            <TouchableOpacity style={styles.button} onPress={irHistorial}>
              <Image
                source={require('../imagenes/reloj.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irPersonita}>
              <Image
                source={require('../imagenes/personita.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irMensajes}>
              <Image
                source={require('../imagenes/mensajes.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    borderWidth: 10,
    borderColor: '#32CE8F',
    margin: 20, // Separación de los bordes
  },
  buttonCor: {
    width: 320,
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 100,
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
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white', // Color de fondo blanco
    borderWidth: 15, // Ancho del borde superior
    borderColor: '#32CE8F', // Color del borde superior
    borderRadius: 20, // Radio de las esquinas
    overflow: 'hidden',

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
    width: '100%',
    height: 80,
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
  flexibleSpace: {
    flex: 1, // Espacio flexible para empujar el signupContainer hacia abajo
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#45504C',
  },
  changeUserText: {
    fontSize: 16,
    color: '#818181',
    marginBottom: 20,
    textAlign: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Home;
