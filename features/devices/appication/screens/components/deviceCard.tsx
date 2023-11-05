import { StyleSheet, Text, View,  } from 'react-native';
import Device from "../../../domain/entities/device";
import { IconButton } from 'react-native-paper';

type CardProps ={
    device: Device,
    onEdit?: Function,
    onDelete?: Function,
}

const DeviceCard: React.FC<CardProps>= ({device, onEdit, onDelete}) => {
      
  //console.log(device.model);

  const handleEdit = () => {
    if(onEdit){      
       onEdit(device);
    }
  }

  const handleDelete = () => {
    if(onDelete){      
       onDelete(device);
    }
  }
  
    return (
      <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {device.brand}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {device.model}
        </Text>
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            iconColor='blue'
            size={20}
            onPress={
              handleEdit
            }
          />
          <IconButton
            icon="delete"
            iconColor="red"
            size={20}
            //onPress={() => { // Acción al presionar el botón de eliminar}}
            onPress={
              handleDelete
            }
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </View>

);
}


export default DeviceCard;

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

  