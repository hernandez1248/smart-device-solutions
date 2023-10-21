import ComponentsDatasource from "../../domain/datasources/componentsDatasource";
import ComponentsResult from "../../domain/entities/componentsResult";
import ComponentsRepository from "../../domain/repositories/componentsRepository";

 class ComponentsRepositoryImp extends ComponentsRepository {
    datasource: ComponentsDatasource;
    
    constructor(datasource: ComponentsDatasource) {
        super();
        this.datasource = datasource;
    } 

        getComponents(): Promise<ComponentsResult> {
        //Invocar al datasourcer y pedirle la lista de Components
        return this.datasource.getComponents();
     }
 }

 export default ComponentsRepositoryImp;