// Clase base: ProductComponent
// Representa un producto básico con un nombre.
class ProductComponent {
    constructor(name) {
        this.name = name; // Propiedad del producto: su nombre.
    }

    // Método que devuelve los detalles del producto (en este caso, solo el nombre).
    getDetail() {
        return `${this.name}`;
    }
}

// Clase base decoradora: ProductDecorator
// Es la base para crear decoradores. Recibe un componente (producto) y delega su comportamiento.
class ProductDecorator {
    constructor(productComponent) {
        this.productComponent = productComponent; // Guarda la referencia al componente original.
    }

    // Método que delega la funcionalidad al componente original.
    getDetail() {
        return this.productComponent.getDetail();
    }
}

// Decorador concreto: CommercialInfoProductDecorator
// Añade información comercial al producto, como el nombre comercial y la marca.
class CommercialInfoProductDecorator extends ProductDecorator {
    constructor(productComponent, tradename, brand) {
        super(productComponent); // Llama al constructor de la clase decoradora base.

        // Añade propiedades específicas del decorador.
        this.tradename = tradename; // Nombre comercial del producto.
        this.brand = brand;         // Marca del producto.
    }

    // Sobrescribe el método getDetail para añadir la información comercial.
    getDetail() {
        return `${this.tradename} ${this.brand} ` + super.getDetail();
    }
}

// Decorador concreto: StoreProductDecorator
// Añade información sobre el precio del producto.
class StoreProductDecorator extends ProductDecorator {
    constructor(productComponent, price) {
        super(productComponent); // Llama al constructor de la clase decoradora base.

        // Añade una propiedad para el precio.
        this.price = price;
    }

    // Sobrescribe el método getDetail para añadir el precio al detalle del producto.
    getDetail() {
        return super.getDetail() + ` ${this.price}`;
    }
}

// Decorador concreto: HTMLInfoProductDecorator
// Formatea la información del producto en HTML.
class HTMLInfoProductDecorator extends ProductDecorator {
    // Sobrescribe el método getDetail para devolver un formato HTML.
    getDetail() {
        return `<h1>Información del Producto</h1>
        <p>${super.getDetail()}</p>
        `;
    }
}

// Se crea un producto básico.
const productComponent = new ProductComponent("Cerveza");
console.log(productComponent.getDetail());
// Resultado: "Cerveza" (nombre básico del producto).

// Se aplica el decorador CommercialInfoProductDecorator para añadir información comercial.
const commercialInfoProduct = new CommercialInfoProductDecorator(
    productComponent,
    "London Porter",
    "Fuller's"
);
console.log(commercialInfoProduct.getDetail());
// Resultado: "London Porter Fuller's Cerveza"

// Se aplica el decorador StoreProductDecorator para añadir el precio al producto.
const storeProduct = new StoreProductDecorator(productComponent, 15.5);
console.log(storeProduct.getDetail());
// Resultado: "Cerveza 15.5"

// Combinación de decoradores:
// Se decora el producto con información comercial y después se añade el precio.
const product = new StoreProductDecorator(commercialInfoProduct, 15.5);
console.log(product.getDetail());
// Resultado: "London Porter Fuller's Cerveza 15.5"

// Decorador para formatear en HTML:
// Se aplica el decorador HTMLInfoProductDecorator al producto con información comercial y precio.
const htmlProductDecorator = new HTMLInfoProductDecorator(product);
document.getElementById("myDiv").innerHTML = htmlProductDecorator.getDetail();
// Resultado (en HTML): 
// <h1>Información del Producto</h1>
// <p>London Porter Fuller's Cerveza 15.5</p>
