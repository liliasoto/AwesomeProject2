import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { RootStackParamList } from '../App';

type StartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};


function Yo({ navigation }: StartProps): React.JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);
  const [peso, setPeso] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAceptar = () => {
    // Aquí puedes manejar el nuevo peso introducido
    console.log(`Nuevo peso: ${peso} kg`);
    setModalVisible(false);
  };

  const irAStart = async () => {
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity onPress={toggleModal} style={styles.updateWeightContainer}>
        <Text style={styles.updateWeightText}>Actualizar mi peso</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder="Introduce tu nuevo peso en kilos"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleAceptar} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.flexibleSpace} />

      <TouchableOpacity style={styles.logoutContainer}>
        <Text style={styles.logoutText} onPress={irAStart}>Cerrar sesión  </Text>
        <Image source={require('../imagenes/logouticon.png')}  style={styles.logoutIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#45504C',
    marginBottom: 20,
  },
  updateWeightContainer: {
    width: Dimensions.get('window').width - 40,
    padding: 15,
    borderColor: '#34CC91',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateWeightText: {
    fontSize: 18,
    color: '#34CC91',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#45504C',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#34CC91',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flexibleSpace: {
    flex: 1,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: '#818181',
    fontWeight: 'bold',
    marginRight: 5,
  },
  logoutIcon: {
    width: 18,
    height: 18, // Ajusta el tamaño de acuerdo a tus necesidades
  },
});

export default Yo;

