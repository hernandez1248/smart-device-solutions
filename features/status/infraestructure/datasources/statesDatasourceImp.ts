import StatesDatasource from "../../domain/datasources/statesDatasource";
import State from "../../domain/entities/state";
import StatesResult from "../../domain/entities/statesResult";
import backendConfig from "../../../../config/backend/config";
import AddStatesResult from "../../domain/entities/addStateResult";

class StatesDatasourceImp extends StatesDatasource {




    async addState(states: State): Promise<AddStatesResult> {
        //console.log(State);

        return fetch(`${backendConfig.url}/api/states`, {
            method: !states.id ? "POST" : 'PATCH',
            body: JSON.stringify(states),
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((response) => response.json())
            .then((response) => {
                //console.log(response);

                const result = new AddStatesResult(response.message, response.states || null);
                result.errors = response.errors || null;
                result.error = response.error || false;
                console.log(response);

                return result;
            });
    }

    
    async deleteState(state: State): Promise<AddStatesResult> {
        //console.log(state);

        return fetch(`${backendConfig.url}/api/states?stateSelected=${state.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((response) => response.json())
            .then((response) => {
                //console.log(response);

                const result = new AddStatesResult(response.message, response.states || null);
                result.errors = response.errors || null;
                result.error = response.error || false;
                console.log(response);

                return result;
            });
    }

    async getStates(): Promise<StatesResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch(`${backendConfig.url}/api/states`)
            .then((response) => response.json())
            .then((response) => {


                const states = response.map((item: any) => new State(
                    item.ordersId,
                    item.date,
                    item.status,
                    item.id,
                    item.description
                )
                );

                return new StatesResult(states)
            });
    }

}

export default StatesDatasourceImp;