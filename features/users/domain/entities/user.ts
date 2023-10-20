// define la entidad User
class User {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    rol: string;

    constructor(
        id: number,
        name: string,
        lastName: string,
        phone: string,
        email: string,
        password: string,
        rol: string
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password,
        this.rol = rol;
    }
}
export default User;
