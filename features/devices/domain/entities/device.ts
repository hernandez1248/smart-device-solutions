// define la entidad Device
class Device {
    id: number;
    brand: string;
    model: string;

    constructor(
        id: number,
        brand: string,
        model: string,
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
    }
}
export default Device;
