// components/Start.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Image, useColorScheme, TextInput, Button, Text } from 'react-native';
import { RootStackParamList } from '../App';

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Start({navigation}: StartProps): React.JSX.Element {
    const [contraseña, setContraseña] = useState('');

    const btnIngresarOnPress = function () {
        if (contraseña){
            navigation.navigate('Home');
            return;
        }
        Alert.alert('Fallido', 'Datos incorrectos')
    };

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    const cambiarDeUsario = () => {
        navigation.navigate('CambiarCuenta')
    }
    
    
    return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.flexibleSpace}></View>
            <View style={styles.headerContainer}>
              <Image
                source={require('../imagenes/image.png')}
                style={styles.image}
              />
              <Text style={styles.greetingText}>Hola Lilia</Text>
              <TouchableOpacity >
                <Text style={styles.changeUserText} onPress={cambiarDeUsario}>Cambiar usuario</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput 
                placeholder="Contraseña" 
                secureTextEntry={true}
                style={styles.input}
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
