import DevicesResult from "../entities/devicesResult";

abstract class DevicesDatasource {
    abstract getDevices(): Promise<DevicesResult>;

}

export default DevicesDatasource;