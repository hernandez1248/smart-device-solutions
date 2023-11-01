import DevicesDatasource from "../../domain/datasources/devicesDatasource";
import Device from "../../domain/entities/device";
import DevicesResult from "../../domain/entities/devicesResult";
import DevicesRepository from "../../domain/repositories/devicesRepository";
import AddDevicesResult from "../../domain/entities/addDeviceResult";
 
class DevicesRepositoryImp extends DevicesRepository {
    datasource: DevicesDatasource;

    constructor(datasource: DevicesDatasource) {
        super();
        this.datasource = datasource;
    } 

    addDevice(device : Device): Promise<AddDevicesResult> {
        return this.datasource.addDevice(device);
    }
    getDevices(): Promise<DevicesResult> {
    //Invocar al datasourcer y pedirle la lista de devices
        return this.datasource.getDevices();
    }
 }

 export default DevicesRepositoryImp;