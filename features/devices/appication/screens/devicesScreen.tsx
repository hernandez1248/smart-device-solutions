import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppBar } from '@react-native-material/core';
import { DevicesProvider, useDevicesState } from '../providers/devicesProvider';
import { Searchbar, IconButton} from 'react-native-paper';
import DeviceCard from './components/deviceCard';

function DevicesScreenView() {
  const { devices, getDevices } = useDevicesState();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los dispositivos aquí
  };

  useEffect(() => {
    getDevices();
  }, []);

  const renderCards = () => {
    if (devices == null) {
      return null;
    }

    // Filtra dispositivos según la búsqueda
    const filteredDevices = devices.filter(
      (device) =>
        `${device.brand}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredDevices.map((device) => (
      <DeviceCard key={device.id} device={device} />
    ));
  };

  return (
    <View style={styles.container}>
      <AppBar title="Dispositivos" color="#0559B7" tintColor="white" centerTitle={true} />
      <Searchbar
        placeholder="Buscar dispositivos"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        {renderCards()}
      </ScrollView>
      <IconButton
        icon="plus"
        onPress={() => {
          // Acción al presionar el botón de agregar nuevo dispositivo
          // Puedes abrir un modal, navegar a una nueva pantalla, etc.
        }}
        style={styles.addButton}
        iconColor="#ffffff"
        size={30}
      />
    </View>
  );
}

const DeviceScreen = (props: any) => (
  <DevicesProvider>
    <DevicesScreenView {...props} />
  </DevicesProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  containerScrollView: {
    justifyContent: 'center',
    padding: 20,
  },
  searchBar: {
    marginTop: 20,
    backgroundColor: '#e0e0e0',
  },
  searchInput: {
    color: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0559B7', 
    borderRadius: 50,
    elevation: 5, 
  },
});

export default DeviceScreen;
