import State from "../entities/state";
import StatesResult from "../entities/statesResult";
import AddStatesResult from "../entities/addStateResult";

abstract class StatesDatasource { 
    abstract getStates(): Promise<StatesResult>;
    abstract addState(state:State): Promise<AddStatesResult>;
    abstract deleteState(state:State): Promise<AddStatesResult>;
}

export default StatesDatasource;