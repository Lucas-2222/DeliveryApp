import styles from './styles.module.css';

type Props = {
    color: string;
    label: string;
    onClick: () => void;
    fill?: boolean | void;
    disabled?: boolean;
}

export const Button = ({ color, label, onClick, fill, disabled }: Props) => {
    return (
        <div 
            className={styles.container}
            onClick={!disabled ? onClick : () => {}}
            style={{
                color: fill ? '#fff' : color,
                borderColor: color,
                backgroundColor: fill ? color : 'transparent',
                opacity: disabled ? .4 : 1
            }}
        >
            {label}
        </div>
    );
}