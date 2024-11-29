// components/DatosPer.tsx

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import { RootStackParamList } from '../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { API_URL } from '../config';

type DatosPerRouteProp = RouteProp<RootStackParamList, 'DatosPer'>;

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
    route: DatosPerRouteProp; // Aquí le dpy el tipo correcto a la ruta
};

function DatosPer({ navigation, route }: StartProps): React.JSX.Element {
    // Usar params de route
    const { usuario, correo, contraseña } = route.params || {};

    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [genero, setGenero] = useState('');
    const [peso, setPeso] = useState('');


    const onChangeFecha = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || fechaNacimiento;
        setShowDatePicker(Platform.OS === 'ios');
        setFechaNacimiento(currentDate);
    };

    const btnIngresarDatos = async () => {
        try {
            // Crear el objeto de datos para enviar a la API
            const datosUsuario = {
                nombre_usuario: usuario,
                correo,
                contraseña,
                fecha_nacimiento: fechaNacimiento.toISOString(), // Convierte la fecha a formato ISO
                genero,
                peso
            };

            // Llamada a la API para registrar al usuario
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosUsuario)
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Datos ingresados', 'Cuenta creada con éxito!!!');
                navigation.navigate('Start');
            } else {
                Alert.alert('Error', result.message || 'Hubo un error al crear la cuenta');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
        }
    };

    const handleGeneroChange = (value: string) => {
        setGenero(value);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer1}>
                    <Text style={styles.greetingText}>Datos personales</Text>
                    <Text style={styles.especificacion}>Los siguientes datos son necesarios para llevar un mejor monitoreo de tu estado de salud</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Fecha de nacimiento</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.customButton}>
                            <Text style={styles.customButtonText}>Selecciona tu fecha</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={fechaNacimiento}
                                mode="date"
                                display="default"
                                onChange={onChangeFecha}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    <Text style={styles.labelEs}>Género</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleGeneroChange('Femenino')}
                        >
                            <View style={genero === 'Femenino' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                            <Text style={styles.radioLabel}>Femenino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleGeneroChange('Masculino')}
                        >
                            <View style={genero === 'Masculino' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                            <Text style={styles.radioLabel}>Masculino</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.labelEs}>Peso en kg</Text>
                    <TextInput
                        placeholder="Tu peso"
                        placeholderTextColor="#D3D3D3"
                        style={styles.input}
                        onChangeText={p => setPeso(p)}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.flexibleSpace}></View>
                <View style={styles.formContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={btnIngresarDatos} style={styles.customButton}>
                            <Text style={styles.customButtonText}>Guardar datos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flexibleSpace}></View>
            </ScrollView>
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
        paddingTop: 20,
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
        marginBottom: 20,
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
    especificacion: {
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'flex-start',
        color: '#34CC91',
        fontWeight: 'bold',
        paddingBottom: 50,
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
    datePicker: {
        width: '100%',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    flexibleSpace: {
        flex: 1,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioButtonSelected: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#34CC91',
        marginRight: 10,
    },
    radioButtonUnselected: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#34CC91',
        marginRight: 10,
    },
    radioLabel: {
        fontSize: 16,
        color: '#45504C',
    },
    customButton: {
        backgroundColor: '#34CC91',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    customButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelEs: {
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'flex-start',
        color: '#45504C',
        fontWeight: 'bold',
        paddingTop: 30,
    },
});

export default DatosPer;

