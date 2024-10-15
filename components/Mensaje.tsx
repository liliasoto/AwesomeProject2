// components/Mensaje.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, StatusBar, useColorScheme, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

type MensajeProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Mensaje'>;
    route: RouteProp<RootStackParamList, 'Mensaje'>;
};

type MensajeItem = {
    id: string;
    texto: string;
    enviadoPorUsuario: boolean;
    tipo?: 'texto' | 'pdf'; // add a type field to handle different message types
};

const Mensaje = ({ navigation, route }: MensajeProps): React.JSX.Element => {
    const { contacto } = route.params;
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState<MensajeItem[]>([
        { id: '1', texto: 'Hola, ¿cómo estás?', enviadoPorUsuario: false },
        { id: '2', texto: 'Estoy bien, gracias. ¿Y tú?', enviadoPorUsuario: true },
    ]);

    /*FUNCIONABA BIEN ANTES DE LO DEL PDF
    const handleSend = () => {
        if (mensaje.trim()) {
            setMensajes([...mensajes, { id: Date.now().toString(), texto: mensaje, enviadoPorUsuario: true }]);
            setMensaje('');
        }
    };

    
    const renderItem = ({ item }: { item: MensajeItem }) => (
        <View style={[styles.messageContainer, item.enviadoPorUsuario ? styles.userMessage : styles.contactMessage]}>
            <Text style={styles.messageText}>{item.texto}</Text>
        </View>
    );
    */

    //______//
    const handleSend = () => {
        if (mensaje.trim()) {
            setMensajes([...mensajes, { id: Date.now().toString(), texto: mensaje, enviadoPorUsuario: true, tipo: 'texto' }]);
            setMensaje('');
        }
    };

    const handleSendPdf = async () => {
        // Create PDF content
        const pdfPath = `${RNFS.DocumentDirectoryPath}/estado_de_salud.pdf`;
        const pdfContent = `
        <h1>Soy un PDF</h1>
        <p>Este es un ejemplo de un archivo PDF enviado desde la aplicación.</p>
        `;

        // Save PDF to file
        await RNFS.writeFile(pdfPath, pdfContent, 'utf8');

        // Add PDF message to the chat
        setMensajes([...mensajes, { id: Date.now().toString(), texto: pdfPath, enviadoPorUsuario: true, tipo: 'pdf' }]);
    };

    const renderItem = ({ item }: { item: MensajeItem }) => {
        if (item.tipo === 'pdf') {
            return (
                <View style={styles.pdfContainer}>
                    <Text style={styles.pdfTitle}>Estado de Salud PDF</Text>
                    <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownloadPdf(item.texto)}>
                        <Text style={styles.downloadButtonText}>Descargar PDF</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={[styles.messageContainer, item.enviadoPorUsuario ? styles.userMessage : styles.contactMessage]}>
                <Text style={styles.messageText}>{item.texto}</Text>
            </View>
        );
    };

    const handleDownloadPdf = (path: string) => {
        // Logic to download and open the PDF (optional)
        // You might want to use a library to open the PDF directly
        Alert.alert('PDF Downloaded', `You can find your PDF at: ${path}`);
    };
    //______//


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{contacto.nombre}</Text>
            </View>
            <FlatList
                data={mensajes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.messageList}
                contentContainerStyle={styles.messageListContent}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un mensaje"
                    value={mensaje}
                    onChangeText={setMensaje}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSendPdf}  style={styles.sendStatusButton}>
                <Text style={styles.sendStatusButtonText}>Enviar estado de salud</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#34CC91',
    },
    backButton: {
        fontSize: 20,
        color: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    messageList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    messageListContent: {
        paddingVertical: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    contactMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#818181',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    sendButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#34CC91',
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sendStatusButton: {
        paddingVertical: 15,
        backgroundColor: '#34CC91',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendStatusButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pdfContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pdfTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    downloadButton: {
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#34CC91',
        borderRadius: 5,
    },
    downloadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Mensaje;