// components/Cambiarcuenta.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../App';
import { useState } from 'react';

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Start', 'SignUp'>;
};

function CambiarCuenta({navigation}: StartProps): React.JSX.Element {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const btnIrAHome = function(){
        navigation.navigate('Home')
    }
      return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer1}>
              <Text style={styles.greetingText}>Sign in</Text>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                placeholder="Tu nombre"
                style={styles.input}
                onChangeText={p => setUsuario(p)}
              />
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                placeholder="Tu contraseña"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={p => setContraseña(p)}
              />
            </View>
            <View style={styles.flexibleSpace}></View>
            <View style={styles.formContainer}>
              <View style={styles.buttonContainer}>
                <Button title='Iniciar sesión' onPress={btnIrAHome} color="#34CC91" />
              </View>
            </View>
            <View style={styles.flexibleSpace}></View>
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
          paddingTop: 20, // Agrega un espacio mínimo desde la parte superior
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        formContainer1: {
          width: '80%',
          alignItems: 'center',
        },
        formContainer: {
          width: '80%',
          alignItems: 'center',
        },
        greetingText: {
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 50,
          textAlign: 'center',
          color: '#45504C',
          alignSelf: 'flex-start',
        },
        label: {
          fontSize: 18,
          marginBottom: 10,
          alignSelf: 'flex-start',
          color: '#45504C',
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
        checkboxContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        checkbox: {
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: '#ddd',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        },
        checked: {
          width: 14,
          height: 14,
          backgroundColor: '#34CC91',
        },
        checkboxLabel: {
          fontSize: 16,
          color: '#818181',
        },
        privacyPolicyLink: {
          color: '#34CC91',
          textDecorationLine: 'underline',
        },
        buttonContainer: {
          width: '100%',
          marginTop: 20,
        },
        flexibleSpace: {
          flex: 1,
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

export default CambiarCuenta;
