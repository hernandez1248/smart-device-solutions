import OrdersDatasource from "../../domain/datasources/ordersDatasource";
import AddOrdersResult from "../../domain/entities/addOrderResult";
import Order from "../../domain/entities/order";
import OrdersResult from "../../domain/entities/ordersResult";
import OrdersRepository from "../../domain/repositories/ordersRepository";

 class OrdersRepositoryImp extends OrdersRepository {
    datasource: OrdersDatasource;

    constructor(datasource: OrdersDatasource) {
        super();
        this.datasource = datasource;
    } 
    addOrder(order: Order): Promise<AddOrdersResult> {
      return this.datasource.addOrder(order);
    } 
    getOrders(): Promise<OrdersResult> {
        //Invocar al datasourcer y pedirle la lista de Orders
      return this.datasource.getOrders();
    }
 }

 export default OrdersRepositoryImp;