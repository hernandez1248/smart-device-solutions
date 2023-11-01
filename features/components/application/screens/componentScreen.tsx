import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import ComponentCard from './components/componentCard';
import { ComponentsProvider, useComponentsState } from '../providers/componentsProvider';

function ComponentsScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const { components, getComponents } = useComponentsState();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los componentes aquí
  };

  useEffect(() => {
    getComponents();
  }, []);

  const renderCards = () => {
    if (components == null) {
      return null;
    }

    // Filtra componentes según la búsqueda
    const filteredComponents = components.filter(
      (component) =>
        `${component.name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredComponents.map((component) => (
      <ComponentCard 
        key={component.id} 
        component={component} 
      />
    ));
  };

  return (
    <View style={styles.container}>
      <AppBar title="Componentes" color="#0559B7" tintColor="white" centerTitle={true} />
      <Searchbar
        placeholder="Buscar componentes"
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
        onPress={showModal}
        style={styles.addButton}
        iconColor="#ffffff" 
        size={30}
      />
      <AddComponentScreen modalVisible={modalVisible} setModalVisible={setModalVisible} />
    
    </View>
  );
}

const ComponentScreen = (props: any) => (
  <ComponentsProvider>
    <ComponentsScreenView {...props} />
  </ComponentsProvider>
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

export default ComponentScreen;
