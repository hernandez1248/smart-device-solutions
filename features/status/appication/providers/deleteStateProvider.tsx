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
  deleteState: (onDeleted: Function)=> void,
  setState:(state: State) => void,
}

//crear el objeto context de react
const DeleteStateContext = createContext({} as ContextDefinition);

interface DeleteStateState {
  
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  state: State,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type DeleteStateActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Success"; payload: { 
      success: boolean, 
      state?: State,
      message: string,
    } }
  | { type: "Set State"; payload: State }
  | { type: "Set Message"; payload: string | null }
  | { type: "Set Errors"; payload: {
      message: string,
      errors: any,
  } };

//inicializar el states
const initialState: DeleteStateState = {
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

function DeleteStateReducer(
  states: DeleteStateState, 
  action: DeleteStateActionType
) {
  switch (action.type) {
    case "Set Message":
      return { 
        ...states, 
        message: action.payload };
    case "Set Loading":
      return { ...states, loading: action.payload };
    case "Set Saving":
      return {
        ...states,
        saving: action.payload,
      }
    case "Set State":
      return {
        ...states,
        state: action.payload,
      }
    case "Set Errors":
      return {
        ...states,
        errors: action.payload.errors || {},
        message: action.payload.message,
        saving: false,
      }
      case "Set Success":
      return {
        ...states,
        success: action.payload.success,
        message: action.payload.message,
        errors: {},
        saving: false,
        //state: action.payload.state || states.state,
      }
    default:
      return states;
  }
};

type Props = {
  children?: ReactNode;
};

const DeleteStateProvider:FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(DeleteStateReducer, initialState);

  function setStateProp(property: string, value: any) {
    // mandar el valor al estado state
    dispatch({
      type: 'Set State',
      payload: {
        ...states.state,
        [property]: value,
      }
    });
  }
  

  async function deleteState(onDeleted: Function) {
    const StatesRepository = new StatesRepositoryImp(
      new StatesDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });
    onDeleted(null)
    
    const result = await StatesRepository.deleteState(states.state);
    if(result.state) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          state: result.state,
          message: result.message,
        }
      });
      
      

      onDeleted(states.state);

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

  function setState(state:State){
    
    dispatch({
      type: 'Set State',
      payload: state
    });
  }

  return (
    <DeleteStateContext.Provider value={{
        ...states,
        
        //funciones
        setStateProp,
        deleteState,
        setState,
      }}
    >
      {children}
    </DeleteStateContext.Provider>
  );
}

function useDeleteStateState() {
  const context = useContext(DeleteStateContext);
  if (context === undefined) {
    throw new Error("useDeleteStateState debe ser usado " + " con un DeleteStateProvider");
  }
  return context;
}

export { DeleteStateProvider, useDeleteStateState };


