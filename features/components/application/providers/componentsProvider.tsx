import { FC, ReactNode, createContext, useReducer, useContext } from "react";
import Component from "../../domain/entities/component";
import ComponentsRepositoryImp from "../../infraestructure/repositories/componentsRepositoryImp";
import ComponentsDatasourceImp from "../../infraestructure/datasources/componentsDatasourceImp";
import ComponentsResult from "../../domain/entities/componentsResult";

//definir la estructura que tendra mi context
interface ContextDefinition {
    //definicion del estado
    loading: boolean;
    components: Component[];
    componentSelected: Component | null;
    // componentView: Component | null,
    componentSelectedDelete: Component | null;

    //acciones que tendra mi context
    getComponents: () => void;
    setComponentSelected: (component: Component | null) => void;
    setComponentDelected: (component: Component | null) => void;
    // setComponentView: (component: Component | null) => void;

    onSavedComponent: (newComponent: Component) => void;
    onUpdatedComponent: (component: Component) => void;
    onDeleteComponent: (component: Component) => void;
}

//crear el objeto context de react
const ComponentsContext = createContext({} as ContextDefinition);
//estructura  del state
//debe coincidir  con la estructura del context
//no lleva acciones
//el state representra los valores

interface ComponentsState {
    //definicion del estado
    loading: boolean;
    components: Component[];
    componentSelected: Component | null;
    // componentView: Component | null,
    componentSelectedDelete: Component | null;

}

//definir los tipos de acciones que podra ejecutar el context / providers
type ComponentsActionType = 
{ type: 'Set Loading', payload: boolean }
| { type: 'Set Data', payload: ComponentsResult }
| { type: 'Set Component Selected', payload: Component | null }
// | { type: "Set Component View"; payload: Component | null }
| {type: 'Set Component Selected Deleted', payload: Component | null};

;

//inicializar el state
const initialState : ComponentsState = {
    loading: false,
    components: [],
    componentSelected: null,
    componentSelectedDelete: null,
    // componentView: null,
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
        case 'Set Component Selected':
            return {
                ...state,
                componentSelected: action.payload,
            }
        // case 'Set Component View':
        //     return {
        //         ...state,
        //         componentView: action.payload,
        //     }
        case 'Set Component Selected Deleted':
            return {
                ...state,
                componentSelectedDelete: action.payload,
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

        function setComponentSelected (component: Component | null) {
            // console.log(component); 
            dispatch({
                type: 'Set Component Selected',
                payload: component,
            });
        }

        // function setComponentView (component: Component | null) {
        //     console.log(component);
            
        //     dispatch({
        //       type: "Set Component View",
        //       payload: component,
        //     });
        // }
        
        function setComponentDelected (component: Component | null) {
            console.log("componente:", component);
            dispatch({
                type: 'Set Component Selected Deleted',
                payload: component,
            });
        
        }

        /**
         * actualiza el registro en la lista de componentes y cierra el modal de editar
         * @param component Componente actualizado
         */
        function onUpdatedComponent (component: Component) {
            //buscar el resgistro en components, y remplazarlo
            //actualiza el estado components
            const componentsClone = [...state.components];
            const index = componentsClone.findIndex((item ) => item.id == component.id);
            componentsClone.splice(index, 1, component);

            dispatch({
                type: 'Set Data',
                payload: {
                    components: componentsClone,
                    
                }
            })

            //cerrar el modal
            setComponentSelected(null);
        }

        async function onSavedComponent(){
            const repository = new ComponentsRepositoryImp(
                new ComponentsDatasourceImp()
            );
    
            //cambiar el state a loading
            dispatch({
                type: 'Set Loading',
                payload: true,
            });
    
            const dateOn = await repository.getComponents();
    
            dispatch({
                type: 'Set Data',
                payload: dateOn,
            });
        };

        function onDeleteComponent(component: Component) {
            const componentsCloneDelete = [...state.components];
            const index = componentsCloneDelete.findIndex((item) => item.id === component.id);
          
            if (index !== -1) {
              componentsCloneDelete.splice(index, 1);
              dispatch({
                type: 'Set Data',
                payload: {
                  components: componentsCloneDelete,
                },
              });
            }
            
            // Cierra el modal u realiza cualquier otra acción necesaria
            // (puedes manejar esto según tus necesidades)
            setComponentSelected(null);
        }

        //retornar la estructura del provider
        return(
            <ComponentsContext.Provider value = {{
                ...state,
                getComponents,
                setComponentSelected,
                setComponentDelected,
                // setComponentView,
                onUpdatedComponent,
                onSavedComponent,
                onDeleteComponent,

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