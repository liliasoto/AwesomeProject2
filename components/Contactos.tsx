// components/Contactos.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
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

    const [modalVisible, setModalVisible] = useState(false);
    const [nuevoContacto, setNuevoContacto] = useState<Contacto>({
        id: '',
        nombre: '',
        correo: '',
        estado: '',
    });

    const handleAddContact = () => {
        setModalVisible(true);
    };

    const handleSaveContact = () => {
        if (nuevoContacto.nombre && nuevoContacto.correo && nuevoContacto.estado) {
            setContactos([...contactos, nuevoContacto]);
            setModalVisible(false);
            setNuevoContacto({
                id: '',
                nombre: '',
                correo: '',
                estado: '',
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Lista de contactos</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                    <Text style={styles.addButtonText}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar contacto"
                placeholderTextColor="#D3D3D3"
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
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Agregar Contacto</Text>
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor="#D3D3D3"
                            style={styles.input}
                            value={nuevoContacto.nombre}
                            onChangeText={nombre => setNuevoContacto({ ...nuevoContacto, nombre })}
                        />
                        <TextInput
                            placeholder="Correo"
                            placeholderTextColor="#D3D3D3"
                            style={styles.input}
                            value={nuevoContacto.correo}
                            onChangeText={correo => setNuevoContacto({ ...nuevoContacto, correo })}
                        />
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    nuevoContacto.estado === 'Familiar' && styles.radioButtonSelected,
                                ]}
                                onPress={() => setNuevoContacto({ ...nuevoContacto, estado: 'Familiar' })}
                            >
                                <View style={styles.radioButtonInnerCircle} />
                                <Text style={styles.radioLabel}>Familiar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    nuevoContacto.estado === 'Amigo' && styles.radioButtonSelected,
                                ]}
                                onPress={() => setNuevoContacto({ ...nuevoContacto, estado: 'Amigo' })}
                            >
                                <View style={styles.radioButtonInnerCircle} />
                                <Text style={styles.radioLabel}>Amigo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    nuevoContacto.estado === 'Doctor' && styles.radioButtonSelected,
                                ]}
                                onPress={() => setNuevoContacto({ ...nuevoContacto, estado: 'Doctor' })}
                            >
                                <View style={styles.radioButtonInnerCircle} />
                                <Text style={styles.radioLabel}>Doctor</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} color={'#34CC91'} />
                            <Button title="Guardar" onPress={handleSaveContact} color={'#34CC91'}/>
                        </View>
                    </View>
                </View>
            </Modal>
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
        color: "#212121",
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
    // Estilos para el modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: "#212121",
    },
    input: {
        height: 40,
        borderColor: '#818181',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: "#212121",
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonInnerCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#34CC91',
        marginRight: 10,
    },
    radioButtonSelected: {
        backgroundColor: '#34CC91',
    },
    radioLabel: {
        fontSize: 16,
        color: '#45504C',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default Contactos;
