import OrdersDatasource from "../../domain/datasources/ordersDatasource";
import Order from "../../domain/entities/order";
import OrdersResult from "../../domain/entities/ordersResult";

class OrdersDatasourceImp extends OrdersDatasource {
        async getOrders(): Promise<OrdersResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch('http://192.168.1.68:3000/api/orders')
        .then((response) => response.json())
        .then((response) => {
            

            const orders = response.map((item : any) => new Order(
                item.id, 
                item.date,
                item.fullName,
                item.phone,
                item.servicesId,
                item.deviceId,
                item.color,
                item.observations,
                item.fullPay,
                item.advancePay,
                item.remainingPay,
                item.userId,
            )
            );

            return new OrdersResult (
                orders
            )
        });
    }

}

export default OrdersDatasourceImp;