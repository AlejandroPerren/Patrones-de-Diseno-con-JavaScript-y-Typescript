// La clase Salecontext es el "contexto" que utiliza una estrategia específica para calcular un monto.
class Salecontext {
    constructor(strategy) {
        // Se inicializa con una estrategia concreta que implementará el cálculo.
        this.strategy = strategy;
    }

    // Método para cambiar la estrategia en tiempo de ejecución.
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    // Método que calcula el monto utilizando la estrategia actualmente definida.
    calculate(amount) {
        return this.strategy.calculate(amount);
    }
}

// Estrategia concreta para ventas regulares, aplica un impuesto al monto.
class RegularSaleStrategy {
    constructor(tax) {
        this.tax = tax; // Impuesto en forma de porcentaje (por ejemplo, 0.16 = 16%).
    }

    // Calcula el monto sumando el impuesto al monto base.
    calculate(amount) {
        return amount + (amount * this.tax);
    }
}

// Estrategia concreta para ventas con descuento, aplica un impuesto y luego resta un descuento fijo.
class DiscountSaleStrategy {
    constructor(tax, discount) {
        this.tax = tax; // Impuesto en porcentaje.
        this.discount = discount; // Descuento fijo.
    }

    // Calcula el monto aplicando el impuesto y luego descontando el descuento.
    calculate(amount) {
        return amount + (amount * this.tax) - this.discount;
    }
}

// Estrategia concreta para ventas en el extranjero, convierte el monto a dólares.
class ForeignSaleStrategy {
    // Calcula el monto convirtiéndolo según el precio del dólar actual.
    calculate(amount) {
        return amount * this.getDollarPrice();
    }

    // Devuelve el precio del dólar (en este caso, un valor fijo de 20).
    getDollarPrice() {
        return 20;
    }
}

// Instancia de la estrategia para ventas regulares (16% de impuesto).
const regularSale = new RegularSaleStrategy(0.16);

// Instancia de la estrategia para ventas con descuento (16% de impuesto y 3 unidades de descuento).
const discountSale = new DiscountSaleStrategy(0.16, 3);

// Instancia de la estrategia para ventas en el extranjero (precio en dólares).
const foreignSale = new ForeignSaleStrategy();

// Creación del contexto de ventas y asignación de la estrategia regular.
const sale = new Salecontext(regularSale);

// Cálculo usando la estrategia regular.
console.log(sale.calculate(10)); // Resultado: 11.6 (10 + 16% de impuesto).

// Cambio a la estrategia de descuento y cálculo.
sale.setStrategy(discountSale);
console.log(sale.calculate(10)); // Resultado: 8.6 (10 + 16% de impuesto - 3 de descuento).

// Cambio a la estrategia de ventas en el extranjero y cálculo.
sale.setStrategy(foreignSale);
console.log(sale.calculate(10)); // Resultado: 200 (10 convertido a dólares con precio de 20).


//caso Practico
// Definición de datos de ejemplo
const data = [
    {
        name: "Erdinger Pikantus", // Nombre de la cerveza
        country: "Alemania",       // País de origen
        info: "Erdinger Pikantus es una cerveza de estilo weizenbock elaborada en la localidad bávara de Erding.", // Descripción
        img: "dxjcdxuv6chk2.cloudfront.net/assets/biere/flascheglas/pikantus-2020-v2.png" // URL de la imagen
    },
    {
        name: "Corona",
        country: "México",
        info: "La cerveza Corona es una marca mundialmente conocida, distribuida a lo largo de más de 159 países en los cinco continentes.",
        img: "upload.wikimedia.org/wikipedia/commons/0/0c/Corona-6Pack.JPG"
    },
    {
        name: "Delirium Tremens",
        country: "Bélgica",
        info: "Esta pale ale tiene una efervescencia fina con un toque un tanto picante. Al tomarse, calienta el paladar y deja un sabor fuerte y de un amargor seco.",
        img: "www.delirium.be/themes/custom/delirium/assets/img/beers/beer_delirium_tremens_bottle.png"
    }
];

// Clase que define el contexto del patrón Strategy
class InfoContext {
    constructor(strategy, data, element) {
        this.setStrategy(strategy); // Establece la estrategia inicial
        this.data = data;           // Datos a utilizar
        this.element = element;     // Elemento HTML donde se mostrará la información
    }

    // Método para cambiar la estrategia de forma dinámica
    setStrategy(strategy) {
        this.strategy = strategy;
    }

    // Llama al método `show` de la estrategia actual para mostrar los datos
    show() {
        this.strategy.show(this.data, this.element);
    }
}

// Estrategia que muestra solo una lista básica con el nombre y el país de la cerveza
class ListStrategy {
    show(data, element) {
        // Genera el contenido HTML para cada cerveza y lo asigna al elemento
        element.innerHTML = data.reduce((ac, beer) => {
            return ac + `<div>
                <h2>${beer.name}</h2>
                <p>${beer.country}</p>
            </div>
            <hr>`;
        }, ""); // Comienza con un string vacío y acumula contenido
    }
}

// Estrategia que muestra una lista detallada con nombre, país y descripción
class DetailedListStrategy {
    show(data, element) {
        // Genera el contenido HTML con información más detallada
        element.innerHTML = data.reduce((ac, beer) => {
            return ac + `<div>
                <h2>${beer.name}</h2>
                <p>${beer.country}</p>
                <p>${beer.info}</p>
            </div>
            <hr>`;
        }, "");
    }
}

// Estrategia que muestra una lista con imágenes además del nombre de la cerveza
class ListWhitImageStrategy {
    show(data, element) {
        // Genera el contenido HTML que incluye imágenes
        element.innerHTML = data.reduce((ac, beer) => {
            return ac + `<div>
                <img width="10%" src="https://${beer.img}">
                <h2>${beer.name}</h2>
            </div>
            <hr>`;
        }, "");
    }
}

// Array que contiene todas las estrategias disponibles
const strategies = [
    new ListStrategy(),          // Estrategia básica
    new DetailedListStrategy(),  // Estrategia detallada
    new ListWhitImageStrategy()  // Estrategia con imágenes
];

// Crear una instancia de InfoContext con la estrategia inicial `ListStrategy`
const info = new InfoContext(new ListStrategy(), data, content);

// Muestra la información inicial con la estrategia básica
info.show();

// Añade un event listener al selector (slcOptions) para cambiar la estrategia al seleccionar una opción
slcOptions.addEventListener("change", (event) => {
    const op = event.target.value;      // Obtiene el valor seleccionado
    info.setStrategy(strategies[op]);  // Cambia la estrategia basada en la opción seleccionada
    info.show();                       // Muestra los datos usando la nueva estrategia
});
