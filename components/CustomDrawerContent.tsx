// components/CustomDrawerContent.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.closeDrawer()}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={require('../imagenes/image.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Lilia Soto</Text>
        <Text style={styles.profileEmail}>lilia@correo.com</Text>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle navigation */ }}>
        <Text style={styles.menuItemText}>Historial</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle navigation */ }}>
        <Text style={styles.menuItemText}>Mi información</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle navigation */ }}>
        <Text style={styles.menuItemText}>Configuración</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle sign out */ }}>
        <Text style={styles.signOutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#32CE8F',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: 'gray',
  },
  signOutText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default CustomDrawerContent;
