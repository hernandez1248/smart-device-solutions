import { StyleSheet, Text, View,  } from 'react-native';
import State from "../../../domain/entities/state";
import { IconButton } from 'react-native-paper';

type CardProps ={
    state: State,
    onEdit?: Function,
    onDelete?: Function,
}

const StateCard: React.FC<CardProps>= ({state, onEdit, onDelete}) => {
      
  //console.log(state.model);

  const handleEdit = () => {
    if(onEdit){      
       onEdit(state);
    }
  }

  const handleDelete = () => {
    if(onDelete){      
       onDelete(state);
    }
  }
  
    return (
      <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {state.date}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {state.status}
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


export default StateCard;

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

  