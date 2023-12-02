import UsersDatasource from "../../domain/datasources/usersDatasource";
import AddUsersResult from "../../domain/entities/addUserResult";
import User from "../../domain/entities/user";
import UsersResult from "../../domain/entities/usersResult";
import UsersRepository from "../../domain/repositories/usersRepository";

class UsersRepositoryImp extends UsersRepository {
  deleteUser(user: User): Promise<AddUsersResult> {
    return this.datasource.deleteUser(user);
  }
  datasource: UsersDatasource;

  constructor(datasource: UsersDatasource) {
    super();
    this.datasource = datasource;
  }

  addUser(user: User): Promise<AddUsersResult> {
    return this.datasource.addUser(user);
  } 
  getUsers(): Promise<UsersResult> {
    //Invocar al datasourcer y pedirle la lista de Users
    return this.datasource.getUsers();
  }
}

export default UsersRepositoryImp;
