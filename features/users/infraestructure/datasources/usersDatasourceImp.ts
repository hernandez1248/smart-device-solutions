import UsersDatasource from "../../domain/datasources/usersDatasource";
import User from "../../domain/entities/user";
import UsersResult from "../../domain/entities/usersResult";

class UsersDatasourceImp extends UsersDatasource {
  async getUsers(): Promise<UsersResult> {
    //Mandar a cargar la lista de personajes desde la api
    //usando fetch

    return fetch("http://192.168.4.12:3000/api/users")
      .then((response) => response.json())
      .then((response) => {
        const users = response.map(
          (item: any) =>
            new User(
              item.id,
              item.name,
              item.lastName,
              item.phone,
              item.email,
              item.password,
              item.rol
            )
        );

        return new UsersResult(users);
      });
  }
}

export default UsersDatasourceImp;
