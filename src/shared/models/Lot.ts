export interface Lot {
    name: string;
    description: string;
    items: Item[];
    totalPrice: number;
}

export interface Item {
    name: string;
    basePrice: number;
    qunatity: number;
}