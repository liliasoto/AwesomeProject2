import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import { useUser } from '../components/UserContext'; // Asegúrate de importar tu contexto

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function IngresarDatos({ navigation }: StartProps): React.JSX.Element {
    const [nivelOx, setNivelOx] = useState('');
    const [pulCar, setPulCar] = useState('');
    const isDarkMode = useColorScheme() === 'dark';
    const { userId } = useUser(); // Use the user ID from context

    const btnIrAHome = async () => {
        if (!nivelOx || !pulCar) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        const nivelOxParsed = parseFloat(nivelOx); 
        const pulCarParsed = parseFloat(pulCar);

        if (isNaN(nivelOxParsed) || isNaN(pulCarParsed)) {
            Alert.alert('Error', 'Por favor, ingrese valores numéricos válidos');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/mediciones', {
                nivel_oxigeno: nivelOxParsed,
                pulso_cardiaco: pulCarParsed,
                fecha_hora: new Date().toISOString(),
                usuario_id: userId, // Incluye el ID del usuario actual
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Datos guardados');
                navigation.navigate('Home');
            } else {
                console.error('Error response status:', response.status);
                Alert.alert('Error', `No se pudieron guardar los datos: ${response.statusText}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error message:', error.message);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    Alert.alert('Error', `Error al enviar los datos al servidor: ${error.response.statusText}`);
                } else {
                    Alert.alert('Error', `Error al enviar los datos al servidor: ${error.message}`);
                }
            } else {
                console.error('Unknown error:', error);
                Alert.alert('Error', 'Error desconocido al enviar los datos al servidor');
            }
        }
    };

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
        flex: 1,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonCor}>
                        <Image 
                            source={require('../imagenes/Heart.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.greetingText}>Niveles de oxígeno</Text>
                        <TextInput
                            placeholder="Ingrese el porcentaje"
                            style={styles.inputdos}
                            keyboardType="numeric"
                            onChangeText={p => setNivelOx(p)}
                            value={nivelOx}
                        />
                        <Text style={styles.greetingText}>Pulso cardiaco</Text>
                        <TextInput
                            placeholder="Ingrese los latidos por minuto"
                            style={styles.inputdos}
                            keyboardType="numeric"
                            onChangeText={p => setPulCar(p)}
                            value={pulCar}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={btnIrAHome} style={styles.customButton}>
                            <Text style={styles.customButtonText}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#45504C',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#818181',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    inputdos: {
        width: 220,
        height: 40,
        borderColor: '#818181',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    customButton: {
        backgroundColor: '#34CC91',
        paddingVertical: 10,
        paddingHorizontal: 60, // Make the button wider
        borderRadius: 5,
        alignItems: 'center',
    },
    customButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonCor: {
        width: 320,
        height: 290,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 100,
    },
});

export default IngresarDatos;
