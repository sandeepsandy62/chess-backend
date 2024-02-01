class User{
    private id : string ;
    private username : string;
    private password : string;
    private role : string;

    constructor(id:string , username:string , password : string , role:string){
        this.id = id ;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    getUsername() : string {
        return this.username;
    }

    setUsername(username : string) : void {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password : string) : void {
        this.password = password;
    }

    getId() : string {
        return this.id;
    }

    setId(id : string) : void {
        this.id = id;
    }

    getRole() : string {
        return this.role;
    }

    setRole(role : string) : void {
        this.role = role;
    }

}

export default User;