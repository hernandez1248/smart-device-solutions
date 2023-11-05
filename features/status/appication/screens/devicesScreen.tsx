import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import StateCard from './components/stateCard';
import { StatesProvider, useStatesState } from '../providers/statesProvider';
import AddStateView from './components/addState';
import StateEditScreen from './components/stateEditModal';
import StateDeleteScreen from './components/deleteState';

function StatesScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  
  const { 
    states, 
    loading,
    stateSelected,
    stateSelectedDelete,

    //actions
    getStates,
    setStateSelected,
    setStateDelected,
    onUpdatedState,
    onSavedState,
    onDeleteState
  } = useStatesState();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los usuarios aquí
  };

  useEffect(() => {
    getStates();
  }, []);

  const renderCards = () => {
    if (states == null) {
      return null;
    }

    const filteredStates = states.filter(
      (state) =>
        `${state.status}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredStates.map((state) => <StateCard key={state.id} state={state} onEdit={setStateSelected} onDelete={setStateDelected}/>);
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
      <AddStateView modalVisible={modalVisible} setModalVisible={setModalVisible} onSaved = {onSavedState} />

      {!!stateSelected ? (
      <StateEditScreen stateEdit={stateSelected} modalVisible={!!stateSelected} onSaved={onUpdatedState} onCancelEdit={setStateSelected} />
      ) : null}


       {!!stateSelectedDelete ? (
      <StateDeleteScreen stateDelete={stateSelectedDelete} modalVisible={!!stateSelectedDelete} onDeleted={onDeleteState} onCancelDelete={setStateDelected}/>

      ) : null}

       </View>
  );
}

const StateScreen = (props: any) => (
  <StatesProvider>
    <StatesScreenView {...props} />
  </StatesProvider>
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

export default StateScreen;
