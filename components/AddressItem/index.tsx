import { Address } from '@/types/Address';
import styles from './styles.module.css';
import { Icon } from '../Icon';

type Props = {
    color: string;
    address: Address;
    onSelect: (address: Address) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    menuOpened: number;
    setMenuOpened: (id: number) => void;
}

export const AddressItem = ({ address, color, menuOpened, setMenuOpened, onDelete, onEdit, onSelect}: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.addressArea} onClick={() => onSelect(address)}>
                <div className={styles.addressIcon}>
                    <Icon 
                        color={color}
                        icon='Location'
                        width={24}
                        height={24}
                    />
                </div>
                <div className={styles.addressText}> {`${address.street} ${address.number}, ${address.city}`}</div>
            </div>
                <div className={styles.btnArea}>
                    <div className={styles.menuIcon} onClick={() => setMenuOpened(address.id)}>
                        <Icon 
                            color="#6A7D8B"
                            icon='Options'
                            width={24}
                            height={24}
                        />
                    </div>
                    {menuOpened === address.id &&
                        <div className={styles.popup}>
                            <div className={styles.popupItem} onClick={() => onEdit(address.id)}>
                                <div className={styles.popupIcon}>
                                    <Icon 
                                        color='#96A3AB'
                                        icon='Pencil'
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className={styles.popupText}>Editar</div>
                            </div>
                            <div className={styles.popupItem} onClick={() => onDelete(address.id)}>
                                <div className={styles.popupIcon}>
                                    <Icon 
                                        color='#96A3AB'
                                        icon='Trash'
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className={styles.popupText}>Apagar</div>
                            </div>
                            
                        </div>
                    }
                </div>
            
        </div>
    )
}