import { FC, ReactNode, createContext, useReducer, useContext } from "react";
import User from "../../domain/entities/user";
import UsersRepositoryImp from "../../infraestructure/repositories/usersRepositoryImp";
import UsersDatasourceImp from "../../infraestructure/datasources/usersDatasourceImp";
import UsersResult from "../../domain/entities/usersResult";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  users: User[];
  userSelected: User | null,
  userView: User | null,
  userSelectedDelete: User | null;

  //acciones que tendra mi context
  getUsers: () => void;
  setUserSelected: (user: User | null) => void;
  setUserDelected: (user: User | null) => void;
  setUserView: (user: User | null) => void;
  onUpdatedUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

//crear el objeto context de react
const UsersContext = createContext({} as ContextDefinition);

//estructura  del state
//debe coincidir  con la estructura del context
//no lleva acciones
//el state representra los valores
interface UsersState {
  //definición del estado
  loading: boolean;
  users: User[];
  userSelected: User | null,
  userView: User | null,
  userSelectedDelete: User | null;
}

//definir los tipos de acciones que podra ejecutar el context / providers
type UsersActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Data"; payload: UsersResult }
  | { type: "Set User Selected"; payload: User | null }
  | { type: "Set User View"; payload: User | null }
  | {type: 'Set User Selected Deleted', payload: User | null};

//inicializar el state
const initialState: UsersState = {
  loading: false,
  users: [],
  userSelected: null,
  userSelectedDelete: null,
  userView: null,
};

//definición del reducer
//se encargara de manipular el state con base en
//las acciones y datos recibidos (payload)
function usersReducer(state: UsersState, action: UsersActionType) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Loading":
      return { 
        ...state, 
        loading: action.payload };
    case "Set Data":
      return {
        ...state,
        users: action.payload.users,
        loading: false,

        //otras manipulaciones de estado
      };
    case "Set User Selected": 
      return {
        ...state, 
        userSelected: action.payload,
      }
    case 'Set User View':
      return {
          ...state,
          userView: action.payload,
    }
    case 'Set User Selected Deleted':
      return {
          ...state,
          userSelectedDelete: action.payload,
      }
    default:
      return state;
  }
}

//implementar el proveedor de estado para users
type Props = {
  children?: ReactNode;
};

const UsersProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  //acciones
  const getUsers = async () => {
    const repository = new UsersRepositoryImp(new UsersDatasourceImp());

    //cambiar el state a loading
    dispatch({
      type: "Set Loading",
      payload: true,
    });

    //llamar al repositorio  y obtener el resultado
    const apiResult = await repository.getUsers();

    //mandar a establecer los datos en el estado
    dispatch({
      type: "Set Data",
      payload: apiResult,
    });
  };

  function setUserSelected (user: User | null) {
    console.log(user);
    
    dispatch({
      type: "Set User Selected",
      payload: user,
    });
  }

  function setUserView (user: User | null) {
    console.log(user);
    
    dispatch({
      type: "Set User View",
      payload: user,
    });
  }

  function setUserDelected (user: User | null) {
    console.log("usuario:", user);
    dispatch({
        type: 'Set User Selected Deleted',
        payload: user,
    });

  }

  /**
   * Actualiza el registro en la lista de users y cierra el modal de editar
   * @param user Usuario actualizado 
   */
  function onUpdatedUser (user: User) {
    // buscar el registro en users, y reemplazarlo
    // actualizar el estado users
    const usersClone = [...state.users];
    const index = usersClone.findIndex((item) => item.id == user.id);
    usersClone.splice(index, 1, user);

    dispatch({
      type: "Set Data",
      payload: {
        users: usersClone,
      }
    })

    // cerrar el modal 
    setUserSelected(null);
  }


  function onDeleteUser(user: User) {
    const usersCloneDelete = [...state.users];
    const index = usersCloneDelete.findIndex((item) => item.id === user.id);
  
    if (index !== -1) {
      usersCloneDelete.splice(index, 1);
      dispatch({
        type: 'Set Data',
        payload: {
          users: usersCloneDelete,
        },
      });
    }
    
    // Cierra el modal u realiza cualquier otra acción necesaria
    // (puedes manejar esto según tus necesidades)
    setUserSelected(null);
  }

  //retornar la estructura del provider
  return (
    <UsersContext.Provider
      value={{
        ...state,
        getUsers,
        setUserSelected,
        setUserDelected,
        onUpdatedUser,
        onDeleteUser,
        setUserView,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

//para usar el provider y el state
//lo ideal es generar una funcion hook

function useUsersState() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsersState debe ser usado " + " con un UsersProvider");
  }
  return context;
}

export { UsersProvider, useUsersState };
