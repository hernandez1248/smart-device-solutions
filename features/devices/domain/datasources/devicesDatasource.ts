import Device from "../entities/device";
import DevicesResult from "../entities/devicesResult";
import AddDevicesResult from "../entities/addDeviceResult";

abstract class DevicesDatasource { 
    abstract getDevices(): Promise<DevicesResult>;
    abstract addDevice(device:Device): Promise<AddDevicesResult>
}

export default DevicesDatasource;