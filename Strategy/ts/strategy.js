var LoginContext = /** @class */ (function () {
    function LoginContext(strategy) {
        this.setStrategy(strategy);
    }
    LoginContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    LoginContext.prototype.login = function (user, password) {
        return this.strategy.login(user, password);
    };
    return LoginContext;
}());
var LoginDBStrategy = /** @class */ (function () {
    function LoginDBStrategy() {
    }
    LoginDBStrategy.prototype.login = function (user, password) {
        console.log("Nos dirigimos a la base de datos");
        if (user === "admin" && password === "entra") {
            return true;
        }
        return false;
    };
    return LoginDBStrategy;
}());
var LoginServicesStrategy = /** @class */ (function () {
    function LoginServicesStrategy() {
    }
    LoginServicesStrategy.prototype.login = function (user, password) {
        console.log("Nos dirigimos a un servicio de Autentificacion");
        if (user === "admin" && password === "entra") {
            return true;
        }
        return false;
    };
    return LoginServicesStrategy;
}());
var auth = new LoginContext(new LoginDBStrategy());
var response = auth.login("admin", "entra");
auth.setStrategy(new LoginServicesStrategy());
auth.login("admin", "entra");
// console.log(response)
