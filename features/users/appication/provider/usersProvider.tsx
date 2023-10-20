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

  //acciones que tendra mi context
  getUsers: () => void;
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
}

//definir los tipos de acciones que podra ejecutar el context / providers
type UsersActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Data"; payload: UsersResult };

//inicializar el state
const initialState: UsersState = {
  loading: false,
  users: [],
};

//definición del reducer
//se encargara de manipular el state con base en
//las acciones y datos recibidos (payload)
function usersReducer(state: UsersState, action: UsersActionType) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Data":
      return {
        ...state,
        users: action.payload.users,
        loading: false,

        //otras manipulaciones de estado
      };

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

  //retornar la estructura del provider
  return (
    <UsersContext.Provider
      value={{
        ...state,
        getUsers,
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
