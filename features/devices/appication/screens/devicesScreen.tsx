import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import DeviceCard from './components/deviceCard';
import { DevicesProvider, useDevicesState } from '../providers/devicesProvider';
import AddDeviceView from './components/addDevice';
import DeviceEditScreen from './components/deviceEditModal';

function DevicesScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  
  const { 
    devices, 
    loading,
    deviceSelected,

    //actions
    getDevices,
    setDeviceSelected,
    onUpdatedDevice,
    onSavedDevice
  } = useDevicesState();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los usuarios aquí
  };

  useEffect(() => {
    getDevices();
  }, []);

  const renderCards = () => {
    if (devices == null) {
      return null;
    }

    const filteredDevices = devices.filter(
      (device) =>
        `${device.brand}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredDevices.map((device) => <DeviceCard key={device.id} device={device} onEdit={setDeviceSelected}/>);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={120} color='#00ff00'></ActivityIndicator>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AppBar title="Dispositivos registrados" color="#0559B7" tintColor="white" centerTitle={true} />
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

      {/* Botón de agregar */}
      <IconButton
        icon="plus"
        onPress={showModal}
        style={styles.addButton}
        iconColor="#ffffff"
        size={30}
      />
      <AddDeviceView modalVisible={modalVisible} setModalVisible={setModalVisible} onSaved = {onSavedDevice} />
      {!!deviceSelected ? (
      <DeviceEditScreen deviceEdit={deviceSelected} modalVisible={!!deviceSelected} onSaved={onUpdatedDevice} onCancelEdit={setDeviceSelected} />
      ) : null}

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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default DeviceScreen;
