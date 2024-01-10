import React, { useEffect, useState } from "react";
import { View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { AddComponentProvider, useAddComponentState } from "../../providers/addComponentProvider";
// import { useDevicesState } from "../../../../devices/appication/providers/devicesProvider";
import RNPickerSelect from 'react-native-picker-select';
import { DevicesProvider, useDevicesState } from "../../../../devices/appication/providers/devicesProvider";

interface AddComponentViewProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSaved: Function;
}

const AddComponentView: React.FC<AddComponentViewProps> = ({
  modalVisible,
  setModalVisible,
  onSaved,
}) => {

  const {
    message,
    loading,
    saving,
    success,
    component,
    errors,

    setComponentProp,
    saveComponent
  } = useAddComponentState();


  const { devices, getDevices } = useDevicesState();

  useEffect(() => {
    getDevices();
  }, []);

  const handleSaveComponent = () => {
    saveComponent(() => {
      setModalVisible(false); // Cierra el modal primero


      // Retrasa la aparición de la alerta
      setTimeout(() => {
        Alert.alert('Componente Registrado', 'El Componente se ha registrado correctamente', [
          { text: 'OK', onPress: () => { } },
        ]);
      }, 500); // Puedes ajustar el tiempo de retardo según tus necesidades

      onSaved()
    })
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Registrar Componente</Text>
            <View>
              {/* <Text style={success ? styles.success : styles.alert}>{message}</Text> */}

              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={[styles.textInput, (errors?.name ? styles.textError : null)]}
                placeholder=" Ingresa el nombre"
                value={component?.name || ""}
                onChangeText={(text) => {
                  setComponentProp("name", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.label}>Imagen:</Text>
              <TextInput
                style={[styles.textInput, (errors?.image ? styles.textError : null)]}
                placeholder=" Ingresa la URL de la imagen"
                value={component?.image || ""}
                onChangeText={(text) => {
                  setComponentProp("image", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.image ? (
                <Text style={styles.textError}>{errors.image}</Text>
              ) : null }
            </View>

            <View>
              <Text style={styles.label}>Precio:</Text>
              <TextInput
                style={[styles.textInput, (errors?.price ? styles.textError : null)]}
                placeholder=" Ingresa el precio"
                value={component?.price?.toString() || ""}
                onChangeText={(text) => {
                  setComponentProp("price", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.price ? (
                <Text style={styles.textError}>{errors.price}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.label}>Cantidad:</Text>
              <TextInput
                style={[styles.textInput, (errors?.stock ? styles.textError : null)]}
                placeholder=" Ingresa el stock actual"
                value={component.stock?.toString() || ""}
                onChangeText={(text) => {
                  setComponentProp("stock", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.stock ? (
                <Text style={styles.textError}>{errors.stock}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.label}>Dispositivo al que pertenece:</Text>
              <RNPickerSelect
                onValueChange={(value) => setComponentProp("deviceId", value)}
                items={[
                  ...(devices && devices.length > 0
                    ? devices.map((device) => ({
                        label: device.brand+' '+device.model,
                        value: device.id,
                      }))
                    : []),
                ]}
                style={{
                  inputIOS: styles.textInput,
                  inputAndroid: styles.textInput,
                }}
                value={component?.deviceId}
                placeholder={{
                  label: 'Elige un dispositivo',
                  value: null,
                }}
              />
              {errors?.deviceId ? <Text style={styles.textError}>{errors.deviceId}</Text> : null}
            </View>

            <View style={styles.buttonsContainer}>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonSaving]}
                onPress={handleSaveComponent}
              >
                <Text style={styles.textStyle}>Registrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AddComponent = (props: any) => (
  <AddComponentProvider>
    <DevicesProvider>
      <AddComponentView {...props} />
    </DevicesProvider>
  </AddComponentProvider>
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
    borderRadius: 5,
    borderWidth: .5,
    height: 35,
    borderColor: "gray",
    // color: "gray",
    paddingHorizontal: 10
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
    backgroundColor: 'green',
    color: '#fff'
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

export default AddComponent;
