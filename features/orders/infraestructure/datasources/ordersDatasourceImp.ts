import backendConfig from "../../../../config/backend/config";
import OrdersDatasource from "../../domain/datasources/ordersDatasource";
import AddOrdersResult from "../../domain/entities/addOrderResult";
import Order from "../../domain/entities/order";
import OrdersResult from "../../domain/entities/ordersResult";

class OrdersDatasourceImp extends OrdersDatasource {
        async addOrder(order: Order): Promise<AddOrdersResult> {
        
            return fetch(`${backendConfig.url}/api/orders`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((response) => response.json())
            .then((response) => {
            
            const result = new AddOrdersResult(response.message, response.newIdOrden || null);
            result.errors = response.errors || null;
            result.error = response.error || false;
            console.log(response);
            
        
            return result;
            });
        }
        async getOrders(): Promise<OrdersResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch(`${backendConfig.url}/api/orders`)
        .then((response) => response.json())
        .then((response) => {
            

            const orders = response.map((item : any) => new Order(
                item.date,
                item.fullName,
                item.phone,
                item.color,
                item.observations,
                item.detalles,
                item.fullPay,
                item.advancePay,
                item.remainingPay,
                item.userId,
                item.id, 
                item.servicesId,
                item.deviceId,
            )
            );

            return new OrdersResult (orders)
        });
    }

}

export default OrdersDatasourceImp;