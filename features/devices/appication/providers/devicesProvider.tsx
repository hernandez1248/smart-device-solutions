import { FC, ReactNode, createContext, useReducer, useContext } from "react";
import Device from "../../domain/entities/device";
import DevicesRepositoryImp from "../../infraestructure/repositories/devicesRepositoryImp";
import DevicesDatasourceImp from "../../infraestructure/datasources/devicesDatasourceImp";
import DevicesResult from "../../domain/entities/devicesResult";

//definir la estructura que tendra mi context
interface ContextDefinition {
    //definicion del estado
    loading: boolean,
    devices: Device[],
    deviceSelected: Device | null;
    //acciones que tendra mi context
    getDevices: () => void;
    setDeviceSelected: (device: Device | null) => void;
    onUpdatedDevice: (device: Device) => void;
}

//crear el objeto context de react
const DevicesContext = createContext({} as ContextDefinition);
//estructura  del state
//debe coincidir  con la estructura del context
//no lleva acciones
//el state representra los valores

interface DevicesState {
    //definicion del estado
    loading: boolean;
    devices: Device[];
    deviceSelected: Device | null;
}

//definir los tipos de acciones que podra ejecutar el context / providers
type DevicesActionType =
    | { type: 'Set Loading', payload: boolean }
    | { type: 'Set Data', payload: DevicesResult }
    | { type: 'Set Device Selected', payload: Device | null }

//inicializar el state
const initialState: DevicesState = {
    loading: false,
    devices: [],
    deviceSelected: null

}
//definicion del reducer
//se encargara de manipular el state con base en
//las acciones y datos recibidos (payload)m
function devicesReducer(state: DevicesState, action: DevicesActionType) {
    switch (action.type) {
        //manipular el estado con base a las acciones
        case 'Set Loading':
            return { ...state, loading: action.payload }
        case 'Set Data':
            return {
                ...state,
                devices: action.payload.devices,
                loading: false,
                //otras manipulaciones de estado
            }
        case 'Set Device Selected':
            return {
                ...state,
                deviceSelected: action.payload,
            }

        default:
            return state;
    }
}

type Props = {
    children?: ReactNode
}

//implementar el proveedor de estado para devices
const DevicesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(devicesReducer, initialState);

    //acciones
    const getDevices = async () => {
        const repository = new DevicesRepositoryImp(
            new DevicesDatasourceImp()
        );

        //cambiar el state a loading
        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        //llamar al repositorio  y obtener el resultado
        const apiResult = await repository.getDevices();

        //mandar a establecer los datos en el estado
        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };
    function setDeviceSelected (device: Device | null){
        //console.log(device);
        
        dispatch({
            type: 'Set Device Selected',
            payload: device,
        });
    }

    /**
    *Actualiza el registro en la lista de devices y cierra el modal de editar
    * @param device Dispositivo actualizado4 
    */
    function onUpdatedDevice(device:Device){
        //buscar el registro en devices,y remplazarlo
        //actualizar el estado users
        const devicesClone = [...state.devices];
        const index = devicesClone.findIndex((item) => item.id == device.id);
        devicesClone.splice(index, 1, device);
        dispatch({
            type: 'Set Data',
            payload: {
                devices: devicesClone,
            }
        });



        //cierra el modal
        setDeviceSelected(null)
    }

    //retornar la estructura del provider
    return (
        <DevicesContext.Provider value={{
            ...state,
            getDevices,
            setDeviceSelected,
            onUpdatedDevice
        }}>
            {children}
        </DevicesContext.Provider>
    )
};

//para usar el provider y el state
//lo ideal es generar una funcion hook

function useDevicesState() {
    const context = useContext(DevicesContext);
    if (context === undefined) {
        throw new Error("useDevicesState debe ser usado " +
            " con un DevicesProvider");
    }
    return context;
}


export { DevicesProvider, useDevicesState }