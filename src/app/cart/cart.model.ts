export class CartItem {
    itemID: number;
    itemName: string;
    categoryID: number;
    itemPrice: number;
    itemImageURL: string;
    itemCount: number;

    constructor(itemID: number, itemName:string, categoryID:number, itemPrice:number, itemImageURL:string, itemCount:number) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.categoryID = categoryID;
        this.itemPrice = itemPrice;
        this.itemImageURL = itemImageURL;
        this.itemCount = itemCount;
    }
}