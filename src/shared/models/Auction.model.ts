export interface Auction {
    name: string;
    startdate?: string;
    startTime?: string;
    endTime?: string;
    endDate?: string;
    description: string;
    id: number;
    statusCode: number;
    displayStatusCode: string;
}

export interface SupplierAuction extends Auction{
    createdBy?: any;
    isAccepted: boolean;
    isRejected: boolean;
    isInvited: boolean;
}