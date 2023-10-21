import DevicesDatasource from "../../domain/datasources/devicesDatasource";
import Device from "../../domain/entities/device";
import DevicesResult from "../../domain/entities/devicesResult";

class DevicesDatasourceImp extends DevicesDatasource {
        async getDevices(): Promise<DevicesResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch('http://192.168.1.68:3000/api/device')
        .then((response) => response.json())
        .then((response) => {
            

            const devices = response.map((item : any) => new Device(
                item.id,
                item.brand,
                item.model,
            )
            );

            return new DevicesResult (
                devices
            )
        });
    }

}

export default DevicesDatasourceImp;