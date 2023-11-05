import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import State from "../../domain/entities/state";
import StatesRepositoryImp from "../../infraestructure/repositories/statesRepositoryImp";
import StatesDatasourceImp from "../../infraestructure/datasources/statesDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  state: State,
  errors: any,

  // acciones que tendrá mi context
  setStateProp: (property: string, value: any) => void,
  saveState: (onSaved: Function) => void,
  setState: (state: State) => void,
}

//crear el objeto context de react
const EditStateContext = createContext({} as ContextDefinition);

interface EditStateState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  state: State,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type EditStateActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | {
    type: "Set Success"; payload: {
      success: boolean,
      state?: State,
      message: string,
    }
  }
  | { type: "Set State"; payload: State }
  | { type: "Set Message"; payload: string | null }
  | {
    type: "Set Errors"; payload: {
      message: string,
      errors: any,
    }
  };

//inicializar el state
const initialState: EditStateState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  state: new State(
    undefined,
    '',
    '',
    undefined,
    ''
  ),
  errors: {},
};

function EditStateReducer(
  state: EditStateState,
  action: EditStateActionType
) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Message":
      return {
        ...state,
        message: action.payload
      };
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      }
    case "Set State":
      return {
        ...state,
        state: action.payload,
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
        //state: action.payload.state || state.state,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const EditStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EditStateReducer, initialState);

  function setStateProp(property: string, value: any) {
    // mandar el valor al estado state
    dispatch({
      type: 'Set State',
      payload: {
        ...state.state,
        [property]: value,
      }
    });
  }


  async function saveState(onSaved: Function) {
    const StatesRepository = new StatesRepositoryImp(
      new StatesDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    console.log(state.state);


    const result = await StatesRepository.addState(state.state);
    if (result.state) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          state: result.state,
          message: result.message,
        }
      });

      onSaved(state.state);
      return;
    }

    let errors: any = {};

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

    /*test para cerrar al guardar//quitar de acá
    
onSaved(null);*/
  }

  function setState(state: State) {
    dispatch({
      type: 'Set State',
      payload: state
    })
  }

  return (
    <EditStateContext.Provider value={{
      ...state,

      //funciones
      setStateProp,
      saveState,
      setState,
    }}
    >
      {children}
    </EditStateContext.Provider>
  );
}

function useEditStateState() {
  const context = useContext(EditStateContext);
  if (context === undefined) {
    throw new Error("useEditStateState debe ser usado " + " con un EditStateProvider");
  }
  return context;
}

export { EditStateProvider, useEditStateState };


