import { StyleSheet, Text, View,  } from 'react-native';
import Device from "../../../domain/entities/device";
import { IconButton } from 'react-native-paper';

type CardProps ={
    device: Device
}

export default function DeviceCard(props : CardProps) {
      
  console.log(props.device.model);
  
    return (
      <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {props.device.brand}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {props.device.model}
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
  marginLeft: 20, 
  marginTop: 12
},
column2: {
  flex: 1,
  fontSize: 14,
  marginTop: 12
},
actions: {
  flexDirection: 'row',
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

  