// Interfaz "Strategy" que define el contrato común para las estrategias de login
interface Strategy {
    // Método que todas las estrategias deben implementar
    login(user: string, password: string): boolean;
}

// Clase "LoginContext" que actúa como el contexto para manejar estrategias de login
class LoginContext {
    // Almacena la estrategia actual que se está utilizando
    private strategy: Strategy;

    // Constructor que inicializa el contexto con una estrategia específica
    constructor(strategy: Strategy) {
        this.setStrategy(strategy); // Se asigna la estrategia inicial
    }

    // Método para cambiar la estrategia en tiempo de ejecución
    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    // Método que utiliza la estrategia actual para realizar el login
    login(user: string, password: string): boolean {
        return this.strategy.login(user, password); // Llama al método `login` de la estrategia asignada
    }
}

// Clase concreta "LoginDBStrategy" que implementa la interfaz "Strategy"
// Esta estrategia realiza el login simulando el acceso a una base de datos
class LoginDBStrategy implements Strategy {
    login(user: string, password: string): boolean {
        console.log("Nos dirigimos a la base de datos"); // Mensaje para indicar que esta estrategia se está ejecutando
        if (user === "admin" && password === "entra") { // Simula la validación de credenciales
            return true; // Devuelve true si las credenciales coinciden
        }
        return false; // Devuelve false en caso contrario
    }
}

// Clase concreta "LoginServicesStrategy" que implementa la interfaz "Strategy"
// Esta estrategia realiza el login simulando el acceso a un servicio de autenticación
class LoginServicesStrategy implements Strategy {
    login(user: string, password: string): boolean {
        console.log("Nos dirigimos a un servicio de Autenticación"); // Mensaje para indicar que esta estrategia se está ejecutando
        if (user === "admin" && password === "entra") { // Simula la validación de credenciales
            return true; // Devuelve true si las credenciales coinciden
        }
        return false; // Devuelve false en caso contrario
    }
}

// Se crea una instancia del contexto con la estrategia "LoginDBStrategy"
const auth = new LoginContext(new LoginDBStrategy());
// Se realiza un login utilizando la estrategia actual (base de datos)
const response = auth.login("admin", "entra");

// Cambiamos la estrategia a "LoginServicesStrategy" en tiempo de ejecución
auth.setStrategy(new LoginServicesStrategy());
// Se realiza otro login utilizando la nueva estrategia (servicio de autenticación)
auth.login("admin", "entra");

// Imprimimos el resultado del primer intento de login
console.log(response);
