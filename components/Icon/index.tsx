import MailSent from './mailSent.svg';
import Card from './cardIcon.svg';
import Cash from './cashIcon.svg';
import Location from './locIcon.svg';
import Checked from './checked.svg';
import Side from './sideIcon.svg';
import Ticket from './ticketICon.svg';
import Options from './options.svg';
import Pencil from './pen.svg';
import Trash from './trash.svg';

type Props = {
    icon: string;
    color: string;
    width: number;
    height: number; 
}

export const Icon = ({ color, width, height, icon }: Props) => {
    return (
        <div style={{ width, height }}>
            {icon === 'mailSent' && <MailSent color={color}/>}
            {icon === 'Card' && <Card color={color}/>}
            {icon === 'Cash' && <Cash color={color}/>}
            {icon === 'Location' && <Location color={color}/>}
            {icon === 'Checked' && <Checked color={color}/>}
            {icon === 'Side' && <Side color={color}/>}
            {icon === 'Ticket' && <Ticket color={color}/>}
            {icon === 'Options' && <Options color={color}/>}
            {icon === 'Trash' && <Trash color={color}/>}
            {icon === 'Pencil' && <Pencil color={color}/>}
        </div>
    );
}