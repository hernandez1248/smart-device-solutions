// define la entidad Component
class Component {
    id?: number;
    name: string;
    price: string;
    stock: string;
    deviceId: string;
    image: string;

    constructor(
        name: string,
        price: string,
        stock: string,
        deviceId: string,
        image: string,
        id?: number,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.deviceId = deviceId;
        this.image = image;
    }
}
export default Component;
