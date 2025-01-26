interface Strategy{
    login(user: string, password: string) : boolean;

}


class LoginContext{

    private strategy: Strategy;

    constructor(strategy: Strategy){
        this.setStrategy(strategy)
    }
    setStrategy(strategy: Strategy){
        this.strategy = strategy
    }

    login(user: string, password:string):boolean{
        return this.strategy.login(user, password);
    }
}


class LoginDBStrategy implements Strategy{
    login(user: string, password:string):boolean{
        console.log("Nos dirigimos a la base de datos");
        if(user === "admin" && password === "entra"){
            return true;
        }
        return false;
    }
}


class LoginServicesStrategy implements Strategy{
    login(user: string, password:string):boolean{
        console.log("Nos dirigimos a un servicio de Autentificacion");
        if(user === "admin" && password === "entra"){
            return true;
        }
        return false;
    }
}


const auth = new LoginContext(new LoginDBStrategy());
const response = auth.login("admin", "entra");

auth.setStrategy(new LoginServicesStrategy());
auth.login("admin", "entra")


console.log(response)