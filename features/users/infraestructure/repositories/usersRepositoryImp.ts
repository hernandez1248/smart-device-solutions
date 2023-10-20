import UsersDatasource from "../../domain/datasources/usersDatasource";
import UsersResult from "../../domain/entities/usersResult";
import UsersRepository from "../../domain/repositories/usersRepository";

 class UsersRepositoryImp extends UsersRepository {
    datasource: UsersDatasource;

    constructor(datasource: UsersDatasource) {
        super();
        this.datasource = datasource;
    } 
    
        getUsers(): Promise<UsersResult> {
        //Invocar al datasourcer y pedirle la lista de Users
        return this.datasource.getUsers();
     }
 }

 export default UsersRepositoryImp;