import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import { API_URL } from '../config';

interface Registro {
  fecha: string;
  hora: string;
  latidos: number;
  oxigeno: number;
}

const Historial = (): React.JSX.Element => {
  const { userId } = useUser(); // Use the user ID from context
  const [historialData, setHistorialData] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        Alert.alert('Error', 'User ID is not available');
        return;
      }

      try {
        console.log('User ID:', userId); // Log the userId before making the request
        const response = await axios.get(`${API_URL}/mediciones/usuario/${userId}`);
        const data = response.data;

        const formattedData = data.map((entry: any) => {
          const date = new Date(entry.fecha_hora);
          return {
            fecha: date.toLocaleDateString(),
            hora: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            latidos: entry.pulso_cardiaco,
            oxigeno: entry.nivel_oxigeno,
          };
        });

        setHistorialData(formattedData.reverse());
        setHasData(formattedData.length > 0);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setHasData(false);
        } else {
          console.error('Error fetching data', error);
          Alert.alert('Error', 'Error al conectar con el servidor');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Registro }) => (
    <View style={styles.listItem}>
      <View style={styles.header}>
        <Text style={styles.fecha}>{item.fecha}</Text>
        <Text style={styles.hora}>{item.hora}</Text>
      </View>
      <Text style={styles.detalle}>{`${item.latidos} lpm, ${item.oxigeno}% de oxígeno`}</Text>
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
    <View style={styles.container}>
      <View style={styles.alarmHeader}>
        <Image source={require('../imagenes/his.png')} style={styles.alarmIcon} />
        <Text style={styles.alarmText}>Historial</Text>
      </View>
        {!hasData ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Aún no hay mediciones registradas</Text>
            <Text style={styles.noDataSubText}>Las mediciones que realices aparecerán aquí</Text>
          </View>
        ) : (
          <FlatList
            data={historialData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#45504C',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  noDataSubText: {
    fontSize: 16,
    color: '#818181',
    textAlign: 'center',
  },
});

export default Historial;
