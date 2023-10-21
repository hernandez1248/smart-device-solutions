import Device from "./device";

class DevicesResult {
    devices: Device[];

    constructor(
        devices: Device[],
    ){        
        this.devices = devices;
    }
}
export default DevicesResult;