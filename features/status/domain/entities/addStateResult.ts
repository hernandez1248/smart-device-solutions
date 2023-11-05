import State from "./state";

class AddStatesResult {
    state?: State;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string
    } [] | null;
    
    constructor(
      message: string,
      state: State,
    ){        
      this.message = message
      this.state = state;
    }
}
export default AddStatesResult;
