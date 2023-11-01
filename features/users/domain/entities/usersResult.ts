import User from "./user";

class UsersResult {
    users: User[];

    constructor(
        users: User[],
    ){        
        this.users = users;
    }
}
export default UsersResult;