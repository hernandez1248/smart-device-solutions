import { FC, ReactNode, createContext, useReducer, useContext } from "react";
import State from "../../domain/entities/state";
import StatesRepositoryImp from "../../infraestructure/repositories/statesRepositoryImp";
import StatesDatasourceImp from "../../infraestructure/datasources/statesDatasourceImp";
import StatesResult from "../../domain/entities/statesResult";

//definir la estructura que tendra mi context
interface ContextDefinition {
    //definicion del estado
    loading: boolean,
    states: State[],
    stateSelected: State | null;
    stateSelectedDelete: State | null;
    //acciones que tendra mi context
    getStates: () => void;
    setStateSelected: (state: State | null) => void;
    setStateDelected: (state: State | null) => void;
    onUpdatedState: (state: State) => void;
    onSavedState: (newState: State) => void;
    onDeleteState: (state: State) => void;
}

//crear el objeto context de react
const StatesContext = createContext({} as ContextDefinition);
//estructura  del state
//debe coincidir  con la estructura del context
//no lleva acciones
//el state representra los valores

interface StatesState {
    //definicion del estado
    loading: boolean;
    states: State[];
    stateSelected: State | null;
    stateSelectedDelete: State | null;
}

//definir los tipos de acciones que podra ejecutar el context / providers
type StatesActionType =
    | { type: 'Set Loading', payload: boolean }
    | { type: 'Set Data', payload: StatesResult }
    | { type: 'Set State Selected', payload: State | null }
    | {type: 'Set State Selected Deleted', payload: State | null}

//inicializar el state
const initialState: StatesState = {
    loading: false,
    states: [],
    stateSelected: null,
    stateSelectedDelete: null,

}
//definicion del reducer
//se encargara de manipular el state con base en
//las acciones y datos recibidos (payload)m
function statesReducer(states: StatesState, action: StatesActionType) {
    switch (action.type) {
        //manipular el estado con base a las acciones
        case 'Set Loading':
            return { ...states, loading: action.payload }
        case 'Set Data':
            return {
                ...states,
                states: action.payload.states,
                loading: false,
                //otras manipulaciones de estado
            }
        case 'Set State Selected':
            return {
                ...states,
                stateSelected: action.payload,
            }
        case 'Set State Selected Deleted':
            return {
                ...states,
                stateSelectedDelete: action.payload,
            }


        default:
            return states;
    }
}

type Props = {
    children?: ReactNode
}

//implementar el proveedor de estado para States
const StatesProvider: FC<Props> = ({ children }) => {
    const [states, dispatch] = useReducer(statesReducer, initialState);

    //acciones
    const getStates = async () => {
        const repository = new StatesRepositoryImp(
            new StatesDatasourceImp()
        );

        //cambiar el state a loading
        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        //llamar al repositorio  y obtener el resultado
        const apiResult = await repository.getStates();

        //mandar a establecer los datos en el estado
        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };
    function setStateSelected(state: State | null) {
        //console.log(state);

        dispatch({
            type: 'Set State Selected',
            payload: state,
        });
    }

    function setStateDelected (state: State | null) {
        console.log("dispositivo:", state);
        dispatch({
            type: 'Set State Selected Deleted',
            payload: state,
        });

    }

    /**
    *Actualiza el registro en la lista de States y cierra el modal de editar
    * @param state Dispositivo actualizado4 
    */
    function onUpdatedState(state: State) {
        //buscar el registro en devices,y remplazarlo
        //actualizar el estado users

        const statesClone = [...states.states];
        const index = statesClone.findIndex((item) => item.id == state.id);
        statesClone.splice(index, 1, state);


        dispatch({
            type: 'Set Data',
            payload: {
                states: statesClone,
            }
        });
        //cierra el modal
        setStateSelected(null)
    }

    /*function onSavedState(newState: State) {

        // Crear una copia de la lista actual de dispositivos
        const StatesAddClone = [...state.States];

        // Agregar el nuevo dispositivo a la lista
        StatesAddClone.push(newState);

        dispatch({
            type: 'Set Data',
            payload: {
                States: StatesAddClone,
            }
        });

        // Cerrar el modal
        //setModalVisible(false);
    }*/


    async function onSavedState(){
        const repository = new StatesRepositoryImp(
            new StatesDatasourceImp()
        );

        //cambiar el state a loading
        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        const dateOn = await repository.getStates();

        dispatch({
            type: 'Set Data',
            payload: dateOn,
        });
    };


    /*function onDeleteState (state: State)*/


      function onDeleteState(state: State) {
        const statesCloneDelete = [...states.states];
        const index = statesCloneDelete.findIndex((item) => item.id === state.id);
      
        if (index !== -1) {
          statesCloneDelete.splice(index, 1);
          dispatch({
            type: 'Set Data',
            payload: {
              states: statesCloneDelete,
            },
          });
        }
        
        // Cierra el modal u realiza cualquier otra acción necesaria
        // (puedes manejar esto según tus necesidades)
        setStateSelected(null);
      }
      
      


    //retornar la estructura del provider
    return (
        <StatesContext.Provider value={{
            ...states,
            getStates,
            setStateSelected,
            setStateDelected,
            onUpdatedState,
            onSavedState,
            onDeleteState,
        }}>
            {children}
        </StatesContext.Provider>
    )
};

//para usar el provider y el state
//lo ideal es generar una funcion hook

function useStatesState() {
    const context = useContext(StatesContext);
    if (context === undefined) {
        throw new Error("useStatesState debe ser usado " +
            " con un StatesProvider");
    }
    return context;
}


export { StatesProvider, useStatesState }