import OrdersResult from "../entities/ordersResult";

abstract class OrdersRepository {
    abstract getOrders(): Promise<OrdersResult>;
}

export default OrdersRepository;