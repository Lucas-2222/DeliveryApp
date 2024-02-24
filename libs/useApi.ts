import { Address } from "@/types/Address";
import { CartItem } from "@/types/CartItem";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import { Tenant } from "@/types/Tenant";
import { User } from "@/types/User";

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/tmp/burguer.png', 
    categoryName: 'Tradicional', 
    name: 'Texas Burguer', 
    price:  25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

const TEMPORARYOrder: Order = {
    id: 21,
    status: 'preparing',
    orderData: '2023-07-24',
    userid: '232',
    shippingAddress: {
        id: 23,
        street: 'Rua Nana Linda',
        state: 'RJ',
        cep: '99999999',
        city: 'Magé',
        neighborhood: 'Manduca',
        number: '231',

    },
    shippingPrice: 9.20,
    paymentType: 'card',
    cupom: 'AMONANA',
    cupomDiscount: 15.29,
    products: [
        { product: { ...TEMPORARYoneProduct, id: 1 }, qt: 1 },
    ],
    subtotal: 111.2,
    total: 95.91
}

export const useApi = (tenantSlug: string) => ({
    getTenant: async () => {
        switch (tenantSlug) {
            case 'b7burguer':
                return {
                    slug: 'b7burguer',
                    name: 'B7Burguer',
                    mainColor: ' #FB9400',
                    secondColor: '#FFF9F2'
                };
            case 'b7pizza':
                return {
                    slug: 'b7pizza',
                    name: 'B7Pizza',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0'
                };
            default:
                return false;
        }
    },

    getAllProducts: async () => {
        let products = [];
        for(let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1
            });
        }
        return products;
    },

    getProduct: async (id: number) => {
        return {...TEMPORARYoneProduct, id };
    },
    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false;

        return {
            name:'Lucas',
            email:'lucas@salato.com.br'
        }
    },
    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = [];
        if(!cartCookie) return cart;

        const cartJson = JSON.parse(cartCookie);
        for(let i in cartJson) {
            if(cartJson[i] && cartJson[i].qt) {
                const product = {
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id
                };
                cart.push({
                    qt: cartJson[i].qt,
                    product
                })
            }
        }

        return cart;
    },

    getUserAddresses: async (email: string) => {
        const addresses: Address[] = [];

        for(let i=0; i < 4; i++) {
            addresses.push({
                id: i + 1,
                street: 'Rua Flor De Lotus',
                number: `${i + 1}00`,
                cep: '999999',
                city: 'São Paulo',
                neighborhood: 'Jequiti',
                state: 'SP'
            })
        }

        return addresses;
    },
    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Rua Flor De Lotus',
            number: `${addressid}00`,
            cep: '999999',
            city: 'São Paulo',
            neighborhood: 'Jequiti',
            state: 'SP'
        }
        return address;
    },

    addUserAddress: async (address: Address) => {
        return { ...address, id: 9 }
    },

    editUserAddress: async (newAddressData: Address) => {
        return true;
    },

    deleteUserAddress: async (addresid: number) => {
        return true;
    },

    getShippingPrice: async (address: Address) => {
        return 9.20;
    },
    setOrder: async (
        address: Address,
        paymentType: 'cash' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]
    ) => {
        return TEMPORARYOrder;
    },
    getOrder: async (orderid: number) => {
        return TEMPORARYOrder;
    }
});