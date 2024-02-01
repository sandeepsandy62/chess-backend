import User from "../Models/User.ts";
import { AuthService } from "../Services/AuthenticationService.ts";


export const loginController = () :void => {
    const authService = new AuthService();

    const user = new User("1","sandeep","123","user");

    authService.register(user);
    authService.login("sandeep","123");
    authService.logout(user.getUsername());

};

loginController();