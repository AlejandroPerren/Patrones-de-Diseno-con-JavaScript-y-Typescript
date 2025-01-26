// Definimos la clase Subject, que actúa como el "sujeto" observado
class Subject {

    constructor() {
        // Inicializamos un array vacío para almacenar los observadores registrados
        this.observers = [];
    }

    // Método para suscribir un nuevo observador
    subscribe(observer) {
        // Añadimos el observador al array de observadores
        this.observers.push(observer);
    }

    // Método para desuscribir un observador
    unsubscribe(observer) {
        // Filtramos el array de observadores para eliminar el que coincide con el pasado como parámetro
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Método para notificar a todos los observadores de un cambio
    notify(data) {
        // Iteramos sobre todos los observadores y ejecutamos su método `refresh`, pasando los datos actualizados
        this.observers.forEach(e => {
            e.refresh(data);
        });
    }
}

// Definimos la clase Observer, que representa a los "observadores"
class Observer {

    constructor(fn) {
        // Guardamos la función que se ejecutará cuando el observador reciba una notificación
        this.fn = fn;
    }

    // Método que se llama para actualizar al observador con los nuevos datos
    refresh(data) {
        // Ejecutamos la función asociada al observador, pasándole los datos actualizados
        this.fn(data);
    }
}

// Creamos una instancia de Subject (el sujeto observado)
const s = new Subject();

// Creamos tres observadores con diferentes comportamientos

// Observador 1: simplemente muestra un mensaje en la consola con los datos
const o1 = new Observer(d => console.log("Soy el observador 1: " + d));

// Observador 2: actualiza el contenido del elemento HTML `div1` con los datos
const o2 = new Observer(d => {
    div1.innerHTML = d;
});

// Observador 3: actualiza el contenido del elemento HTML `div2` con los datos invertidos
const o3 = new Observer(d => {
    div2.innerHTML = d.split("").reverse().join("");
});

// Registramos los observadores 1, 2 y 3 en el sujeto
s.subscribe(o1);
s.subscribe(o2);
s.subscribe(o3);

// Desuscribimos al observador 2, por lo que ya no recibirá notificaciones
s.unsubscribe(o2);

// Función que se ejecuta cuando se detecta un cambio (por ejemplo, al escribir en un input)
function change() {
    // Llamamos al método `notify` del sujeto para informar a los observadores, pasando el valor del input
    s.notify(myText.value);
}
