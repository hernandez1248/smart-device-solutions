import StatesDatasource from "../../domain/datasources/statesDatasource";
import State from "../../domain/entities/state";
import StatesResult from "../../domain/entities/statesResult";
import StatesRepository from "../../domain/repositories/statesRepository";
import AddStatesResult from "../../domain/entities/addStateResult";
 
class StatesRepositoryImp extends StatesRepository {
    datasource: StatesDatasource;

    constructor(datasource: StatesDatasource) {
        super();
        this.datasource = datasource;
    } 


    deleteState(state : State): Promise<AddStatesResult> {

        return this.datasource.deleteState(state);
    }
    
    addState(state : State): Promise<AddStatesResult> {
        return this.datasource.addState(state);
    }
    getStates(): Promise<StatesResult> {
    //Invocar al datasourcer y pedirle la lista de States
        return this.datasource.getStates();
    }
 }

 export default StatesRepositoryImp;