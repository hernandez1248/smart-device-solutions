import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import OrdersRepositoryImp from "../../infraestructure/repositories/ordersRepositoryImp";
import OrdersDatasourceImp from "../../infraestructure/datasources/ordersDatasourceImp";
import Order from "../../domain/entities/order";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null, 
  order: Order,
  errors: any,

  // acciones que tendrá mi context
  setOrderProp: (property: string, value: any) => void,
  saveOrder: (onSaved: Function)=> void,
}
//crear el objeto context de react
const AddOrderContext = createContext({} as ContextDefinition);

interface AddOrderState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  order: Order,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type AddOrderActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | { type: "Set Success"; payload: { 
      success: boolean, 
      order?: Order,
      message: string,
    } }
  | { type: "Set Order"; payload: Order }
  | { type: "Set Message"; payload: string | null }
  | { type: "Set Errors"; payload: {
      message: string,
      errors: any,
  } };

//inicializar el state
const initialState: AddOrderState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  order: new Order(
    '', '', '', '', '', []
    ),
    errors: {},
};

function AddOrderReducer(
  state: AddOrderState, 
  action: AddOrderActionType
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
    case "Set Order":
      return {
        ...state,
        order: action.payload,
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
        //order: action.payload.order || state.order,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const AddOrderProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AddOrderReducer, initialState);

  function setOrderProp(property: string, value: any) {
    // mandar el valor al estado order
    dispatch({
      type: 'Set Order',
      payload: {
        ...state.order,
        [property]: value,
      }
    });
  }

  async function saveOrder(onSaved: Function) {
    const orderRepository = new OrdersRepositoryImp(
      new OrdersDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });
    
    const result = await orderRepository.addOrder(state.order);
    if(result.order) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          order: result.order,
          message: result.message,
        }
      });
      
      if (onSaved) {
        onSaved(false);
      }
      console.log("//////////////////////////////////////////////////////////////////////////");
      
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
    <AddOrderContext.Provider value={{
        ...state,
        
        //funciones
        setOrderProp,
        saveOrder,
      }}
    >
      {children}
    </AddOrderContext.Provider>
  );
}

function useAddOrderState() {
  const context = useContext(AddOrderContext);
  if (context === undefined) {
    throw new Error("useAddOrderState debe ser usado " + " con un AddOrderProvider");
  }
  return context;
}

export { AddOrderProvider, useAddOrderState };


