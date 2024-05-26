// components/Historial.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';

interface Registro {
  fecha: string;
  hora: string;
  latidos: number;
  oxigeno: number;
}

const historialData: Registro[] = [
  { fecha: '25/02/2024', hora: '5:35', latidos: 89, oxigeno: 92 },
  { fecha: '24/02/2024', hora: '21:23', latidos: 85, oxigeno: 94 },
  { fecha: '23/02/2024', hora: '14:15', latidos: 88, oxigeno: 91 },
  { fecha: '22/02/2024', hora: '9:45', latidos: 90, oxigeno: 93 },
  // Agrega más datos temporales aquí
];

const Historial = (): React.JSX.Element => {
  const renderItem = ({ item }: { item: Registro }) => (
    <View style={styles.listItem}>
      <View style={styles.header}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.hora}>{item.hora}</Text>
      </View>
      <Text style={styles.detalle}>{`${item.latidos} lpm, ${item.oxigeno}% de oxígeno`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.alarmHeader}>
        <Image source={require('../imagenes/his.png')}  style={styles.alarmIcon} />
        <Text style={styles.alarmText}>Historial</Text>
      </View>
      <FlatList
        data={historialData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#45504C',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  alarmHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  alarmIcon: {
    width: 50, 
    height: 50,
    marginRight: 10,
  },
  alarmText: {
    flex: 1,
    fontSize: 30, // Ajusta el tamaño de fuente para que coincida con el título
    fontWeight: 'bold',
    color: '#45504C',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  hora: {
    fontSize: 15,
    color: '#818181',
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 15,
    color: '#818181',
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 20,
    color: '#34CC91',
    fontWeight: 'bold',
  },
});

export default Historial;
