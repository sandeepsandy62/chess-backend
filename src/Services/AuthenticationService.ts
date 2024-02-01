import User from "../Models/User.ts";

export class AuthService{
    private users: User[];

    register(user:User) : void{
        this.users.push(user);
        console.log("User Registered!!");
    }

    login(username: string , password : string) : void{
        var foundUser = this.users.find((user) => user.getUsername() === username && user.getPassword() === password);
        if(foundUser != undefined){
            console.log("login successfull");
        }else{
            console.log("Invalid credentials") ;
        }
    }

    logout(username:string): void{
        var loggedOutUserIndex = this.users.findIndex((user) => user.getUsername() === username);
        var loggedOutUser = this.users.splice(loggedOutUserIndex,1);
        console.log("Logged out : " , loggedOutUser);
        console.log("users");
        this.users.map((user)=>(console.log(user)))
    }

}

export default AuthService;