import User from "../Models/User.ts";

class Authorization{
    hasPermission(user : User){
        if(user.getRole() === "user" || user.getRole() === "admin"){
            console.log("Authorized user");
        }
        else{
            console.log("un-authorized user");
        }
    }
}