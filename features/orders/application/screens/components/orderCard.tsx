import { StyleSheet, Text, View, Image } from 'react-native';
import Order from "../../../domain/entities/order";
import { IconButton } from 'react-native-paper';

type CardProps ={
    order: Order
}

export default function OrderCard(props : CardProps) {
      
  console.log(props.order.id);
  
    return (
      <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {props.order.fullName}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          Celular
        </Text>
        <Text style={[styles.column3, styles.boldText]}>
          Reparación
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
    )
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
    marginTop: 12,
    marginLeft: -10
  },
  column2: {
    flex: 1,
    fontSize: 14,
    marginTop: 12
  },
  column3: {
    flex: 1,
    fontSize: 14,
    marginRight: -10, 
    marginTop: 12
  },
  actions: {
    flexDirection: 'row',
    marginRight: -20,
    marginLeft: 10
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
    marginVertical: 10,
  },
  });  