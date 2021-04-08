import styles from './message.module.less';

interface MessageProps {
    msg: string;
    duration?: number;
    color?: number;
    type?: number;
}

export default function Message(props: MessageProps): void {
    const type = props.type || 'info';
    let boxName = styles['msg-box'] + ' ' + styles[type];
    const duration = props.duration || 3000;
    const div = document.createElement('div');
    div.innerText = props.msg;
    div.className = boxName;
    const t = 500;
    setTimeout(() => {
        boxName = styles['msg-box'] + ' ' + styles[type];
        div.className = boxName;
        setTimeout(() => {
            document.body.removeChild(div);
        }, t);
    }, duration + t);
    setTimeout(() => {
        div.className = styles['msg-box'] + ' ' + styles[type] + ' ' + styles['show'];
    }, t);
    document.body.appendChild(div);
}
