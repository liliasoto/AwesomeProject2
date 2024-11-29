// components/Start.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View,  Modal, TextInput, Button, Text, Linking } from 'react-native';
import { RootStackParamList } from '../App';

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Start'>;
};

function SignUp({navigation}: StartProps): React.JSX.Element {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correo, setCorreo] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const btnIrADatosPersonales = function () {
        Alert.alert('Ahora ingresa tus datos personales')
        navigation.navigate('DatosPer', { usuario, correo, contraseña });
        return;
    };

    const irASignIn = function () {
      navigation.navigate('Start');
      return;
  };
    
    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
      };
    
      const handlePrivacyPolicyPress = () => {
        setIsModalVisible(true); // Mostrar el modal
      };
    
      const closeModal = () => {
        setIsModalVisible(false); // Cerrar el modal
      };
    
      return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer1}>
              <Text style={styles.greetingText}>Sign up</Text>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput
                placeholder="Tu nombre"
                placeholderTextColor="#D3D3D3"
                style={styles.input}
                onChangeText={p => setUsuario(p)}
              />
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                placeholder="Tu correo"
                placeholderTextColor="#D3D3D3"
                style={styles.input}
                onChangeText={p => setCorreo(p)}
              />
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                placeholder="Tu contraseña"
                placeholderTextColor="#D3D3D3" 
                secureTextEntry={true}
                style={styles.input}
                onChangeText={p => setContraseña(p)}
              />
            </View>
            <View style={styles.flexibleSpace}></View>
            <View style={styles.formContainer}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
                  {isChecked && <View style={styles.checked} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  Estoy de acuerdo con las{' '}
                  <Text style={styles.privacyPolicyLink} onPress={handlePrivacyPolicyPress}>
                    Políticas de privacidad
                  </Text>
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button title='Continuar' onPress={btnIrADatosPersonales} color="#34CC91" />
              </View>
            </View>
            <View style={styles.flexibleSpace}></View>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>¿Tienes una cuenta?</Text>
              <TouchableOpacity>
                <Text style={styles.signupButton} onPress={irASignIn}>Sign in!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Políticas de Privacidad</Text>
                <ScrollView>
                <Text style={styles.modalText}>
                  Recopilamos información personal (nombre, correo, etc.) para mejorar la experiencia del usuario y el
                  funcionamiento de la aplicación. No compartimos tu información con terceros sin tu
                  consentimiento, excepto cuando es requerido por ley.
                </Text>
                </ScrollView>
                <Button title="Cerrar" onPress={closeModal} color="#34CC91" />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        color: "#212121",
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
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#45504C',
      },
      modalText: {
        fontSize: 16,
        color: '#818181',
        marginBottom: 20,
      },
    });
    
export default SignUp;
