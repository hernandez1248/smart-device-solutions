import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, AppBar } from '@react-native-material/core';
import { Searchbar, IconButton } from 'react-native-paper';
import UserCard from './components/userCard';
import { UsersProvider, useUsersState } from '../provider/usersProvider';
import CustomModal from './components/addUser';

function UsersScreenView() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  
  const { 
    users, 
    loading,

    //actions
    getUsers 
  } = useUsersState();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los usuarios aquí
  };

  useEffect(() => {
    getUsers();
  }, []);

  const renderCards = () => {
    if (users == null) {
      return null;
    }

    const filteredUsers = users.filter(
      (user) =>
        `${user.name} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredUsers.map((user) => <UserCard key={user.id} user={user} />);
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
      <AppBar title="Usuarios registrados" color="#0559B7" tintColor="white" centerTitle={true} />
      <Searchbar
        placeholder="Buscar usuarios"
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
        icon="account-plus"
        onPress={showModal}
        style={styles.addButton}
        iconColor="#ffffff"
        size={30}
      />
      <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const UserScreen = (props: any) => (
  <UsersProvider>
    <UsersScreenView {...props} />
  </UsersProvider>
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

export default UserScreen;
