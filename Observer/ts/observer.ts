// Interfaz genérica para los Observadores
interface IObserver<T> {
    // Método que será llamado para actualizar al observador cuando el sujeto notifique un cambio
    refresh(value: T): void;
}

// Interfaz genérica para los Sujetos (Subjects)
interface ISubject<T> {
    // Lista de observadores que están suscritos al sujeto
    observers: IObserver<T>[];

    // Método para suscribir un observador
    subscribe(observer: IObserver<T>): void;

    // Método para desuscribir (eliminar) un observador
    unsubscribe(observer: IObserver<T>): void;

    // Método para notificar a todos los observadores cuando hay un cambio
    notify(value: T): void;
}

// Implementación de la clase genérica Subject que implementa la interfaz ISubject
class Subject<T> implements ISubject<T> {
    // Lista de observadores suscritos
    observers: IObserver<T>[];

    constructor() {
        // Inicializamos la lista de observadores vacía
        this.observers = [];
    }

    // Método para agregar un observador a la lista
    subscribe(observer: IObserver<T>): void {
        this.observers.push(observer);
    }

    // Método para eliminar un observador de la lista
    unsubscribe(observer: IObserver<T>): void {
        // Filtramos la lista para excluir al observador especificado
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Método para notificar a todos los observadores con un nuevo valor
    notify(value: T): void {
        // Recorremos la lista de observadores y ejecutamos su método `refresh`
        this.observers.forEach(e => {
            e.refresh(value);
        });
    }
}

// Implementación de la clase genérica Observer que implementa la interfaz IObserver
class Observer<T> implements IObserver<T> {
    // Función que se ejecutará cuando el observador reciba una notificación
    private fn: (value: T) => void;

    constructor(fn: (value: T) => void) {
        // Almacenamos la función pasada como parámetro
        this.fn = fn;
    }

    // Método que se ejecuta cuando el observador es notificado
    refresh(value: T): void {
        // Llamamos a la función almacenada con el valor recibido
        this.fn(value);
    }
}

// Ejemplo 1: Trabajando con números
const subject = new Subject<number>();

// Creamos dos observadores que realizan diferentes acciones con los números recibidos
const obs1 = new Observer<number>((n) => {
    console.log("hello" + n); // Este observador imprime "hello" seguido del número
});

const obs2 = new Observer<number>((n) => {
    console.log("Hi" + n); // Este observador imprime "Hi" seguido del número
});

// Suscribimos ambos observadores al sujeto
subject.subscribe(obs1);
subject.subscribe(obs2);

// Notificamos a todos los observadores con un valor
subject.notify(1.2); // Ambos observadores recibirán el valor 1.2
subject.notify(30);  // Ambos observadores recibirán el valor 30

// Ejemplo 2: Trabajando con cadenas de texto
const subjectString = new Subject<string>();

// Creamos dos observadores que realizan diferentes acciones con las cadenas de texto recibidas
const obs1String = new Observer<string>((s) => {
    console.log(s.toUpperCase()); // Este observador convierte la cadena a mayúsculas
});

const obs2String = new Observer<string>((s) => {
    console.log(s.toLowerCase()); // Este observador convierte la cadena a minúsculas
});

// Suscribimos ambos observadores al sujeto
subjectString.subscribe(obs1String);
subjectString.subscribe(obs2String);

// Notificamos a todos los observadores con diferentes cadenas
subjectString.notify("ale"); // Ambos observadores reciben "ale" y procesan de forma diferente
subjectString.notify("ALE"); // Ambos observadores reciben "ALE" y procesan de forma diferente
