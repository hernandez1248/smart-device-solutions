import ComponentsResult from "../entities/componentsResult";

abstract class ComponentsDatasource {
    abstract getComponents(): Promise<ComponentsResult>;

}

export default ComponentsDatasource;