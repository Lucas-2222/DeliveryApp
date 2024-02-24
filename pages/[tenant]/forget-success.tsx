import styles from '../../styles/ForgetSuccess.module.css';
import { GetServerSideProps,  } from 'next';
import { useApi } from '@/libs/useApi';
import { useEffect, useState } from 'react';
import { Tenant } from '@/types/Tenant';
import { useAppContext } from '@/contexts/app';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { useRouter } from 'next/router';
import { Icon } from '@/components/Icon';

const ForgetSuccess = (data: Prop) => {
  const { tenant, setTenant } = useAppContext();
  useEffect(()=>{
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

    const handleSubmit = () => {
          router.push(`/${data.tenant.slug}/login`)
    }
    
 
  return (
    <div className={styles.container}>
        <Head>
            <title>Recuperar senha | {data.tenant.name}</title>
        </Head>

        <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

        <div className={styles.iconArea}>
          <Icon icon='mailSent' color={data.tenant.mainColor} width={99} height={81}/>
        </div>

        <div className={styles.title}>Verificar e-mail</div>

        <div className={styles.subtitle}>
          Enviamos as instruções para recuperação de senha para o seu e-mail.</div>


            <div className={styles.inputArea}>
                <Button 
                  color={data.tenant.mainColor}
                  label='Fazer Login'
                  onClick={handleSubmit}
                  fill
                />
            </div>
    </div>
  );
}

export default ForgetSuccess;

type Prop = {
  tenant: Tenant;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();
  if(!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  }
  
  return {
     props: {
        tenant
     }
  }
}