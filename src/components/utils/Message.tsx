import styles from './message.module.less';

interface MessageProps {
    msg: string;
    duration?: number;
    color?: number;
    type?: number;
}

export default function Message(props: MessageProps): void {
    const type = props.type || 'info';
    let boxName = styles['msg-box'] + ' ' + styles[type] + ' ' + styles['show'];
    const duration = props.duration || 3000;
    const div = document.createElement('div');
    div.innerText = props.msg;
    div.className = boxName;
    setTimeout(() => {
        boxName = styles['msg-box'] + ' ' + styles[type];
        div.className = boxName;
        setTimeout(() => {
            document.body.appendChild(div);
        }, 1000);
    }, duration);
    document.body.appendChild(div);
}
