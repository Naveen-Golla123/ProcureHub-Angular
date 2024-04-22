export interface Supplier {
    id: number;
    name: string;
    partnerName: string;
    email: string;
    priceReview?: number | undefined;
    deliveryReview?: number | undefined;
    qualityReview?: number | undefined;
}