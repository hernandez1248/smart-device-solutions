// define la entidad Device
class Device {
    id?: number;
    brand: string;
    model: string;    
    deviceCategoryId?: number;

    constructor(
        brand: string,
        model: string,
        deviceCategoryId?: number,
        id?: number,
        
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.deviceCategoryId = deviceCategoryId;
    }
}
export default Device;
