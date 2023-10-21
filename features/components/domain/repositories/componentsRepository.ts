import ComponentsResult from "../entities/componentsResult";

abstract class ComponentsRepository {
    abstract getComponents(): Promise<ComponentsResult>;
}

export default ComponentsRepository;