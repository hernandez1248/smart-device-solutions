import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import User from "../../domain/entities/user";
import UsersRepositoryImp from "../../infraestructure/repositories/usersRepositoryImp";
import UsersDatasourceImp from "../../infraestructure/datasources/usersDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null, 
  user: User,
  errors: any,

  // acciones que tendrá mi context
  setUserProp: (property: string, value: any) => void,
  saveUser: (onSaved: Function)=> void,
}

//crear el objeto context de react
const AddUserContext = createContext({} as ContextDefinition);

interface AddUserState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  user: User,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type AddUserActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Success"; payload: { 
      success: boolean, 
      user?: User,
      message: string,
    } }
  | { type: "Set User"; payload: User }
  | { type: "Set Message"; payload: string | null }
  | { type: "Set Errors"; payload: {
      message: string,
      errors: any,
  } };

//inicializar el state
const initialState: AddUserState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  user: new User(
    '', 
    '', 
    '', 
    '',
    '',
    undefined,
    ''
    ),
    errors: {},
};

function AddUserReducer(
  state: AddUserState, 
  action: AddUserActionType
) {
  switch (action.type) {
    //manipular el estado con base a las acciones
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
    case "Set User":
      return {
        ...state,
        user: action.payload,
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
        //user: action.payload.user || state.user,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const AddUserProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AddUserReducer, initialState);

  function setUserProp(property: string, value: any) {
    // mandar el valor al estado user
    dispatch({
      type: 'Set User',
      payload: {
        ...state.user,
        [property]: value,
      }
    });
  }

  async function saveUser(onSaved: Function) {
    const usersRepository = new UsersRepositoryImp(
      new UsersDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });
    
    const result = await usersRepository.addUser(state.user);
    if(result.user) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          user: result.user,
          message: result.message,
        }
      });
      if (onSaved) {
        onSaved(false);
      }
      console.log(result);


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

  return (
    <AddUserContext.Provider value={{
        ...state,
        
        //funciones
        setUserProp,
        saveUser,
      }}
    >
      {children}
    </AddUserContext.Provider>
  );
}

function useAddUserState() {
  const context = useContext(AddUserContext);
  if (context === undefined) {
    throw new Error("useAddUserState debe ser usado " + " con un AddUserProvider");
  }
  return context;
}

export { AddUserProvider, useAddUserState };


