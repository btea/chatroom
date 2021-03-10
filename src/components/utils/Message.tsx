import React, { ReactElement, useEffect } from 'react';
import styles from './message.module.less';

interface MessageProps {
    msg: string;
    duration?: number;
    color?: number;
    type?: number;
}

export default function Message(props: MessageProps): ReactElement {
    const type = props.type || 'info';
    let boxName = styles['msg-box'] + ' ' + styles[type] + ' ' + styles['show'];
    useEffect(() => {
        setTimeout(() => {
            boxName = styles['msg-box'] + ' ' + styles[type];
        });
    });

    return <div className={boxName}>{props.msg}</div>;
}
