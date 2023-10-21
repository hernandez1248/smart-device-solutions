import DevicesDatasource from "../../domain/datasources/devicesDatasource";
import DevicesResult from "../../domain/entities/devicesResult";
import DevicesRepository from "../../domain/repositories/devicesRepository";

 class DevicesRepositoryImp extends DevicesRepository {
    datasource: DevicesDatasource;

    constructor(datasource: DevicesDatasource) {
        super();
        this.datasource = datasource;
    } 
        getDevices(): Promise<DevicesResult> {
        //Invocar al datasourcer y pedirle la lista de devices
        return this.datasource.getDevices();
     }
 }

 export default DevicesRepositoryImp;