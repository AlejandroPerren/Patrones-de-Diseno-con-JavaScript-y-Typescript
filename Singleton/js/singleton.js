class Singleton {
    // Método para obtener la instancia única
    getInstance() {
        return Singleton.instance;
    }

    constructor() {
        this.random = Math.random(); // Se genera un valor aleatorio al crear la instancia

        // Si ya existe una instancia, devuelve la instancia existente
        if (Singleton.instance) {
            return Singleton.instance;
        }

        // Si no existe, guarda la nueva instancia en la propiedad estática
        Singleton.instance = this;
    }
}

// Crear la primera instancia del Singleton
const singleton = new Singleton();

// Intentar crear otra instancia (retornará la existente)
const singleton2 = new Singleton();

// Llamar al método getInstance() correctamente
const singleton3 = singleton.getInstance();

console.log(singleton.random); // Imprime el valor aleatorio de la primera instancia
console.log(singleton2.random); // Imprime el mismo valor porque es la misma instancia
console.log(singleton3.random); // Imprime el mismo valor porque es la misma instancia
console.log(singleton === singleton2); // true, porque ambas variables apuntan a la misma instancia
console.log(singleton2 === singleton3); // true, porque ambas variables apuntan a la misma instancia



// Caso Practicos
class WeekDays {
    //Dias en Español
    daysEs = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
    ];
    //Dias en Ingles
    daysEn=[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Sunday"
    ];

    constructor(lang){
        this.lang = lang;
        if(WeekDays.instace){
            return WeekDays.instace;
        }

        WeekDays.instance = this;
    }
    getDays(){
        return this.lang === "es" ?
        this.daysEs :
        this.daysEn;
    }
}

//Si cambias el llamada a "en" el valor no va a cambiar porque Singlenton mantiene el primer estado al que fue llamado
const weekDays = new WeekDays("es");
const weekDays2 = new WeekDays("en");

console.log(weekDays.getDays());
console.log(weekDays.getDays());