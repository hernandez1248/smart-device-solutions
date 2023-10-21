import OrdersResult from "../entities/ordersResult";

abstract class OrdersDatasource {
    abstract getOrders(): Promise<OrdersResult>;

}

export default OrdersDatasource;