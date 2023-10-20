import UsersResult from "../entities/usersResult";

abstract class UsersRepository {
    abstract getUsers(): Promise<UsersResult>;
}

export default UsersRepository;