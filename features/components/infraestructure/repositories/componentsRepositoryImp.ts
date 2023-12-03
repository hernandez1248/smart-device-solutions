import ComponentsDatasource from "../../domain/datasources/componentsDatasource";
import AddComponentResult from "../../domain/entities/addComponentResult";
import Component from "../../domain/entities/component";
import ComponentsResult from "../../domain/entities/componentsResult";
import ComponentsRepository from "../../domain/repositories/componentsRepository";

 class ComponentsRepositoryImp extends ComponentsRepository {
    datasource: ComponentsDatasource;
    
    constructor(datasource: ComponentsDatasource) {
        super();
        this.datasource = datasource;
    } 

    deleteComponent(component: Component): Promise<AddComponentResult> {
        return this.datasource.deleteComponent(component);
    }

    addComponent(component: Component): Promise<AddComponentResult> {
        return this.datasource.addComponent(component);
    }

    getComponents(): Promise<ComponentsResult> {
        //Invocar al datasourcer y pedirle la lista de Components
        return this.datasource.getComponents();
     }
 }

 export default ComponentsRepositoryImp;