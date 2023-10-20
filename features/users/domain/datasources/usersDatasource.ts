import UsersResult from "../entities/usersResult";

abstract class UsersDatasource {
    abstract getUsers(): Promise<UsersResult>;
}

export default UsersDatasource;