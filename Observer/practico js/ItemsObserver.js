// Clase principal "Subject" que gestiona una lista de observadores
class Subject {

    constructor() {
        // Inicializamos el array de observadores
        this.observers = [];
    }

    // Método para suscribir un observador
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Método para desuscribir un observador
    unsubscribe(observer) {
        // Eliminamos el observador del array
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Método para notificar a todos los observadores
    notify(data) {
        // Llamamos al método `refresh` de cada observador, pasándoles los datos
        this.observers.forEach(e => {
            e.refresh(data);
        });
    }
}

// Clase "ItemsSubject", que extiende la funcionalidad de `Subject` para manejar una lista de datos
class ItemsSubject extends Subject {
    constructor() {
        super(); // Llamamos al constructor de la clase padre
        this.data = []; // Inicializamos un array para almacenar los datos
    }

    // Método para agregar un nuevo elemento a la lista de datos
    add(item) {
        this.data.push(item); // Añadimos el nuevo elemento al array
        this.notify(this.data); // Notificamos a todos los observadores con la lista actualizada
    }
}

// Clase "HtmlElementObserver", que representa un observador vinculado a un elemento HTML
class HtmlElementObserver {
    constructor(element) {
        this.element = element; // Guardamos el elemento HTML asociado
    }

    // Método que actualiza el contenido del elemento HTML con los datos proporcionados
    refresh(data) {
        this.element.innerHTML = data.reduce((ac, e) => {
            return ac + `<p>${e}</p>`; // Agregamos cada elemento como un párrafo
        }, "");
    }
}

// Clase genérica "Observer" para observadores personalizados
class Observer {
    constructor(fn) {
        this.fn = fn; // Guardamos la función que se ejecutará al refrescarse
    }

    // Método para ejecutar la función asociada con los datos actualizados
    refresh(data) {
        this.fn(data);
    }
}

// Creamos una instancia de `ItemsSubject` para gestionar una lista de elementos
const items = new ItemsSubject();

// Creamos un observador vinculado al elemento HTML `div1`
const div1Observer = new HtmlElementObserver(div1);

// Creamos un observador vinculado al elemento HTML `div2`
const div2Observer = new HtmlElementObserver(div2);

// Creamos un observador personalizado que actualiza el contenido de `div3` con la longitud de los datos
const observer1 = new Observer((data) => {
    div3.innerHTML = data.length; // Mostramos el número de elementos en el array
});

// Suscribimos los tres observadores a la instancia de `ItemsSubject`
items.subscribe(div1Observer);
items.subscribe(div2Observer);
items.subscribe(observer1);

// Función que se ejecuta cuando se agrega un nuevo elemento (por ejemplo, desde un formulario)
function add() {
    const name = txtName.value; // Obtenemos el valor del input `txtName`
    items.add(name); // Agregamos el nuevo elemento a la lista de datos
}
