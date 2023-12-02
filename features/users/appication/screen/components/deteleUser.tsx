import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import {
  DeleteUserProvider,
  useDeleteUserState,
} from "../../provider/deleteUsersProvider";
import User from "../../../domain/entities/user";

interface UserDeleteViewProps {
  userDelete: User;
  onDeleted: Function;
  modalVisible: boolean;
  //setModalVisible: (visible: boolean) => void;
  onCancelDelete: Function;
}

const UserDeleteView: React.FC<UserDeleteViewProps> = ({
  userDelete,
  onDeleted,
  modalVisible,
  //setModalVisible,
  onCancelDelete,
}) => {
  const {
    message,
    loading,
    saving,
    success,
    user,
    errors,

    setUserProp,
    deleteUser,
    setUser,
  } = useDeleteUserState();

  //al recibir el dispositivo, pasarlo al proveedor de estado

  useEffect(() => {
    setUser(userDelete);
  }, [userDelete]);

  const confirm = () => {
    setUserProp("[]", userDelete);

    if (deleteUser) {
      deleteUser(() => {
        console.log("Confirmación exitosa");
        onCancelDelete(null);

        onDeleted(user);
      });
    }
    setTimeout(() => {
        Alert.alert('Usuario Eliminado', 'El usuario ha sido eliminado.', [
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
            <Text style={styles.title}>
              ¿Estás seguro de que deseas eliminar este usuario?
            </Text>

            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onCancelDelete()}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonSaving]}
                onPress={ confirm }
              >
                <Text style={styles.textStyle}>Sí</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const UserDeleteScreen = (props: UserDeleteViewProps) => (
  <DeleteUserProvider>
    <UserDeleteView {...props} />
  </DeleteUserProvider>
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
    borderWidth: 0.5,
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
    backgroundColor: "orange",
  },
  success: {
    backgroundColor: "green",
    color: "#fff",
  },
  textError: {
    color: "red",
  },
  button1: {
    marginTop: 50,
    width: 200,
    marginLeft: 50,
  },
});

export default UserDeleteScreen;
