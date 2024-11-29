import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Image, useColorScheme, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../App';
import FastImage from 'react-native-fast-image';


type StartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Start'>;
};


function Home({navigation}: StartProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const irMenu = async () => {
    navigation.navigate('Yo');
  };

  const irTomarMedicion = async () => {
    navigation.navigate('IngresarDatos');
  };

  const irAlarmas = async () => {
    //Aquí se va a ir para ver historial
    navigation.navigate('Alarmas');
  };

  const irPersonita = async () => {
    //Aquí se va a ir para ver la personita
    navigation.navigate('EstadoDeSalud');
  };

  const irMensajes = async () => {
    navigation.navigate('Contactos');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safeArea}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollContainer}>
          <View>
            <TouchableOpacity style={styles.buttonUser} onPress={irMenu}>
              <Image
                source={require('../imagenes/usuariodef.png')} // Ruta corregida
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.centerContainer}>
              <TouchableOpacity style={styles.buttonCor} onPress={irTomarMedicion}>
              <FastImage
                source={require('../imagenes/corr.gif')}
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

            <TouchableOpacity style={styles.button} onPress={irAlarmas}>
              <Image
                source={require('../imagenes/c.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irPersonita}>
              <Image
                source={require('../imagenes/p.png')} // Ruta corregida
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irMensajes}>
              <Image
                source={require('../imagenes/m.png')} // Ruta corregida
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco del ScrollView
  },
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