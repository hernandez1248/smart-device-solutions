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
  saveUser: (onSaved: Function) => void,
  setUser: (user: User) => void,
}

//crear el objeto context de react
const EditUserContext = createContext({} as ContextDefinition);

interface EditUserState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  user: User,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type EditUserActionType =
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
const initialState: EditUserState = {
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
    '',
    undefined,
    ''
    ),
    errors: {},
};

function EditUserReducer(
  state: EditUserState, 
  action: EditUserActionType
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

const EditUserProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EditUserReducer, initialState);

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
      new UsersDatasourceImp()
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    console.log(state.user);
    
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
      
      // si ya se guardó, mandar a cerrar el modal
      onSaved(state.user);
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

    // test para cerrar al guardar
    onSaved(state.user)
  }

    function setUser(user: User) {
      dispatch({
        type: 'Set User',
        payload: user,
      });
    }

  return (
    <EditUserContext.Provider value={{
        ...state,
        
        //funciones
        setUserProp,
        saveUser,
        setUser, 
      }}
    >
      {children}
    </EditUserContext.Provider>
  );
}

function useEditUserState() {
  const context = useContext(EditUserContext);
  if (context === undefined) {
    throw new Error("useEditUserState debe ser usado " + " con un EditUserProvider");
  }
  return context;
}

export { EditUserProvider, useEditUserState };
