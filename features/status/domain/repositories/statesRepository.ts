import Component from "../../../components/domain/entities/component";
import State from "../entities/state";
import StatesResult from "../entities/statesResult";
import AddStatesResult from "../entities/addStateResult";

abstract class StatesRepository {
    abstract getStates(): Promise<StatesResult>;
    abstract addState(state: State): Promise<AddStatesResult>;
    abstract deleteState(state: State): Promise<AddStatesResult>;
}

export default StatesRepository;