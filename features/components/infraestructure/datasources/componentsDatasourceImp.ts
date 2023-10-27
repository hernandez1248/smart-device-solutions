import backendConfig from "../../../../config/backend/config";
import ComponentsDatasource from "../../domain/datasources/componentsDatasource";
import Component from "../../domain/entities/component";
import ComponentsResult from "../../domain/entities/componentsResult";

class ComponentsDatasourceImp extends ComponentsDatasource {
        async getComponents(): Promise<ComponentsResult> {
        //Mandar a cargar la lista de personajes desde la api
        //usando fetch

        return fetch(`${backendConfig.url}/api/components`)
        .then((response) => response.json())
        .then((response) => {
            

            const components = response.map((item : any) => new Component(
                item.id,
                item.name,
                item.price,
                item.stock,
                item.deviceId,
                
            )
            );

            return new ComponentsResult (
                components
            )
        });
    }

}

export default ComponentsDatasourceImp;