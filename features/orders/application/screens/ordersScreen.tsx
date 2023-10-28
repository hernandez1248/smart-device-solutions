import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppBar } from '@react-native-material/core';
import { Searchbar, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import OrderCard from './components/orderCard';
import { OrdersProvider, useOrdersState } from '../providers/ordersProvider';
import AddOrderScreen from './components/addOrder';

function OrdersScreenView() {
  const [modalVisible, setModalVisible] = useState(false);
  
  const showModal = () => {
    setModalVisible(true);
  };
  
  const { orders, loading, getOrders } = useOrdersState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // Estado para mantener el estado seleccionado de los botones

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de las órdenes aquí
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderCards = () => {
    if (orders == null) {
      return null;
    }

    // Filtra órdenes según la búsqueda y el estado seleccionado
    const filteredOrders = orders.filter(
      (order) =>
        `${order.id} ${order.fullName}`.toLowerCase().includes(searchQuery.toLowerCase()) /* &&
        (selectedStatus ? order.status === selectedStatus : true) */
    );

    return filteredOrders.map((order) => <OrderCard key={order.id} order={order} />);
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
      <AppBar title="Órdenes" color="#0559B7" tintColor="white" centerTitle={true} />
      <Searchbar
        placeholder="Buscar órdenes"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />

      {/* Botones de estado */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => setSelectedStatus('Pendiente')}
          style={[styles.button, selectedStatus === 'Pendiente' && styles.selectedButton]}
        >
          Pendiente
        </Button>
        <Button
          mode="contained"
          onPress={() => setSelectedStatus('Completado')}
          style={[styles.button, selectedStatus === 'Completado' && styles.selectedButton]}
        >
          Completado
        </Button>
        <Button
          mode="contained"
          onPress={() => setSelectedStatus('Cancelado')}
          style={[styles.button, selectedStatus === 'Cancelado' && styles.selectedButton]}
        >
          Cancelado
        </Button>
      </View>

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
      <AddOrderScreen modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const OrderScreen = (props: any) => (
  <OrdersProvider>
    <OrdersScreenView {...props} />
  </OrdersProvider>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: '#1976D2',
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

export default OrderScreen;
