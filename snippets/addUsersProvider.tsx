import { FC, ReactNode, createContext, useContext, useReducer } from "react";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  message?: string,

}

//crear el objeto context de react
const SampleContext = createContext({} as ContextDefinition);

interface SampleState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  message?: string,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type SampleActionType =
  | { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean };

//inicializar el state
const initialState: SampleState = {
  loading: false,
  saving: false,
  message: undefined,
};

function SampleReducer(
  state: SampleState, 
  action: SampleActionType
) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      };

    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const SampleProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(SampleReducer, initialState);

  return (
    <SampleContext.Provider
      value={{
        ...state,
        //funciones
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}

function useSampleState() {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error("useSampleState debe ser usado " + " con un SampleProvider");
  }
  return context;
}

export { SampleProvider, useSampleState };


