 import { FC, ReactNode, createContext, useReducer, useContext } from "react";
 import Order from "../../domain/entities/order";
 import OrdersRepositoryImp from "../../infraestructure/repositories/ordersRepositoryImp";
 import OrdersDatasourceImp from "../../infraestructure/datasources/ordersDatasourceImp";
import OrdersResult from "../../domain/entities/ordersResult";
 

 interface ContextDefinition {
     loading: boolean,
     orders: Order[],
     getOrders: () => void;
 }
 
 
 const OrdersContext = createContext({} as ContextDefinition);
 
 interface OrdersState {
     loading: boolean,
     orders: Order[],
 }
 
 
 type OrdersActionType = {type: 'Set Loading', payload: boolean} | {type: 'Set Data', payload: OrdersResult}
 
 
 const initialState : OrdersState = {
     loading: false,
     orders: []
 }
 
 function ordersReducer( state: OrdersState, action: OrdersActionType){
         switch (action.type) {
            
             case 'Set Loading':
                 return {...state, loading: action.payload}
             case 'Set Data':
                 return {
                     ...state,
                     orders: action.payload.orders,
                     loading: false,
                     
                 }
         
             default:
                 return state;
         }
     }
 
     type Props = {
         children?: ReactNode
     }
 
     
     const OrdersProvider: FC<Props> = ({children}) => {
         const [state, dispatch] = useReducer( ordersReducer, initialState );
         
         
         const getOrders = async () => {
             const repository = new OrdersRepositoryImp(
                 new OrdersDatasourceImp()
             );
 
             
             dispatch({
                 type: 'Set Loading',
                 payload: true,
             });
 
             
             const apiResult = await repository.getOrders();
 
             dispatch({
                 type:'Set Data',
                 payload: apiResult,
             });
         }
 
         
         return(
             <OrdersContext.Provider value = {{
                 ...state,
                 getOrders,
             }}>
             {children}
             </OrdersContext.Provider>
         )
     };
 
 function useOrdersState() {
     const context = useContext(OrdersContext);
     if(context === undefined) {
         throw new Error("useOrdersState debe ser usado " +
         " con un OrdersProvider");
     }
     return context;
 }
 
 
 export {OrdersProvider, useOrdersState}