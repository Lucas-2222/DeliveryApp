import { Address } from "./Address";
import { CartItem } from "./CartItem";

export type Order ={
    id: number;
    status: 'preparing' | 'sent' | 'delivered';
    orderData: string;
    userid: string;
    shippingAddress: Address;
    shippingPrice: number;
    paymentType: 'cash' | 'card',
    paymentChange?: number;
    cupom?: string;
    cupomDiscount?: number;
    products: CartItem[];
    subtotal: number;
    total: number;
}