 import { FC, ReactNode, createContext, useReducer, useContext } from "react";
 import Component from "../../domain/entities/component";
 import ComponentsRepositoryImp from "../../infraestructure/repositories/componentsRepositoryImp";
 import ComponentsDatasourceImp from "../../infraestructure/datasources/componentsDatasourceImp";
import ComponentsResult from "../../domain/entities/componentsResult";
 
 //definir la estructura que tendra mi context
 interface ContextDefinition {
     //definicion del estado
     loading: boolean,
     components: Component[],
     //acciones que tendra mi context
     getComponents: () => void;
 }
 
 //crear el objeto context de react
 const ComponentsContext = createContext({} as ContextDefinition);
 //estructura  del state
 //debe coincidir  con la estructura del context
 //no lleva acciones
 //el state representra los valores
 
 interface ComponentsState {
     //definicion del estado
     loading: boolean,
     components: Component[],
 }
 
 //definir los tipos de acciones que podra ejecutar el context / providers
 type ComponentsActionType = 
    {type: 'Set Loading', payload: boolean}
    | {type: 'Set Data', payload: ComponentsResult}
    
    ;
 
 //inicializar el state
 const initialState : ComponentsState = {
     loading: false,
     components: []
 }
 //definicion del reducer
 //se encargara de manipular el state con base en
 //las acciones y datos recibidos (payload)m
 function componentsReducer( state: ComponentsState, action: ComponentsActionType){
         switch (action.type) {
             //manipular el estado con base a las acciones
             case 'Set Loading':
                 return {
                    ...state, 
                    loading: action.payload
                }
             case 'Set Data':
                 return {
                     ...state,
                     components: action.payload.components,
                     loading: false,
                     //otras manipulaciones de estado
                 }
         
             default:
                 return state;
         }
     }
 
     type Props = {
         children?: ReactNode
     }
 
     //implementar el proveedor de estado para Components
     const ComponentsProvider: FC<Props> = ({children}) => {
         const [state, dispatch] = useReducer( componentsReducer, initialState );
         
         //acciones
         const getComponents = async () => {
             const repository = new ComponentsRepositoryImp(
                 new ComponentsDatasourceImp()
             );
 
             //cambiar el state a loading
             dispatch({
                 type: 'Set Loading',
                 payload: true,
             });
 
             //llamar al repositorio  y obtener el resultado
             const apiResult = await repository.getComponents();
 
             //mandar a establecer los datos en el estado
             dispatch({
                 type:'Set Data',
                 payload: apiResult,
             });
         }
 
         //retornar la estructura del provider
         return(
             <ComponentsContext.Provider value = {{
                 ...state,
                 getComponents,
             }}>
             {children}
             </ComponentsContext.Provider>
         )
     };
 
 //para usar el provider y el state
 //lo ideal es generar una funcion hook
 
 function useComponentsState() {
     const context = useContext(ComponentsContext);
     if(context === undefined) {
         throw new Error("useComponentsState debe ser usado " +
         " con un ComponentsProvider");
     }
     return context;
 }
 
 
 export {ComponentsProvider, useComponentsState}