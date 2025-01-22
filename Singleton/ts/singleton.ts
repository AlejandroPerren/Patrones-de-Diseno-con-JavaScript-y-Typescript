

class SingletonTS{
    private static instance: SingletonTS;

    public random: number;

    private constructor(){
        this.random = Math.random();
    }

    public static getInstance(): SingletonTS{
        if(!this.instance){
            this.instance = new SingletonTS
        }
        return this.instance;
    }
}

const singleton = SingletonTS.getInstance();
const singleton2 = SingletonTS.getInstance();

console.log(singleton.random); // Imprime el número aleatorio generado por la instancia.
console.log(singleton2.random); // Imprime el mismo número, ya que es la misma instancia.
console.log(singleton === singleton2); // true, ya que ambas referencias apuntan a la misma instancia.
