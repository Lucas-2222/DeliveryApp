import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useFormater } from '@/libs/useFormatter';

type Props = {
    color: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
    small?: boolean;
}

export const Quantity = ({color, onUpdateCount, max, small, count, min}: Props) => {
    
    const formater = useFormater();

    const [canRemove, setCanRemove] = useState(false);
    const [canAdd, setCanAdd] = useState(false);

    useEffect(()=>{
        setCanRemove((!min || (min && count > min)) ? true : false);
        setCanAdd((!max || (max && count < max)) ? true : false)
    }, [count, min, max]);

    const handleRemove = () => {
        if(canRemove) onUpdateCount(count - 1);
    }

    const handleAdd = () => {
        if(canAdd) onUpdateCount(count + 1);
    }

    return (
        <div className={styles.container}>
            <div 
                className={styles.button}
                onClick={handleRemove}
                style={{
                    color: canRemove ? '#FFF' : '#96A3Ab',
                    backgroundColor: canRemove ? color: '#F2F4F5',
                    width: small ? 42 : 48,
                    height: small ? 42 : 48
                }}
            >-</div>

            <div 
                className={styles.qt}
                style={{fontSize: small ? 16 : 18}}
            >{formater.formatQuantity( count, 2 )}</div>

            <div 
                className={styles.button}
                onClick={handleAdd}
                style={{
                    color: canAdd ? '#FFF' : '#96A3Ab',
                    backgroundColor: canAdd ? color: '#F2F4F5',
                    width: small ? 42 : 48,
                    height: small ? 42 : 48
                }}
            >+</div>
        </div>
    )
}

