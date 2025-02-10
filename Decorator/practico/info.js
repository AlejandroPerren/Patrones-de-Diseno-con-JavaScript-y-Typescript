// Clase base que obtiene datos desde una URL
class ClientComponent {
    constructor(url) {
        this.url = url; // Almacena la URL del API
    }

    async getData() {
        const res = await fetch(this.url); // Realiza una solicitud HTTP GET a la URL
        const data = await res.json(); // Convierte la respuesta a formato JSON
        return data; // Retorna los datos obtenidos
    }
}

// Clase decoradora base que extiende la funcionalidad de ClientComponent
class ClientDecorator {
    constructor(clientComponent) {
        this.clientComponent = clientComponent; // Almacena una instancia de ClientComponent
    }

    async getData() {
        return await this.clientComponent.getData(); // Llama al método getData de la instancia decorada
    }
}

// Decorador que convierte los títulos de los elementos a mayúsculas
class UpperCaseClientDecorator extends ClientDecorator {
    async getData() {
        const data = await super.getData(); // Obtiene los datos originales
        return data.map(e => {
            e.title = e.title.toUpperCase(); // Convierte el título a mayúsculas
            return e;
        });
    }
}

// Decorador que envuelve el título en una etiqueta <h1> y convierte la URL de la imagen en una etiqueta <img>
class HTMLClientDecorator extends ClientDecorator {
    async getData() {
        const data = await super.getData(); // Obtiene los datos decorados previamente
        return data.map(e => {
            e.title = `<h1>${e.title}</h1>`; // Envuelve el título en una etiqueta <h1>
            e.thumbnailUrl = `<img src="${e.thumbnailUrl}" alt="Image">`; // Corrige el nombre de la propiedad y la estructura de la etiqueta <img>
            return e;
        });
    }
}

(async () => {
    const url = "https://jsonplaceholder.typicode.com/photos";
    const client = new ClientComponent(url); // Instancia de la clase base
    
    const upperClient = new UpperCaseClientDecorator(client); // Aplica el decorador de mayúsculas
    const htmlClient = new HTMLClientDecorator(upperClient); // Aplica el decorador de HTML
    
    const data = await htmlClient.getData(); // Obtiene los datos transformados
    
    // Obtiene el contenedor donde se insertará el contenido
    const divContent1 = document.querySelector(".divContent1");
    
    // Inserta los elementos en el div, concatenando títulos e imágenes
    divContent1.innerHTML = data.reduce((ac, e) => ac + e.title + e.thumbnailUrl, "");
})();
