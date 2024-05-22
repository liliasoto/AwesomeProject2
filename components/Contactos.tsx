// components/Contactos.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Ajusta la importación según la estructura de tu proyecto

type Contacto = {
    id: string;
    nombre: string;
    correo: string;
    estado: string;
};

type ContactosProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Contactos'>;
};

const Contactos = ({ navigation }: ContactosProps): React.JSX.Element => {
    const [search, setSearch] = useState('');
    const [contactos, setContactos] = useState<Contacto[]>([
        { id: '1', nombre: 'Juan Pérez', correo: 'juan@example.com', estado: 'Familiar' },
        { id: '2', nombre: 'María García', correo: 'maria@example.com', estado: 'Doctor' },
        { id: '3', nombre: 'Carlos Ruiz', correo: 'carlos@example.com', estado: 'Familiar' },
        { id: '4', nombre: 'Ana López', correo: 'ana@example.com', estado: 'Doctor' },
    ]);

    const handleContactPress = (contacto: Contacto) => {
        navigation.navigate('Mensaje', { contacto });
    };

    const renderItem = ({ item }: { item: Contacto }) => (
        <TouchableOpacity onPress={() => handleContactPress(item)} style={styles.contactItem}>
            <Text style={styles.contactName}>{item.nombre}</Text>
            <Text style={styles.contactEmail}>{item.correo}</Text>
            <Text style={styles.contactStatus}>{item.estado}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Lista de contactos</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar contacto"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={contactos.filter(contacto =>
                    contacto.nombre.toLowerCase().includes(search.toLowerCase()) ||
                    contacto.correo.toLowerCase().includes(search.toLowerCase()) ||
                    contacto.estado.toLowerCase().includes(search.toLowerCase())
                )}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.contactList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#34CC91',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#34CC91',
        fontWeight: 'bold',
        fontSize: 16,
    },
    searchInput: {
        marginTop: 20,
        marginHorizontal: 20,
        padding: 10,
        borderColor: '#818181',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    contactList: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    contactItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#45504C',
    },
    contactEmail: {
        fontSize: 16,
        color: '#818181',
    },
    contactStatus: {
        fontSize: 16,
        color: '#34CC91',
    },
    backButton: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Contactos;
