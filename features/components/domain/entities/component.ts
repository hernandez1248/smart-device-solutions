// define la entidad Component
class Component {
    id: number;
    name: string;
    price: number;
    stock: number;
    deviceId: number;

    constructor(
        id: number,
        name: string,
        price: number,
        stock: number,
        deviceId: number,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.deviceId = deviceId;
    }
}
export default Component;
