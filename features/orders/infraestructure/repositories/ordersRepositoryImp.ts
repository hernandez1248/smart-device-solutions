import OrdersDatasource from "../../domain/datasources/ordersDatasource";
import OrdersResult from "../../domain/entities/ordersResult";
import OrdersRepository from "../../domain/repositories/ordersRepository";

 class OrdersRepositoryImp extends OrdersRepository {
    datasource: OrdersDatasource;

    constructor(datasource: OrdersDatasource) {
        super();
        this.datasource = datasource;
    } 
        getOrders(): Promise<OrdersResult> {
        //Invocar al datasourcer y pedirle la lista de Orders
        return this.datasource.getOrders();
     }
 }

 export default OrdersRepositoryImp;