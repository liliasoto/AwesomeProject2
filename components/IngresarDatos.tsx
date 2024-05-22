// components/IngresarDatos.tsx

import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type StartProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};



function IngresarDatos({ navigation }: StartProps): React.JSX.Element {
    const [nivelOx, setNivelOx] = useState('');
    const [pulCar, setPulCar] = useState('');
    const isDarkMode = useColorScheme() === 'dark';

    const btnIrAHome = () => {
        Alert.alert('Datos guardados');
        navigation.navigate('Home');
    }

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
                            style={styles.input}
                            onChangeText={p => setNivelOx(p)}
                        />
                        <Text style={styles.greetingText}>Pulso cardiaco</Text>
                        <TextInput
                            placeholder="Ingrese los latidos por minuto"
                            style={styles.input}
                            onChangeText={p => setPulCar(p)}
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
