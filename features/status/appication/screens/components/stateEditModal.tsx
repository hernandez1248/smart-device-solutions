import React, { useState, useEffect } from "react";
import { Button, View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { EditStateProvider, useEditStateState } from "../../providers/editStatesProvider";
import State from "../../../domain/entities/state";

interface StateEditViewProps {
    stateEdit: State;
    onSaved: Function;
    modalVisible: boolean;
    //setModalVisible: (visible: boolean) => void;
    onCancelEdit: Function;
}

const StateEditView: React.FC<StateEditViewProps> = ({
    stateEdit,
    onSaved,
    modalVisible,
    //setModalVisible,
    onCancelEdit
}) => {

    const {
        message,
        loading,
        saving,
        success,
        state,
        errors,

        setStateProp,
        saveState,
        setState,
    } = useEditStateState();

    //al recibir el dispositivo, pasarlo al proveedor de estado


    useEffect(() => {
        setState(stateEdit)
    }, [stateEdit]);




    ////////////NUEVOS CAMBIOS    
    const handleSaveState = async () => {

        saveState(() => {
            // Retrasa la aparición de la alerta
            setTimeout(() => {
                Alert.alert('Estado Actualizado', 'El estado se actualizo correctamente', [
                    { text: 'OK', onPress: () => { } },
                ]);
            }, 500); // Puedes ajustar el tiempo de retardo según tus necesidades

            onSaved(state)
        })


    };



    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    onCancelEdit(null);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Editar Dispositivo</Text>
                        <View>
                            {/*<Text style={success ? styles.success : styles.alert}>{message}</Text>*/}

                            <Text style={styles.label}>Status:</Text>
                            <TextInput
                                style={[styles.textInput, (errors?.brand ? styles.textError : null)]}
                                placeholder=" Ingresa el status de la orden"
                                value={state?.status || ""}
                                onChangeText={(text) => {
                                    setStateProp("brand", text);
                                }}
                                textContentType="name"
                            ></TextInput>
                            {errors?.brand ? (
                                <Text style={styles.textError}>{errors.brand}</Text>
                            ) : null}
                        </View>
                        <View>
                            <Text style={styles.label}>Descripcion:</Text>
                            <TextInput
                                style={[styles.textInput, (errors?.model ? styles.textError : null)]}
                                placeholder=" Ingresa la descripcion de la orden"
                                value={state?.description || ""}
                                onChangeText={(text) => {
                                    setStateProp("model", text);
                                }}
                                textContentType="name"
                            ></TextInput>
                            {errors?.model ? (
                                <Text style={styles.textError}>{errors.model}</Text>
                            ) : null}
                        </View>


                        <View style={styles.buttonsContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonSaving]}
                                //onPress={() => saveState(onSaved)}
                                onPress={handleSaveState}
                            >
                                <Text style={styles.textStyle}>Guardar</Text>
                            </Pressable>


                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => onCancelEdit()}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>

    )
};

const StateEditScreen = (props: StateEditViewProps) => (
    <EditStateProvider>
        <StateEditView {...props} />
    </EditStateProvider>
)


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

export default StateEditScreen;
