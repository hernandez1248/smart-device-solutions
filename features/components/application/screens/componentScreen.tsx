import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import ComponentCard from './components/componentCard';
import { ComponentsProvider, useComponentsState } from '../providers/componentsProvider';
import AddComponent from './components/addComponent';
import EditComponent from './components/editComponent';
import backendConfig from "../../../../config/backend/config";
import DeleteComponent from './components/deleteComponent';
import ViewComponent from './components/viewComponent';


// import * as Location from 'expo-location';
// import * as Contacts from 'expo-contacts';
// // import NetInfo from '@react-native-community/netinfo';


//   // Función para verificar la conexión a Internet
//   const obtenerDatosDesdeServidor = async () => {
//     try {
//       const response = await fetch(`${backendConfig.url}/api/components`);
//       const datos = await response.json();
//       console.log('Datos obtenidos:', datos);
//     } catch (error) {
//       console.error('Error al obtener datos:', error);
//     }
//   };


// async function obtenerUbicacion() {
//   let { status } = await Location.requestForegroundPermissionsAsync();
  
//   if (status === 'granted') {
//     let ubicacion = await Location.getCurrentPositionAsync({});
//     console.log('Ubicación:', ubicacion);
//     // Realizar acciones con la ubicación
//   } else {
//     console.log('Permiso de ubicación denegado');
//     // Realizar acciones cuando se deniega el permiso
//   }
// }
// // Función para obtener los contactos
// async function obtenerContactos() {
//   const { status } = await Contacts.requestPermissionsAsync();

//   if (status === 'granted') {
//     const { data } = await Contacts.getContactsAsync({});
//     console.log('Contactos:', data);
//     // Realizar acciones con la lista de contactos obtenida, como actualizar el estado del componente, etc.
//   } else {
//     console.log('Permiso de contactos denegado');
//     // Realizar acciones cuando se deniega el permiso
//   }
// }

function ComponentsScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const {
    loading,
    components,
    componentSelected,
    componentSelectedDelete, 
    // componentView,

    getComponents,
    setComponentSelected,
    setComponentDelected,
    // setComponentView,
    onUpdatedComponent,
    onSavedComponent,
    onDeleteComponent,
  } = useComponentsState();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los componentes aquí
  };

  useEffect(() => {
    getComponents();
    // obtenerUbicacion();
    // obtenerContactos();
    // obtenerDatosDesdeServidor();
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
        // onView={setComponentView}
        onDelete={setComponentDelected}
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
  
      <AddComponent 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        onSaved = {onSavedComponent}
      />

      {!!componentSelected ? (
        <EditComponent 
          componentEdit={componentSelected}
          modalVisible={!!componentSelected}
          onSaved={onUpdatedComponent}
          onCancelEdit={setComponentSelected}
        />
      ) : null }

      {!!componentSelectedDelete ? (
      <DeleteComponent 
        componentDelete={componentSelectedDelete} 
        modalVisible={!!componentSelectedDelete} 
        onDeleted={onDeleteComponent} 
        onCancelDelete={setComponentDelected}
      />
      ) : null}

      {/* {!!componentView ? (
        <ViewComponent
          componentEdit={componentView}
          modalVisible={!!componentView}
          onSaved={onUpdatedComponent}
          onCancelEdit={setComponentView}
        />
      ): null} */}
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
    marginRight: 50,
    fontSize: 14,
    marginTop: 12
  },
  column2: {
    flex: 1,
    fontSize: 14,
    marginLeft: 50, // Ajusta el espacio entre columnas aquí
    marginTop: 12
  },
  column3: {
    flex: 1,
    fontSize: 14,
    marginRight: 10, // Ajusta el espacio entre columnas aquí
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
