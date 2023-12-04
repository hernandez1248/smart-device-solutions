// define la entidad State
class State {
    id?: number;
    ordersId?: number;
    date?: string;    
    status?: string;    
    description?: string;

    constructor(
        ordersId?: number,
        date?: string,
        status?: string,
        id?: number,
        description?: string,
        
    ) {
        this.id = id;
        this.ordersId = ordersId;
        this.date = date;
        this.status = status;
        this.description = description;
    }
}
export default State;
