// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

// interface ComponentItem {
//   id: number;
//   name: string;
//   quantity: number;
// }

// const ComponentScreen: React.FC = () => {
//   const initialInventory: ComponentItem[] = [
//     { id: 1, name: 'Batería 67uy', quantity: 10 },
//     { id: 2, name: 'Pantalla LCD', quantity: 5 },
//     { id: 3, name: 'Cámara', quantity: 15 },
//   ];

//   const [inventory, setInventory] = useState<ComponentItem[]>(initialInventory);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//     const filteredInventory = initialInventory.filter((item) =>
//       item.name.toLowerCase().includes(text.toLowerCase())
//     );
//     setInventory(filteredInventory);
//   };

//   const renderItem = ({ item }: { item: ComponentItem }) => (
//     <View style={styles.item}>
//       <Text>{item.name}</Text>
//       <Text>Cantidad: {item.quantity}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Buscar componente"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />
//       <FlatList
//         data={inventory}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 16,
//   },
//   item: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
// });

// export default ComponentScreen;


// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import ComponentsRepositoryImp from '../../infraestructure/repositories/componentsRepositoryImp';
// import ComponentsDatasourceImp from '../../infraestructure/datasources/componentsDatasourceImp';
// import Component from '../../domain/entities/component';
// import ComponentCard from './components/componentCard';
// import { ComponentsProvider, useComponentsState } from '../providers/componentsProvider';

// function ComponentsScreenView() {
  
//   //Se consume el estado a traves del state
//   const {
//     components,
//     //actions
//     getComponents
//   } = useComponentsState();

//   const renderCards = () => {    
//     if (components == null){
//       return null;
//     }


//     return components?.map(
//       (component) => <ComponentCard key={component.id} component = {component} />//se quito el warning cuando se le proporciona la key
//       )
//   }

//   useEffect(() => {
//     getComponents();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Aqui se pintan los componentes para reparacion</Text>
//       <ScrollView contentContainerStyle={styles.containerScrollView}>
//       {renderCards()}
//       </ScrollView>
//     </View>
//   );
// }
// //envoltorio para usar el devices state provider
// const ComponentScreen = (props: any) => (
//   <ComponentsProvider>
//       <ComponentsScreenView {...props}/>
//   </ComponentsProvider>
// )

// export default ComponentScreen

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     //alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     paddingVertical: 70
//   },
//   containerScrollView: {
//     flexWrap: 'wrap', // Permite que las tarjetas se envuelvan a la siguiente fila
//     flexDirection: 'row',
//     justifyContent: 'space-between', 
//     padding: 4, // Espaciado interior para las tarjetas
    
//   }
// });

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import ComponentCard from './components/componentCard';
import { ComponentsProvider, useComponentsState } from '../providers/componentsProvider';

function ComponentsScreenView() {
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
      <ComponentCard key={component.id} component={component} />
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
        onPress={() => {
          // Acción al presionar el botón de agregar nuevo componente
          // Puedes abrir un modal, navegar a una nueva pantalla, etc.
        }}
        style={styles.addButton}
        iconColor="#ffffff" 
        size={30}
      />
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
