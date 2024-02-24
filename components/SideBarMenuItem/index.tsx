import styles from './styles.module.css';
import CartIcon from './cart.svg';
import MenuIcon from './menu.svg'; 
import FavIcon from './fav.svg';
import OrderIcon from './orders.svg';
import ConfigIcon from './configs.svg';
import ExitIcon from './exit.svg';

type Props = {
    color: string;
    label: string;
    icon: 'cart' | 'menu' | 'fav' | 'orders' | 'config' | 'exit';
    onClick: () => void;
    disabled: boolean;
}

export const SidebarMenuItem = ({ color, label, disabled, icon, onClick }: Props) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {icon === 'menu' && <MenuIcon color={color} />}
            {icon === 'cart' && <CartIcon color={color} />}
            {icon === 'fav' && <FavIcon color={color} />}
            {icon === 'orders' && <OrderIcon color={color} />}
            {icon === 'config' && <ConfigIcon color={color} />}
            {icon === 'exit' && <ExitIcon color={color} />}            
            <span className={disabled ? styles.disabled : ''}>{label}</span>
        </div>
    )
}