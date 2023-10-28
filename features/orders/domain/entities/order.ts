import Detalles from "./detalles";
class Order {
    id?: number;
    date: string;
    fullName: string;
    phone: string;
    servicesId?: number;
    deviceId?: number;
    color: string;
    observations: string;
    fullPay?: number;
    advancePay?: number;
    remainingPay?: number;
    userId?: number;
    detalles: Detalles[];

    constructor(
        date: string,
        fullName: string,
        phone: string,
        color: string,
        observations: string,
        detalles: Detalles[] = [],
        fullPay?: number,
        advancePay?: number,
        remainingPay?: number,
        userId?: number,
        id?: number,
        servicesId?: number,
        deviceId?: number
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
        this.detalles = detalles;
    }
}

export default Order;
