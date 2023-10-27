import User from "./user";

class AddUsersResult {
    user?: User;
    error?: boolean;
    message: string;
    errors?: {
      error: string,
      field: string
    } [] | null;
    
    constructor(
      message: string,
      user: User,
    ){        
      this.message = message
      this.user = user;
    }
}
export default AddUsersResult;
