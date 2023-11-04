import ComponentsDatasource from "../../domain/datasources/componentsDatasource";
import AddComponentResult from "../../domain/entities/addComponentResult";
import Component from "../../domain/entities/component";
import ComponentsResult from "../../domain/entities/componentsResult";
import backendConfig from "../../../../config/backend/config";

class ComponentsDatasourceImp extends ComponentsDatasource {

  async addComponent(component: Component): Promise<AddComponentResult> {
      // console.log(component);
      

    return fetch(`${backendConfig.url}/api/components`, {
      method: !component.id ? "POST" : "PATCH",
      body: JSON.stringify(component),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const result = new AddComponentResult(response.message, response.component || null);
      result.errors = response.errors || null;
      result.error = response.error || false;

      return result;
    });
  }  

  async getComponents(): Promise<ComponentsResult> {
      //Mandar a cargar la lista de personajes desde la api
      //usando fetch

    return fetch(`${backendConfig.url}/api/components`)
    .then((response) => response.json())
    .then((response) => {
        

        const components = response.map((item : any) => new Component(
            item.name,
            item.price,
            item.stock,
            item.deviceId,
            item.id,
            
        )
        );

        return new ComponentsResult (
            components
        )
    });
  }

}

export default ComponentsDatasourceImp;