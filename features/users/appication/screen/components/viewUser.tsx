import React, { useEffect } from "react";
import { View, ScrollView, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import User from "../../../domain/entities/user";
import { EditUserProvider, useEditUserState } from "../../provider/editUsersProvider";

interface UserEditViewProps {
  userEdit: User,
  onSaved: Function,
  modalVisible: boolean;
  onCancelEdit: Function,
}

const UserEditView: React.FC<UserEditViewProps> = ({
  userEdit,
  onSaved,
  modalVisible,
  onCancelEdit,
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
    setUser,
  } = useEditUserState();

  // al recibir el usuario a editar, pasarlo al proveedor de estado
  useEffect(() => {
    setUser(userEdit)
  }, [userEdit]);

  return (
    <ScrollView >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          onCancelEdit(null);
        }}
      >
        <ScrollView style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            <Text style={styles.title}>Ver Usuario</Text>
            <View>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                selectTextOnFocus={false}
                style={[styles.textInput, (errors?.name ? styles.textError : null)]}
                placeholder=" Ingresa el nombre"
                value={user?.name || ""} 
                onChangeText={(text) => {
                  setUserProp("name", text);
                }}
                textContentType="name"
              />
              {errors?.name ? (
                <Text style={styles.textError}>{errors.name}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Apellido:</Text>
              <TextInput
                selectTextOnFocus={false}
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
                selectTextOnFocus={false}
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
              <Text style={styles.label}>Imagen:</Text>
              <TextInput
                selectTextOnFocus={false}
                style={[styles.textInput, (errors?.image ? styles.textError : null)]}
                placeholder=" Ingresa la URL de la imagen"
                value={user?.image || ""}
                onChangeText={(text) => {
                  setUserProp("image", text);
                }}
                textContentType="name"
              ></TextInput>
              {errors?.phone ? (
                <Text style={styles.textError}>{errors.image}</Text>
              ) : null }
            </View>
            <View>
              <Text style={styles.label}>Correo:</Text>
              <TextInput
                selectTextOnFocus={false}
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
              <Text style={styles.label}>Rol:</Text>
              <TextInput
                selectTextOnFocus={false}
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
                onPress={() => {
                  onCancelEdit(null);
                }}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const UserViewScreen = (props: UserEditViewProps) => (
  <EditUserProvider>
    <UserEditView {...props} />
  </EditUserProvider>
);

const { width } = Dimensions.get("window"); // Obtiene el ancho de la pantalla

const styles = StyleSheet.create({
  centeredView: {
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

export default UserViewScreen;