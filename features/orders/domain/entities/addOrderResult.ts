import Order from "./order";

class AddOrdersResult {
    order?: Order;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string
    } [] | null;
    
    constructor(
      message: string,
      order: Order,
    ){        
      this.message = message;
      this.order = order;
    }
}
export default AddOrdersResult;
