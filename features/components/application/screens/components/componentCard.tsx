import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import Component from '../../../domain/entities/component';
import { FontAwesome5 } from '@expo/vector-icons';

type CardProps = {
  component: Component,
  onEdit?: Function,
  onDelete?: Function,
  onView?: Function,
};

const ComponentCard: React.FC<CardProps> = ({
  component,
  onEdit,
  onDelete,
  onView,

}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  // const [componentToEdit, setComponentToEdit] = useState<Component | null>;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    // setComponentToEdit(component);
    // setModalUpdateVisible(true);

    // setMenuVisible(!menuVisible);
    toggleMenu();
    if(onEdit){
      onEdit(component);
    }
  };

  const handleView = () => {
    /*  setUserToEdit(user)
     setModalUpdateVisible(true); */
     
     toggleMenu();
     if (onView) {
       onView(component);
     }
   };
 

  const handleDelete = () => {
    if(onDelete){      
       onDelete(component);
    }
  }


  return (
    <View>
      <View style={styles.row}>
        <View style={{ borderRadius: 15, overflow: 'hidden' }}>
          <Image
            source={{ uri: `${component.image}` }}
            style={{ width: 35, height: 35 }}
          />
        </View>
        <Text style={styles.column}>
          {component.name}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          
          ${component.price}
        </Text>
        <Text style={styles.column3}>
          {parseInt(component.stock)} 
        </Text>
        {/* <View style={styles.actions}>
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
        </View> */}
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
                handleView();
              }}
            >
              <View style={styles.menuView}>
                <FontAwesome5 name="eye" style={[styles.menuIcon, { color: 'green' }]} />
                <Text style={styles.menuText}>Ver</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleEdit}
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
                handleDelete();
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
}

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
    marginLeft: 50, // Ajusta el espacio entre columnas aquí
    marginTop: 12
  },
  column3: {
    flex: 1,
    fontSize: 14,
    marginRight: 10, // Ajusta el espacio entre columnas aquí
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
});

export default ComponentCard;
