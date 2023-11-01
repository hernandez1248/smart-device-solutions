import React, { useState } from "react";
import { View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert, ScrollView } from "react-native";
import { AddOrderProvider, useAddOrderState } from "../../providers/addOrdersProvider";

interface AddOrderViewProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
interface OrderDetail {
  componentsId: number;
  quantityComponent: number;
}

const AddOrderView: React.FC<AddOrderViewProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const {
    message,
    loading,
    saving,
    success,
    order,
    errors,

    setOrderProp,
    saveOrder,
  } = useAddOrderState();

  const [detalles, setOrderDetails] = useState<OrderDetail[]>([]);

  const addOrderDetail = () => {
    // Aquí puedes crear un objeto que represente un detalle de la orden
    // Por ejemplo:
    const newOrderDetail = {
      componentsId: 0, // Agrega los campos que necesites para los detalles
      quantityComponent: 0,
    };

    setOrderDetails([...detalles, newOrderDetail]);
  };

  /*
    const updateOrderDetail = (index: number, property: string, value: any) => {
      // Actualiza el estado del detalle de la orden
      const updatedOrderDetails = [...detalles];
      updatedOrderDetails[index] = {
        ...updatedOrderDetails[index],
        [property]: value,
      };
      setOrderDetails(updatedOrderDetails);
    };*/
  const updateOrderDetail = (index: number, property: string, value: any) => {
    // Actualiza el estado del detalle de la orden en el objeto `order`
    const updatedOrder = { ...order, detalles };
    updatedOrder.detalles[index] = {
      ...updatedOrder.detalles[index],
      [property]: value,
    };
    setOrderProp("detalles", updatedOrder.detalles);
  };



  const handleSaveOrder = () => {
    console.log(detalles);
    console.log(order);

    // Combina los detalles con la orden principal
    // const orderWithDetails = { ...order, detalles };
    console.log("////////////////////////////");
    //console.log(orderWithDetails);

    saveOrder(() => {
    });


    setModalVisible(false); // Cierra el modal primero

    // Retrasa la aparición de la alerta
    setTimeout(() => {
      Alert.alert('Orden Registrada', 'La orden se ha registrado correctamente.', [
        { text: 'OK', onPress: () => { } },
      ]);
    }, 500); // Puedes ajustar el tiempo de retardo según tus necesidades
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
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Registrar Orden</Text>
              <View>
                <Text style={styles.label}>Nombre del cliente:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.fullName ? styles.textError : null)]}
                  placeholder="Ingresa el nombre completo"
                  value={order?.fullName || ""}
                  onChangeText={(text) => {
                    setOrderProp("fullName", text);
                  }}
                  textContentType="name"
                ></TextInput>
                {errors?.fullName ? (
                  <Text style={styles.textError}>{errors.fullName}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>Telefono:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.phone ? styles.textError : null)]}
                  placeholder="Ingresa el numero de telefono"
                  value={order?.phone || ""}
                  onChangeText={(text) => {
                    setOrderProp("phone", text);
                  }}
                  textContentType="telephoneNumber"
                ></TextInput>
                {errors?.phone ? (
                  <Text style={styles.textError}>{errors.phone}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>Tipo de servicio:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.servicesId ? styles.textError : null)]}
                  placeholder="Ingresa el tipo de servicio"
                  value={order?.servicesId?.toString() || undefined}
                  onChangeText={(text) => {
                    setOrderProp("servicesId", text);
                  }}
                  textContentType="creditCardNumber"
                ></TextInput>
                {errors?.servicesId ? (
                  <Text style={styles.textError}>{errors.servicesId}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>Dispositivo que se le dara servicio:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.deviceId ? styles.textError : null)]}
                  placeholder="Selecciona el dispositivo"
                  value={order?.deviceId?.toString() || undefined}
                  onChangeText={(text) => {
                    setOrderProp("deviceId", text);
                  }}
                  textContentType="creditCardNumber"
                />
                {errors?.deviceId ? (
                  <Text style={styles.textError}>{errors.deviceId}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>Color:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.color ? styles.textError : null)]}
                  placeholder="Ingresa el color del dispositivo"
                  value={order?.color || ""}
                  onChangeText={(text) => {
                    setOrderProp("color", text);
                  }}
                  textContentType="name"
                />
                {errors?.color ? (
                  <Text style={styles.textError}>{errors.color}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>Observaciones:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.observations ? styles.textError : null)]}
                  placeholder="Ingresa las observaciones"
                  value={order?.observations || ""}
                  onChangeText={(text) => {
                    setOrderProp("observations", text);
                  }}
                  textContentType="name"
                />
                {errors?.observations ? (
                  <Text style={styles.textError}>{errors.observations}</Text>
                ) : null}
              </View>

              <View>
                <Text style={styles.label}>Usuario encargado de generar la orden:</Text>
                <TextInput
                  style={[styles.textInput, (errors?.userId ? styles.textError : null)]}
                  placeholder="Ingresa el usuario encargado"
                  value={order?.userId?.toString() || undefined}
                  onChangeText={(text) => {
                    setOrderProp("userId", text);
                  }}
                  textContentType="name"
                />
                {errors?.userId ? (
                  <Text style={styles.textError}>{errors.userId}</Text>
                ) : null}
              </View>

              <View>

                <Text style={styles.label}>Detalles de la orden:</Text>

                <Pressable
                  style={styles.buttonDetails}
                  onPress={addOrderDetail}
                >
                  <Text style={styles.textStyleDetails}>Agregar detalle de orden</Text>
                </Pressable>

                {detalles.map((detalle, index) => (
                  <View key={index} style={{ marginTop: 10, marginBottom: 10 }}>
                    {/*<Text style={styles.label}>Componente:</Text>*/}
                    <Text style={styles.label}>Componente: {index+1}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ingresa el nombre del componente"
                      value={detalle.componentsId?.toString() || undefined}
                      onChangeText={(text) => {
                        /*Actualiza el estado del detalle de la orden
                        const updatedOrderDetails = [...detalles];
                        //updatedOrderDetails[index].componentsId = text;//IMPORTANTE
                        setOrderDetails(updatedOrderDetails);
                        */
                        updateOrderDetail(index, "componentsId", text);
                      }}
                    />
                    {/*errors?.componentsId ? (
        <Text style={styles.textError}>{errors.componentsId}</Text>
      ) : null */}

                    {/*<Text style={styles.label}>Cantidad:</Text>*/}
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ingresa la cantidad requerida"
                      value={detalle.quantityComponent?.toString() || undefined}
                      onChangeText={(text) => {
                        /* Actualiza el estado del detalle de la orden
                        const updatedOrderDetails = [...detalles];
                        //updatedOrderDetails[index].quantityComponent = text;
                        setOrderDetails(updatedOrderDetails);*/
                        updateOrderDetail(index, "quantityComponent", text);
                      }}
                    />
                    {/*errors?.componentsId ? (
        <Text style={styles.textError}>{errors.componentsId}</Text>
      ) : null */}
                  </View>
                ))}
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
                  onPress={handleSaveOrder}
                >
                  <Text style={styles.textStyle}>Registrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

      </Modal>
    </View>
  );
};

const AddOrderScreen = (props: any) => (
  <AddOrderProvider>
    <AddOrderView {...props} />
  </AddOrderProvider>
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
  buttonDetails: {
    //flex: 1, // Esto hará que ambos botones tengan el mismo ancho
    //borderRadius: 20,
    //padding: 10,

    backgroundColor: 'green',
    elevation: 1,
    marginHorizontal: 2, // Espacio entre los botones
  },
  textStyleDetails: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddOrderScreen;