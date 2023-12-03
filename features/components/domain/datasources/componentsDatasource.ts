import AddComponentResult from "../entities/addComponentResult";
import Component from "../entities/component";
import ComponentsResult from "../entities/componentsResult";

abstract class ComponentsDatasource {
    abstract getComponents(): Promise<ComponentsResult>;
    abstract addComponent(component: Component): Promise<AddComponentResult>
    abstract deleteComponent(component: Component): Promise<AddComponentResult>

}

export default ComponentsDatasource;