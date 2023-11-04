import DevicesDatasource from "../../domain/datasources/devicesDatasource";
import Device from "../../domain/entities/device";
import DevicesResult from "../../domain/entities/devicesResult";
import backendConfig from "../../../../config/backend/config";
import AddDevicesResult from "../../domain/entities/addDeviceResult";

class DevicesDatasourceImp extends DevicesDatasource {
        async addDevice(devices: Device): Promise<AddDevicesResult> {
            //console.log(device);
            
            return fetch(`${backendConfig.url}/api/device`, {
            method: !devices.id ? "POST": 'PATCH',
            body: JSON.stringify(devices),
            headers: {
                "Content-Type": "application/json",
            },
            })

            .then((response) => response.json())
            .then((response) => {
                //console.log(response);
      
                const result = new AddDevicesResult(response.message, response.devices || null);
                result.errors = response.errors || null;
                result.error = response.error || false;
                console.log(response);

                return result;                    
            });
        }

        async getDevices(): Promise<DevicesResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch(`${backendConfig.url}/api/device`)
        .then((response) => response.json())
        .then((response) => {
            

            const devices = response.map((item : any) => new Device(
                item.brand,
                item.model,
                item.deviceCategoryId,
                item.id,
            )
            );

            return new DevicesResult (devices)
        });
    }

}

export default DevicesDatasourceImp;