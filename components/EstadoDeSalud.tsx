//EstadoDeSalud.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useUser } from '../components/UserContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { API_URL } from '../config';


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
  const [hasEnoughData, setHasEnoughData] = useState(true); // New state for checking data availability
  const [healthPercentage, setHealthPercentage] = useState(0); // Update state for health percentage
  const [riskPercentage, setRiskPercentage] = useState(0); // Update state for risk percentage
  const [pdfFilePath, setPdfFilePath] = useState('');
  //___________________________//
  // Helper function to calculate age from birthdate
  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Get normal pulse ranges based on age and gender
  const getPulseRange = (age: number, gender: string): { min: number; max: number } => {
    if (gender === 'M' || gender === 'Masculino') {
      if (age <= 25) return { min: 49, max: 55 };
      if (age <= 35) return { min: 50, max: 56 };
      if (age <= 45) return { min: 51, max: 57 };
      if (age <= 55) return { min: 54, max: 59 };
      if (age <= 65) return { min: 57, max: 61 };
      return { min: 57, max: 61 };
    } else {
      if (age <= 25) return { min: 54, max: 60 };
      if (age <= 35) return { min: 55, max: 61 };
      if (age <= 45) return { min: 57, max: 62 };
      if (age <= 55) return { min: 58, max: 63 };
      if (age <= 65) return { min: 60, max: 64 };
      return { min: 60, max: 64 };
    }
  };
  //_________________________//

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        Alert.alert('Error', 'User ID is not available');
        return;
      }

      try {
        console.log('User ID:', userId); // Log the userId before making the request
        const response = await axios.get(`${API_URL}/mediciones/usuario/${userId}`);
        let data: EstadoSaludEntry[] = response.data;

        // Sort data by date in descending order
        data = data.sort((a, b) => new Date(b.fecha_hora).getTime() - new Date(a.fecha_hora).getTime());
        

        /*
        const latestData = data.slice(0, 10);

        if (latestData.length === 0) {
          Alert.alert('Error', 'No data available');
          return;
        }
        */
        
        // Get the latest 5 records
        const latest5Data = data.slice(0, 5).reverse();;

        // Check if there are at least 5 measurements
        if (latest5Data.length < 5) {
          setHasEnoughData(false);
          return; // Return early if not enough data
        }

        const oxigeno = latest5Data.map((entry) => ({
          x: new Date(entry.fecha_hora).getDate().toString(),
          y: parseFloat(entry.nivel_oxigeno.toFixed(2)),
        }));

        const pulso = latest5Data.map((entry) => ({
          x: new Date(entry.fecha_hora).getDate().toString(),
          y: parseFloat(entry.pulso_cardiaco.toFixed(2)),
        }));

        setOxigenoData([{ seriesName: 'Niveles de Oxígeno', data: oxigeno, color: '#34CC91' }]);
        setPulsoData([{ seriesName: 'Pulso Cardiaco', data: pulso, color: '#FF0000' }]);
        
        //________________________________________//
        const latestData = data.slice(0, 10);

        if (latestData.length === 0) {
          // No hay datos, mantener el estado actual
          Alert.alert('Error', 'No data available for health calculation');
          return;
        }
        // Calculate average values
        const avgOxigeno = latestData.reduce((acc, entry) => acc + entry.nivel_oxigeno, 0) / latestData.length;
        const avgPulso = latestData.reduce((acc, entry) => acc + entry.pulso_cardiaco, 0) / latestData.length;

        // Fetch user info for age and gender
        const userResponse = await axios.get(`${API_URL}/usuarios/${userId}`);
        const { fecha_nacimiento, genero } = userResponse.data;
        const age = calculateAge(fecha_nacimiento);

        // Define healthy ranges
        const healthyOxigeno = 95; // Healthy oxygen level is 95% or higher
        const { min: minPulso, max: maxPulso } = getPulseRange(age, genero);

        // Calculate health percentage based on these ranges
        let health = 100;
        let risk = 0;

        // Penalize oxygen if it's below the healthy threshold
        if (avgOxigeno < healthyOxigeno) {
          const oxigenoDiff = (healthyOxigeno - avgOxigeno) * 2;
          health -= oxigenoDiff;
        }

        // Penalize pulse if it's outside the normal range
        if (avgPulso < minPulso || avgPulso > maxPulso) {
          const pulseDiff = Math.abs(avgPulso - (minPulso + maxPulso) / 2) * 1.5;
          health -= pulseDiff;
        }

        // Ensure health and risk percentages stay within valid ranges
        health = Math.max(0, health);
        risk = 100 - health;

        setHealthPercentage(health);
        setRiskPercentage(risk);
        //__________________________________//
      
      } catch (error) {
        // Check if the error is a 404 response
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setHasEnoughData(false);
        } else {
          console.error('Error fetching data', error);
          Alert.alert('Error', 'Error fetching data from server');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // Dependency on userId

  /*
  const healthPercentage = 86;
  const riskPercentage = 10;
  */

  const irADetalles = async () => {
    navigation.navigate('Historial');
  };

  const renderCircularGraph = (percentage: number, color: string, label: string) => (
    <View style={styles.circularGraphContainer}>
      <Text style={styles.graphLabel}>{label}</Text>
      <Svg width={90} height={90} viewBox="0 0 100 100">
        <G rotation="-90" origin="50, 50">
          <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="10" fill="none" />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${percentage * 2.83}, 283`}
            strokeDashoffset="0"
            fill="none"
          />
        </G>
        <SvgText
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fontSize="18"
          fill="#333"
          fontWeight="bold"
        >
          {percentage.toFixed(0)}%
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

  //IPDF_______________//
  // Function to generate PDF
  const generatePDF = async () => {
      
  };
  //FPDF_______________//

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
        {renderCircularGraph(healthPercentage, healthPercentage > 60 ? '#34CC91' : '#FF0000', 'Estado de salud')}
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
        {hasEnoughData ? (
          <View style={styles.chartWrapper}>
            <PureChart data={oxigenoData} type="bar" height={200} width={Dimensions.get('window').width * 1.5} />
          </View>
        ) : (
          <Text style={styles.noDataText}>Aún no tienes mediciones suficientes.</Text>
        )}
      </ScrollView>

      <View style={styles.sectionHeader2}>
        <Text style={styles.sectionTitle}>Pulso cardiaco</Text>
        <View style={styles.divider}>
          <View style={styles.dividerLight} />
          <View style={styles.dividerDark} />
        </View>
      </View>
      <ScrollView horizontal>
        {hasEnoughData ? (
          <View style={styles.chartWrapper}>
            <PureChart data={pulsoData} type="bar" height={200} width={Dimensions.get('window').width * 1.5} />
          </View>
        ) : (
          <Text style={styles.noDataText}>Aún no tienes mediciones suficientes.</Text>
        )}
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
  noDataText: {
    fontSize: 16,
    color: '#818181',
    textAlign: 'center',
    margin: 20,
  }
});

export default EstadoDeSalud;
