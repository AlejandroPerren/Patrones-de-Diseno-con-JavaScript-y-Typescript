interface Component{
    getDetail(): string;
}


class ProductsComponent implements Component{
    protected name: string;

    constructor(name: string){
        this.name = name;
    }
    public getDetail(): string {
        return `${this.name}`
    }
}

abstract class ProductsDecorator implements Component{
    protected component: Component;

    constructor(component: Component){
        this.component = component;
    }

    public getDetail(): string {
        return this.component.getDetail()
    }

}


class CommercialInfoProductsDecorator extends ProductDecorator {
    private tradname: string;
    private brand: string;

    constructor(component: Component, tradname: string, brand: string) {
        super(component);
        this.tradname = tradname;
        this.brand = brand;
    }

    public getDetail(): string {
        return `${this.tradname} ${this.brand} - ${super.getDetail()}`;
    }
}

class StoreProductsDecorator extends ProductsDecorator{
    private price: number;

    constructor(component: Component, price: number){
        super(component);
        this.price = price;
    }

    public getDetail(): string {
        return super.getDetail()+ `${this.price}`
    }

}


const productsComponent = new ProductsComponent("Cerveza");
console.log(productsComponent.getDetail())


const commercialInfoProducts = new CommercialInfoProductsDecorator(productsComponent, "London Porter", "Fullers")
console.log(commercialInfoProducts.getDetail())

const storeProducts = new StoreProductsDecorator(productsComponent, 15.5);
console.log(storeProducts.getDetail())


const storeProducts2 = new StoreProductsDecorator(commercialInfoProducts, 15.5);
console.log(storeProducts2.getDetail());
