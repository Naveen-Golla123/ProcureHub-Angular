export interface Lot {
    name: string;
    description: string;
    items: Item[];
    totalPrice: number;
    id:number;
}

export interface Item {
    name: string;
    basePrice: number;
    quantity: number;
    UiId: number;
    _id:number;
    callback: any;
}