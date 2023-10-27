import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import User from '../../../domain/entities/user';
import { FontAwesome5 } from '@expo/vector-icons';

type CardProps = {
  user: User;
};

const UserCard: React.FC<CardProps> = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {props.user.name} {props.user.lastName}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {props.user.rol}
        </Text>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome5 name="ellipsis-h" style={styles.menuButton} />
        </TouchableOpacity>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              // Acción al presionar "Ver"
              toggleMenu();
            }}
          >
            <View style={styles.menuView}>
              <FontAwesome5 name="eye" style={[styles.menuIcon, { color: 'green' }]} />
              <Text style={styles.menuText}>Ver</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              // Acción al presionar "Editar"
              toggleMenu();
            }}
          >
            <View style={styles.menuView}>
              <FontAwesome5 name="edit" style={[styles.menuIcon, { color: 'blue' }]} />
              <Text style={styles.menuText}>Editar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              // Acción al presionar "Eliminar"
              toggleMenu();
            }}
          >
            <View style={styles.menuView}>
              <FontAwesome5 name="trash" style={[styles.menuIcon, { color: 'red' }]} />
              <Text style={styles.menuText}>Eliminar</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.horizontalLine} />
    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  column: {
    flex: 1,
    fontSize: 14,
    marginTop: 12
  },
  column2: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 12
  },
  header: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  menuButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  menu: {
    backgroundColor: 'white',
    elevation: 5,
    position: 'absolute',
    top: 35,
    right: 25,
    zIndex: 1,
    borderRadius: 10
  },
  menuItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  menuView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 10,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});

export default UserCard;
