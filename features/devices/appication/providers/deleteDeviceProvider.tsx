import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Device from "../../domain/entities/device";
import DevicesRepositoryImp from "../../infraestructure/repositories/devicesRepositoryImp";
import DevicesDatasourceImp from "../../infraestructure/datasources/devicesDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null, 
  device: Device,
  errors: any,

  // acciones que tendrá mi context
  setDeviceProp: (property: string, value: any) => void,
  deleteDevice: (onDeleted: Function)=> void,
  setDevice:(device: Device) => void,
}

//crear el objeto context de react
const DeleteDeviceContext = createContext({} as ContextDefinition);

interface DeleteDeviceState {
  
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  device: Device,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type DeleteDeviceActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Success"; payload: { 
      success: boolean, 
      device?: Device,
      message: string,
    } }
  | { type: "Set Device"; payload: Device }
  | { type: "Set Message"; payload: string | null }
  | { type: "Set Errors"; payload: {
      message: string,
      errors: any,
  } };

//inicializar el state
const initialState: DeleteDeviceState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  device: new Device(
    '',
    '',
    undefined,
    undefined
    ),
    errors: {},
};

function DeleteDeviceReducer(
  state: DeleteDeviceState, 
  action: DeleteDeviceActionType
) {
  switch (action.type) {
    case "Set Message":
      return { 
        ...state, 
        message: action.payload };
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      }
    case "Set Device":
      return {
        ...state,
        device: action.payload,
      }
    case "Set Errors":
      return {
        ...state,
        errors: action.payload.errors || {},
        message: action.payload.message,
        saving: false,
      }
      case "Set Success":
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        errors: {},
        saving: false,
        //device: action.payload.device || state.device,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const DeleteDeviceProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(DeleteDeviceReducer, initialState);

  function setDeviceProp(property: string, value: any) {
    // mandar el valor al estado device
    dispatch({
      type: 'Set Device',
      payload: {
        ...state.device,
        [property]: value,
      }
    });
  }
  

  async function deleteDevice(onDeleted: Function) {
    const DevicesRepository = new DevicesRepositoryImp(
      new DevicesDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });
    onDeleted(null)
    
    const result = await DevicesRepository.deleteDevice(state.device);
    if(result.device) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          device: result.device,
          message: result.message,
        }
      });
      
      

      onDeleted(state.device);

      return;
    }

    let errors : any = {};

    result.errors?.forEach((item) => {
      errors[item.field] = item.error;
    });

    dispatch({
      type: 'Set Errors',
      payload: {
        message: result.message,
        errors,
      },
    });
    
    
  }

  function setDevice(device:Device){
    
    dispatch({
      type: 'Set Device',
      payload: device
    });
  }

  return (
    <DeleteDeviceContext.Provider value={{
        ...state,
        
        //funciones
        setDeviceProp,
        deleteDevice,
        setDevice,
      }}
    >
      {children}
    </DeleteDeviceContext.Provider>
  );
}

function useDeleteDeviceState() {
  const context = useContext(DeleteDeviceContext);
  if (context === undefined) {
    throw new Error("useDeleteDeviceState debe ser usado " + " con un DeleteDeviceProvider");
  }
  return context;
}

export { DeleteDeviceProvider, useDeleteDeviceState };


