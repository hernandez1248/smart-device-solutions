import React, { useState } from "react";
import { View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { AddUserProvider, useAddUserState } from "../../provider/addUsersProvider";

interface AddUserViewProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const AddUserView: React.FC<AddUserViewProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const {
    message,
    loading,
    saving,
    success,
    user,
    errors,

    setUserProp,
    saveUser,
  } = useAddUserState();

  const handleSaveUser = () => {
    saveUser(() => {
      setModalVisible(false); // Cierra el modal primero
  
      // Retrasa la aparición de la alerta
      setTimeout(() => {
        Alert.alert('Usuario Registrado', 'El usuario se ha registrado correctamente.', [
          { text: 'OK', onPress: () => {} },
        ]);
      }, 500); // Puedes ajustar el tiempo de retardo según tus necesidades
    });
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
            <Text style={styles.title}>Registrar Usuario</Text>
            <View>
              {/*<Text style={success ? styles.success : styles.alert}>{message}</Text>*/}

              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={[styles.textInput, (errors?.name ? styles.textError : null)]}
                placeholder=" Ingresa el nombre"
                value={user?.name || ""}
                onChangeText={(text) => {
                  setUserProp("name", text);
                }}
                textContentType="name"
              ></TextInput>
                {errors?.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Apellido:</Text>
              <TextInput
                style={[styles.textInput, (errors?.lastName ? styles.textError : null)]}
                placeholder=" Ingresa el apellido"
                value={user?.lastName || ""}
                onChangeText={(text) => {
                  setUserProp("lastName", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.lastName ? (
                <Text style={styles.textError}>{errors.lastName}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Teléfono:</Text>
              <TextInput
                style={[styles.textInput, (errors?.phone ? styles.textError : null)]}
                placeholder=" Ingresa el teléfono"
                value={user?.phone || ""}
                onChangeText={(text) => {
                  setUserProp("phone", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.phone ? (
                <Text style={styles.textError}>{errors.phone}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Correo:</Text>
              <TextInput
                style={[styles.textInput, (errors?.email ? styles.textError : null)]}
                placeholder=" Ingresa el correo"
                value={user?.email || ""}
                onChangeText={(text) => {
                  setUserProp("email", text);
                }}
                textContentType="emailAddress"
              />
              {errors?.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Contraseña:</Text>
              <TextInput
                style={[styles.textInput, (errors?.password ? styles.textError : null)]}
                placeholder=" Ingresa la contraseña"
                value={user?.password || ""}
                onChangeText={(text) => {
                  setUserProp("password", text);
                }}
                textContentType="name"
              />
              {errors?.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Rol:</Text>
              <TextInput
                style={[styles.textInput, (errors?.rol ? styles.textError : null)]}
                placeholder=" Ingresa el rol"
                value={user?.rol || ""}
                onChangeText={(text) => {
                  setUserProp("rol", text);
                }}
                textContentType="name"
              />
              {errors?.rol ? (
                <Text style={styles.textError}>{errors.rol}</Text>
              ) : null }
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
                onPress={handleSaveUser}
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

const AddUserScreen = (props: any) => (
  <AddUserProvider>
    <AddUserView {...props} />
  </AddUserProvider>
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

export default AddUserScreen;
