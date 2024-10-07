import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useUser } from '../components/UserContext';

type StartProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

interface EstadoSaludEntry {
  id: number;
  nivel_oxigeno: number;
  pulso_cardiaco: number;
  fecha_hora: string;
}

interface ChartData {
  seriesName: string;
  data: { x: string; y: number }[];
  color: string;
}

function EstadoDeSalud({ navigation }: StartProps): React.JSX.Element {
  const { userId } = useUser(); // Use the user ID from context
  const [oxigenoData, setOxigenoData] = useState<ChartData[]>([]);
  const [pulsoData, setPulsoData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        Alert.alert('Error', 'User ID is not available');
        return;
      }

      try {
        console.log('User ID:', userId); // Log the userId before making the request
        const response = await axios.get(`http://localhost:3000/mediciones/usuario/${userId}`);
        let data: EstadoSaludEntry[] = response.data;

        // Sort data by date in descending order
        data = data.sort((a, b) => new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime());

        // Get the latest 5 records
        const latestData = data.slice(0, 5);

        const oxigeno = latestData.map((entry) => ({
          x: new Date(entry.fecha_hora).getDate().toString(),
          y: parseFloat(entry.nivel_oxigeno.toFixed(2)),
        }));

        const pulso = latestData.map((entry) => ({
          x: new Date(entry.fecha_hora).getDate().toString(),
          y: parseFloat(entry.pulso_cardiaco.toFixed(2)),
        }));

        setOxigenoData([{ seriesName: 'Niveles de Oxígeno', data: oxigeno, color: '#34CC91' }]);
        setPulsoData([{ seriesName: 'Pulso Cardiaco', data: pulso, color: '#FF0000' }]);
      } catch (error) {
        console.error('Error fetching data', error);
        Alert.alert('Error', 'Error fetching data from server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Dependency on userId

  const healthPercentage = 86;
  const riskPercentage = 10;

  const irADetalles = async () => {
    navigation.navigate('Historial');
  };

  const renderCircularGraph = (percentage: number, color: string, label: string) => (
    <View style={styles.circularGraphContainer}>
      <Text style={styles.graphLabel}>{label}</Text>
      <Svg width={80} height={80} viewBox="0 0 100 100">
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
          fontSize="25"
          fill={color}
          fontWeight="bold"
        >
          {percentage}%
        </SvgText>
      </Svg>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        <View style={styles.chartWrapper}>
          <PureChart data={oxigenoData} type="bar" height={200} width={Dimensions.get('window').width * 1.5} />
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
        <View style={styles.chartWrapper}>
          <PureChart data={pulsoData} type="bar" height={200} width={Dimensions.get('window').width * 1.5} />
        </View>
      </ScrollView>

      <View style={styles.flexibleSpace}></View>
      <TouchableOpacity onPress={irADetalles}>
        <Text style={styles.moreDetailsText}>Ver más a detalle</Text>
      </TouchableOpacity>
      <View style={styles.flexibleSpace}></View>
    </ScrollView>
  );
}
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
  chartWrapper: {
    width: Dimensions.get('window').width * 1.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EstadoDeSalud;
