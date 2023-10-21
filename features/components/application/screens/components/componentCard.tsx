// import { StyleSheet, Text, View, Image } from 'react-native';
// import Component from "../../../domain/entities/component";

// type CardProps ={
//     component: Component
// }

// export default function ComponentCard(props : CardProps) {
      
//   console.log(props.component.name);
  
//     return (
//         <View style={styles.tarjeta}>
//             <Text style={styles.titulo} numberOfLines={2}>Nombre: {props.component.name}</Text>
//             <Text>precio: ${props.component.price}</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     tarjeta: {
//         backgroundColor: '#c4d4e9',
//         padding: 14,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 1,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         marginBottom: 10,
        
//     alignItems: 'center',
//       },
//   titulo: {
//     //fontSize: 15,
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     overflow: 'visible',
//     textAlign: 'center',
//     width: 120, // Ajusta el ancho de la imagen según la necesida
//   },
//   });  


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Component from '../../../domain/entities/component';

type CardProps = {
  component: Component;
};

export default function ComponentCard(props: CardProps) {

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {props.component.name}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          
          ${props.component.price}
        </Text>
        <Text style={styles.column3}>
          {Math.floor(props.component.stock)}
        </Text>
        <View style={styles.actions}>
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
});
