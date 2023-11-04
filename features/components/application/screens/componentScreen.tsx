import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import ComponentCard from './components/componentCard';
import { ComponentsProvider, useComponentsState } from '../providers/componentsProvider';
import AddComponent from './components/addComponent';
import EditComponent from './components/editComponent';

function ComponentsScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const {
    loading,
    components,
    componentSelected,

    getComponents,
    setComponentSelected,
    onUpdateComponent,
  } = useComponentsState();

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
        onEdit={setComponentSelected}
      />)
    );
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
      <AppBar title="Componentes" color="#0559B7" tintColor="white" centerTitle={true} />
      <Searchbar
        placeholder="Buscar componentes"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      <View >
        {/* <View style={styles.horizontalLine} /> */}
      <View style={styles.row}>
        <Text style={[styles.column, styles.boldText]}>
          Componente 
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          Precio
        </Text>
        <Text style={[styles.column3, styles.boldText]}>
          Cantidad
        </Text>
      </View>
      {/* <View style={styles.horizontalLine}/> */}
      </View>
      
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
      <AddComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />
      
      {!!componentSelected ? (
        <EditComponent 
          componentEdit={componentSelected}
          modalVisible={!!componentSelected}
          onSaved={onUpdateComponent}
          onCancelEdit={setComponentSelected}
        />
      ) : null }

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 49,
    backgroundColor: '#e6e6fa',
    // color: '#fff'
  },
  column: {
    flex: 1,
    marginLeft: 22,
    fontSize: 14,
    marginTop: 12
  },
  column2: {
    flex: 1,
    fontSize: 14,
    marginLeft: 47, // Ajusta el espacio entre columnas aquí
    marginTop: 12
  },
  column3: {
    flex: 1,
    fontSize: 14,
    marginRight: 57, // Ajusta el espacio entre columnas aquí
    marginTop: 12
  },
  boldText: {
    fontWeight: 'bold',
    color: '#696969',
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
  horizontalLine: {
    borderBottomColor: '#b0c4de',
    borderBottomWidth: 1,
    marginVertical: 8,
    marginTop: 20,
  },

});

export default ComponentScreen;
