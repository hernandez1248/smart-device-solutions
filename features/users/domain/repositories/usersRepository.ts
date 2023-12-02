import AddUsersResult from "../entities/addUserResult";
import User from "../entities/user";
import UsersResult from "../entities/usersResult";

abstract class UsersRepository {
    abstract getUsers(): Promise<UsersResult>;
    abstract addUser(user: User): Promise<AddUsersResult>
    abstract deleteUser(user: User): Promise<AddUsersResult>
}

export default UsersRepository;