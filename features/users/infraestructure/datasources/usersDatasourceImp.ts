import backendConfig from "../../../../config/backend/config";
import UsersDatasource from "../../domain/datasources/usersDatasource";
import AddUsersResult from "../../domain/entities/addUserResult";
import User from "../../domain/entities/user";
import UsersResult from "../../domain/entities/usersResult";

class UsersDatasourceImp extends UsersDatasource {
  
  async deleteUser(user: User): Promise<AddUsersResult> {
    return fetch(
      `${backendConfig.url}/api/users?id=${user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);

        const result = new AddUsersResult(
          response.message,
          response.user || null
        );
        result.errors = response.errors || null;
        result.error = response.error || false;
        console.log(response);

        return result;
      });
  }

  async addUser(user: User): Promise<AddUsersResult> {
    return fetch(`${backendConfig.url}/api/users`, {
      method: !user.id ? "POST" : "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const result = new AddUsersResult(
          response.message,
          response.user || null
        );
        result.errors = response.errors || null;
        result.error = response.error || false;
        console.log(response);

        return result;
      });
  }

  async getUsers(): Promise<UsersResult> {
    return fetch(`${backendConfig.url}/api/users`)
      .then((response) => response.json())
      .then((response) => {
        const users = response.map(
          (item: any) =>
            new User(
              item.name,
              item.lastName,
              item.phone,
              item.image,
              item.email,
              item.rol,
              item.id,
              item.password
            )
        );

        return new UsersResult(users);
      });
  }
}

export default UsersDatasourceImp;
