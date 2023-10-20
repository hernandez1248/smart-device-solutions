import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import User from '../../../domain/entities/user';

type CardProps = {
  user: User;
};

const UserCard: React.FC<CardProps> = (props) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {props.user.name} {props.user.lastName}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {props.user.rol}
        </Text>
        <View style={styles.actions}>
          <IconButton
            icon="eye"
            iconColor='green'
            size={20}
            onPress={() => {
              // Acción al presionar el botón de visualizar
            }}
          />
          <IconButton
            icon="pencil"
            iconColor='blue'
            size={20}
            onPress={() => {
              // Acción al presionar el botón de editar
            }}
          />
          <IconButton
            icon="delete"
            iconColor="red"
            size={20}
            onPress={() => {
              // Acción al presionar el botón de eliminar
            }}
          />
        </View>
      </View>
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
    marginLeft: 10, // Ajusta el espacio entre columnas aquí
    marginTop: 12
  },
  actions: {
    flexDirection: 'row',
    marginRight: -20, 
    marginLeft: -50, // Ajusta el espacio entre botones aquí
  },
  header: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});

export default UserCard;
