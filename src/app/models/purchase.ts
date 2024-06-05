export interface IPurchase {
    id?: number;
    clientId: number;
    productId: number;
    purchaseDate: string;
    isApproved: boolean;
}