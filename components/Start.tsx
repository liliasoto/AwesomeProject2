// components/Start.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image, TextInput, Button, Text } from 'react-native';
import { RootStackParamList } from '../App';
import { useUser } from '../components/UserContext';
import { API_URL } from '../config';

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Start({navigation}: StartProps): React.JSX.Element {
    const [contraseña, setContraseña] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const { setUserId } = useUser();

    const btnIngresarOnPress = async () => {
      try {
        const response = await fetch(`${API_URL}/login`,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  nombre_usuario: nombreUsuario,
                  contraseña: contraseña,
              }),
          });
  
          const data = await response.json();
          console.log('Response data:', data); // Add this line
  
          // En Start.tsx, en la función btnIngresarOnPress
          if (response.ok) {
            // Extraemos el ID del objeto
            const userId = data.usuario._id; // Cambiado de .id a ._id
            console.log('User ID set to:', userId);

            // Guardar el id en el contexto
            setUserId(userId);
            setContraseña('');
            setNombreUsuario('');
            navigation.navigate('Home');
          } else {
              Alert.alert('Error', data.message);
          }
      } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
      }
  };
  

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.flexibleSpace}></View>
            <View style={styles.headerContainer}>
              <Image
                source={require('../imagenes/loguito.png')}
                style={styles.image}
              />
              <Text style={styles.greetingText}>Bienvenido</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput 
                placeholder="Nombre de usuario" 
                placeholderTextColor="#D3D3D3" // Cambia el color del placeholder a gris claro
                style={styles.input}
                value={nombreUsuario}
                onChangeText={setNombreUsuario}
              />
              <Text style={styles.label}>Contraseña</Text>
              <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor="#D3D3D3" // Cambia el color del placeholder a gris claro
                secureTextEntry={true}
                style={styles.input}
                value={contraseña}
                onChangeText={p => setContraseña(p)}
              />
              <View style={styles.buttonContainer}>
                <Button title='Iniciar sesión' onPress={btnIngresarOnPress} color="#34CC91"/>
              </View>
            </View>
            <View style={styles.flexibleSpace}></View>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>¿No tienes cuenta?</Text>
              <TouchableOpacity>
                <Text style={styles.signupButton} onPress={handleSignUpPress}>Sign up!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
      },
      formContainer: {
        width: '80%',
        alignItems: 'center',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
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
      label: {
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        color: '#34CC91',
        fontWeight: 'bold',
      },
      input: {
        width: '100%',
        height: 40,
        borderBottomColor: '#818181',
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlign: 'left',
        color: "#212121",
      },
      buttonContainer: {
        width: '100%',
        marginTop: 20,
      },
      flexibleSpace: {
        flex: 1, // Espacio flexible para empujar el signupContainer hacia abajo
      },
      signupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
      },
      signupText: {
        fontSize: 16,
        color: '#818181',
        fontWeight: 'bold',
      },
      signupButton: {
        fontSize: 16,
        color: '#34CC91',
        fontWeight: 'bold',
      },
    });

export default Start;
