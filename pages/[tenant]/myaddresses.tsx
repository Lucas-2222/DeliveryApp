import styles from '@/styles/Myadresses.module.css';
import { GetServerSideProps,  } from 'next';
import { useApi } from '@/libs/useApi';
import { useEffect, useState } from 'react';
import { Tenant } from '@/types/Tenant'; 
import { useAppContext } from '@/contexts/app';
import { Product } from '@/types/Product';
import { getCookie, setCookie } from "cookies-next";
import { User } from '@/types/User';
import { useAuthContext } from '@/contexts/auth';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { useFormater } from '@/libs/useFormatter';
import { CartItem } from '@/types/CartItem';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Address } from '@/types/Address';
import { AddressItem } from '@/components/AddressItem';

const MyAddresses = (data: Props) => {
  const { setToken, setUser } = useAuthContext();
  const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext();
  const api = useApi(data.tenant.slug);

  const formatter = useFormater();
  const router = useRouter();

  const handleAddressSelect = async (address: Address) => {
    const price = await api.getShippingPrice(address);
    if(price) {
        setShippingAddress(address);
        setShippingPrice(price);
        router.push(`/${data.tenant.slug}/checkout`)
    }
  }

  const handleAddressEdit = (id: number) => {
    router.push(`/${data.tenant.slug}/address/${id}`)
  }

  const handleAddressDelete = async (id: number) => {
    await api.deleteUserAddress(id);
    router.reload();
  }

  const handleNewAddress = () => {
    router.push(`/${data.tenant.slug}/address/new`)
  }

  const [menuOpened, setMenuOpened] = useState(0);
  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName;
    if(!['path' , 'icon'].includes(tagName)) {
        setMenuOpened(0);
    }
  }
  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent);
    window.addEventListener('click', handleMenuEvent);
    return () => window.removeEventListener('click', handleMenuEvent);
  }, [menuOpened])

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user)
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços | {data.tenant.name}</title>
      </Head>

      <Header 
        backHref={`/${data.tenant.slug}/checkout`}
        color={data.tenant.mainColor}
        title='Meus Endereços'
      />

        <div className={styles.list}>
            {data.addresses.map((item, index) => (
                <AddressItem 
                    key={index}
                    color={data.tenant.mainColor}
                    address={item}
                    onSelect={handleAddressSelect}
                    onEdit={handleAddressEdit}
                    onDelete={handleAddressDelete}
                    menuOpened={menuOpened}
                    setMenuOpened={setMenuOpened}
                />
            ))}
        </div>

        <div className={styles.btnArea}>
            <Button
                color={data.tenant.mainColor}
                label='Novo Endereço'
                onClick={handleNewAddress}
                fill
            
            />
        </div>

      </div>
  );
}

export default MyAddresses;

type Props = {
    tenant: Tenant;
    products: Product[];
    token: string;
    user: User | null;
    addresses: Address[];
}
export const getServerSideProps: GetServerSideProps = async (context) => {
 
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/myaddress', permanent: false } }
  }

  let token = getCookie('token', context);
  if(!token) token = null; 

  const user = await api.authorizeToken(token as string);
  if(!user) {
    return {redirect: { destination: '/login', permanent: false} }
  }

  const addresses = await api.getUserAddresses(user.email);

  const cartCookie = getCookie('cart', context);
  const cart = await api.getCartProducts(cartCookie as string);

  return {
    props: {
      tenant,
      user,
      token,
      addresses
    }
  }
}