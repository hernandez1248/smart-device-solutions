// define la entidad User
class User {
    id?: number;
    name: string;
    lastName: string;
    phone: string;
    image: string;
    email: string;
    rol: string;
    password?: string;

    constructor(
        name: string,
        lastName: string,
        phone: string,
        image: string,
        email: string,
        rol: string,
        id?: number,
        password?: string,
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.image = image;
        this.email = email;
        this.rol = rol;
        this.password = password;
    }
}
export default User;
