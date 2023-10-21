// define la entidad Device
class Order {
    id: number; 
    date: string;
    fullName: string;
    phone: string;
    servicesId: number;
    deviceId: number;
    color: string;
    observations: string;
    fullPay: number;
    advancePay: number;
    remainingPay: number;
    userId: number;
    
    constructor(
        id: number, 
        date: string,
        fullName: string,
        phone: string,
        servicesId: number,
        deviceId: number,
        color: string,
        observations: string,
        fullPay: number,
        advancePay: number,
        remainingPay: number,
        userId: number,
    ) {
        this.id = id; 
        this.date = date;
        this.fullName = fullName;
        this.phone = phone;
        this.servicesId = servicesId;
        this.deviceId = deviceId;
        this.color = color;
        this.observations = observations;
        this.fullPay = fullPay;
        this.advancePay = advancePay;
        this.remainingPay = remainingPay;
        this.userId = userId;
    }
}
export default Order;
