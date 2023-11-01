import Component from "../../../components/domain/entities/component";
import Device from "../entities/device";
import DevicesResult from "../entities/devicesResult";
import AddDevicesResult from "../entities/addDeviceResult";

abstract class DevicesRepository {
    abstract getDevices(): Promise<DevicesResult>;
    abstract addDevice(device: Device): Promise<AddDevicesResult> 
}

export default DevicesRepository;