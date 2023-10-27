import DevicesResult from "../entities/devicesResult";

abstract class DevicesRepository {
    abstract getDevices(): Promise<DevicesResult>;
}

export default DevicesRepository;