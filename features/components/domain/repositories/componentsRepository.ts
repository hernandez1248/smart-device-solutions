import AddComponentResult from "../entities/addComponentResult";
import Component from "../entities/component";
import ComponentsResult from "../entities/componentsResult";

abstract class ComponentsRepository {
    abstract getComponents(): Promise<ComponentsResult>;
    abstract addComponent(component: Component): Promise<AddComponentResult>;

}

export default ComponentsRepository;