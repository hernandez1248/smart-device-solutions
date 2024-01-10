// define la entidad Component
class Component {
    id?: number;
    name: string;
    image: string;
    price: string;
    stock: string;
    deviceId: string;

    constructor(
        name: string,
        image: string,
        price: string,
        stock: string,
        deviceId: string,
        id?: number,
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.deviceId = deviceId;
    }
}
export default Component;
