import { FC, ReactNode, createContext, useReducer, useContext } from "react";
import Component from "../../domain/entities/component";
import ComponentsRepositoryImp from "../../infraestructure/repositories/componentsRepositoryImp";
import ComponentsDatasourceImp from "../../infraestructure/datasources/componentsDatasourceImp";

interface ContextDefinition {
    loading: boolean,
    saving: boolean,
    success: boolean,
    message?: string | null,
    component: Component,
    errors: any,

    //Acciones que tendra mi context
    setComponentProp: (property: string, value: any) => void;
    saveComponent: (onSaved: Function)=> void,
    setComponent: (component: Component)=> void,
}

 //crear el objeto context de react
const EditComponentContext = createContext({} as ContextDefinition);

 interface EditComponentState {
    loading: boolean,
    saving: boolean,
    success: boolean,
    message?: string | null,
    component: Component,
    errors: any,

 }

//definir los tipos de acciones que podra ejecutar el context / providers
type EditComponentActionType = 
    {type: 'Set Loading', payload: boolean} 
    | {type: 'Set Saving', payload: boolean}
    | { type: "Set Success", payload: { 
        success: boolean, 
        component?: Component,
        message: string,
    } }
    | {type: 'Set Component', payload: Component}
    | { type: "Set Message", payload: string | null }
    | { type: "Set Errors", payload: {
        message: string,
        errors: any
    }}

 //inicializar el state
 const initialState : EditComponentState = {
    loading: false,
    saving: false,
    success: false,
    message: null,
    component: new Component(
        '',
        '',
        '',
        '',
        undefined,
        ),
        errors: {
        },
}

 //definicion del reducer
 //se encargara de manipular el state con base en
 //las acciones y datos recibidos (payload)m
 function editComponentReducer( 
        state: EditComponentState, 
        action: EditComponentActionType
    ){
    switch (action.type) {
        //manipular el estado con base a las acciones
        case "Set Message":
            return {
                ...state,
                message: action.payload,
            };
        case 'Set Loading':
            return {
                ...state,
                loading: action.payload
            }
        case 'Set Saving':
            return {
                ...state,
                saving: action.payload,
            }
        case 'Set Component':
            return {
                ...state,
                component: action.payload,
            }
            case 'Set Errors':
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
                  // user: action.payload.user || state.user,
                  
                }
        default:
            return state;
    }
}

type Props = {
    children?: ReactNode
}

//implementar el proveedor de estado para components
const EditComponentProvider: FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer( editComponentReducer, initialState );

    function setComponentProp(property: string, value: any) {
        //mandar el valor al estado component
        dispatch({
            type: 'Set Component',
            payload: {
                ...state.component,
                [property]: value,
            }
        });
    }

    async function saveComponent(onSaved: Function) {
        const componentsRepository = new ComponentsRepositoryImp(
            new ComponentsDatasourceImp()
        )
        //enviar los datos al backend a traves del repositorio
        dispatch({
            type: 'Set Saving',
            payload: true,
        })
        console.log(state.component);
        

        const result = await componentsRepository.addComponent(state.component);
        if (result.component) {
        dispatch({
            type: 'Set Success',
            payload: {
                success: true,
                component: result.component,
                message: result.message,
            },
        });

        // if (onSaved) {
        //     onSaved(false);
        //   }
        //   console.log(result);
        
        //si ya se guardo mandar a cerrar el modal
        onSaved(state.component);
        return;
        }
        // dispatch({
        //   type: 'Set Message',
        //   payload: result.message,
        // });

        let errors : any = {};
        
        result.errors?.forEach((item) => {
        errors[item.field] = item.error;
        });
        // console.log(result.errors);
        

        dispatch({
        type: 'Set Errors',
        payload: {
            message: result.message,
            errors,
        },
        });
        // console.log(errors);
        

        // console.log(result);
        // dispatch({
        // type: 'Set Saving',
        // payload: false,
        // });
    
        //test para guardar, //quitar de aca
        
        // onSaved(state.component);
    }

    function setComponent(component: Component){
        dispatch({
            type: 'Set Component',
            payload: component,
        });
    }


    //retornar la estructura del provider
    return(
    <EditComponentContext.Provider value = {{
        ...state,
        
        //funciones
        setComponentProp,
        saveComponent,
        setComponent,
    }}>
    {children}
    </EditComponentContext.Provider>
)
}

 
 //para usar el provider y el state
 //lo ideal es generar una funcion hook
 
 function useEditComponentState() {
    const context = useContext(EditComponentContext);
    if(context === undefined) {
        throw new Error("useEditComponentState debe ser usado " +
        " con un EditComponentProvider");
    }
    return context;
}


export {EditComponentProvider, useEditComponentState}