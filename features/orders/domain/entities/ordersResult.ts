import Order from "./order";

class OrdersResult {
    orders: Order[];

    constructor(
        orders: Order[],
    ){        
        this.orders = orders;
    }
}
export default OrdersResult;