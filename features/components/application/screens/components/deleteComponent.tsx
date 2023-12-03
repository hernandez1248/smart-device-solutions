import React, { useEffect, useState } from "react";
import { View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';
import { DeleteComponentProvider, useDeleteComponentState } from "../../providers/deleteComponentProvider";
import Component from "../../../domain/entities/component";


interface DeleteComponentViewProps {
  componentDelete: Component,
  onDeleted: Function,
  modalVisible: boolean;
  onCancelDelete: Function;
}

const DeleteComponentView: React.FC<DeleteComponentViewProps> = ({
  componentDelete,
  onDeleted,
  modalVisible,
  onCancelDelete,
}) => {
    
  const {
    message,
    loading,
    saving,
    success,
    component,
    errors,

    
    setComponentProp,
    deleteComponent,
    setComponent,
  } = useDeleteComponentState();

  //al recibir el usuario a Deletear, pasarlo al proveedor de estado
  useEffect(() => {
    setComponent(componentDelete)
  }, [componentDelete]);

  const confirm = () => {
    setComponentProp('[]', componentDelete);
    if (deleteComponent) {
      deleteComponent(() => {
        console.log('Confirmación exitosa');
        onCancelDelete(null)

        onDeleted(component)
      });
    }
    setTimeout(() => {
      Alert.alert('Componente Eliminado', 'El Componente ha sido eliminado.', [
        { text: 'OK', onPress: () => {} },
      ]);
    }, 500);
  };

  return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                onCancelDelete(null);
            }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>¿Estás seguro de que deseas eliminar este componente?</Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onCancelDelete()}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSaving]}
                onPress={
                  confirm
                  /*() => {
                    deleteDevice(onDelete)
                  }*/
                }
              >
                <Text style={styles.textStyle}>Sí</Text>
              </Pressable>
            </View>
          </View>
        </View>
        </Modal>
    </View>

)
};

const DeleteComponent = (props: DeleteComponentViewProps) => (
  <DeleteComponentProvider>
    <DeleteComponentView {...props} />
  </DeleteComponentProvider>
);

const { width } = Dimensions.get("window"); // Obtiene el ancho de la pantalla

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInput: {
        borderWidth: .5,
        height: 35,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: width * 0.7, // Ajusta el ancho según tus necesidades
        marginTop: 20, // Espacio entre los botones y los campos de texto
    },
    button: {
        flex: 1, // Esto hará que ambos botones tengan el mismo ancho
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5, // Espacio entre los botones
    },
    buttonSaving: {
        backgroundColor: "#2196F3",
    },
    buttonClose: {
        backgroundColor: "#E60B26",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 5,
    },
    alert: {
        backgroundColor: 'orange',
    },
    success: {
        backgroundColor: 'green',
        color: '#fff'
    },
    textError: {
        color: 'red',
    },
    button1: {
        marginTop: 50,
        width: 200,
        marginLeft: 50,
    },
});

export default DeleteComponent;
