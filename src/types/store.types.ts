export interface StoreInput {
    name: string;
    email: string;
    address: string;
    ownerId?: number;
}

export interface UpdateStore {
    name?: string;
    email?: string;
    address?: string;
    ownerId?: number;
}