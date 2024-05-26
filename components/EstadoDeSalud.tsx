// components/EstadoDeSalud.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import PureChart from 'react-native-pure-chart';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type StartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function EstadoDeSalud({navigation}: StartProps): React.JSX.Element {
  const healthPercentage = 86;
  const riskPercentage = 10;

  const oxigenoData = [
    {
      seriesName: 'Niveles de Oxígeno',
      data: [
        { x: 'Enero', y: 98 },
        { x: 'Febrero', y: 96 },
        { x: 'Marzo', y: 95 },
        { x: 'Abril', y: 97 },
        { x: 'Mayo', y: 99 },
        { x: 'Junio', y: 96 },
        { x: 'Julio', y: 97 },
        { x: 'Agosto', y: 98 },
        { x: 'Septiembre', y: 96 },
        { x: 'Octubre', y: 97 },
        { x: 'Noviembre', y: 98 },
        { x: 'Diciembre', y: 99 },
      ],
      color: '#34CC91',
    },
  ];

  const pulsoData = [
    {
      seriesName: 'Pulso Cardiaco',
      data: [
        { x: 'Enero', y: 72 },
        { x: 'Febrero', y: 75 },
        { x: 'Marzo', y: 70 },
        { x: 'Abril', y: 73 },
        { x: 'Mayo', y: 74 },
        { x: 'Junio', y: 72 },
        { x: 'Julio', y: 71 },
        { x: 'Agosto', y: 75 },
        { x: 'Septiembre', y: 72 },
        { x: 'Octubre', y: 74 },
        { x: 'Noviembre', y: 73 },
        { x: 'Diciembre', y: 71 },
      ],
      color: '#FF0000',
    },
  ];

  const irADetalles = async () => {
    navigation.navigate('Historial');
  };

  const renderCircularGraph = (percentage: number, color: string, label: string) => (
    <View style={styles.circularGraphContainer}>
      <Text style={styles.graphLabel}>{label}</Text>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <G rotation="-90" origin="50, 50">
          <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="10" fill="none" />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${(percentage / 100) * 283} ${(1 - percentage / 100) * 283}`}
            strokeDashoffset="0"
            fill="none"
          />
        </G>
        <SvgText
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fill={color}
          fontWeight="bold"
        >
          {percentage}%
        </SvgText>
      </Svg>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estado de salud</Text>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nivel de salud</Text>
        <View style={styles.divider}>
          <View style={styles.dividerLight} />
          <View style={styles.dividerDark} />
        </View>
      </View>

      <View style={styles.graphsContainer}>
        {renderCircularGraph(healthPercentage, healthPercentage > 70 ? '#34CC91' : '#FF0000', 'Estado de Salud')}
        {renderCircularGraph(riskPercentage, riskPercentage > 30 ? '#FF0000' : '#34CC91', 'Riesgo')}
      </View>

      <View style={styles.sectionHeader2}>
        <Text style={styles.sectionTitle}>Niveles de oxígeno</Text>
        <View style={styles.divider}>
          <View style={styles.dividerLight} />
          <View style={styles.dividerDark} />
        </View>
      </View>
      <ScrollView horizontal>
        <View style={styles.parachart}>
          <PureChart data={oxigenoData} type="bar" height={200} width= "100%" />
        </View>
      </ScrollView>

      <View style={styles.sectionHeader2}>
        <Text style={styles.sectionTitle}>Pulso cardiaco</Text>
        <View style={styles.divider}>
          <View style={styles.dividerLight} />
          <View style={styles.dividerDark} />
        </View>
      </View>
      <ScrollView horizontal>
        <View style={styles.parachart}>
          <PureChart data={pulsoData} type="bar" height={200} width= "100%" />
        </View>
      </ScrollView>

      <View style={styles.flexibleSpace}></View>
      <TouchableOpacity onPress={irADetalles}>
        <Text style={styles.moreDetailsText}>Ver más a detalle</Text>
      </TouchableOpacity>
      <View style={styles.flexibleSpace}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  flexibleSpace: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#45504C',
    marginBottom: 20,
  },
  sectionHeader: {
    alignSelf: 'stretch',
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#45504C',
    textAlign: 'right',
  },
  divider: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 5,
  },
  dividerLight: {
    flex: 2,
    backgroundColor: '#D3D3D3',
  },
  dividerDark: {
    flex: 1,
    backgroundColor: '#818181',
  },
  graphsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  circularGraphContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  graphLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45504C',
  },
  moreDetailsText: {
    fontSize: 18,
    color: '#34CC91',
    fontWeight: 'bold',
    marginTop: 20,
  },
  sectionHeader2: {
    alignSelf: 'stretch',
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  parachart: {
    width: Dimensions.get('window').width - 40, // Limita el ancho del contenedor del gráfico al ancho de la pantalla menos el padding
    alignSelf: 'center',

  },
});

export default EstadoDeSalud;
