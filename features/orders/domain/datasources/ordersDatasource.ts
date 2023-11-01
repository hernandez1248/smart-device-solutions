import AddOrdersResult from "../entities/addOrderResult";
import Order from "../entities/order";
import OrdersResult from "../entities/ordersResult";

abstract class OrdersDatasource {
    abstract getOrders(): Promise<OrdersResult>;
    abstract addOrder(order: Order): Promise<AddOrdersResult>;
}

export default OrdersDatasource;