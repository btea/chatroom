import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styles from './sendmsg.module.less';

interface sendMsg {
    ws: WebSocket;
}

export default function SendMessage(props: sendMsg): ReactElement {
    console.log(props);
    const { ws } = props;
    const [focus, setFocus] = useState(false);
    const box = useRef(null);
    const startSend = () => {
        if (!box.current) return;
        const el = (box.current as unknown) as HTMLElement;
        const str = el.innerText.trim();
        ws.send(str);
        el.innerText = '';
    };
    const notSend = () => {
        setFocus(false);
    };
    const canSend = () => {
        setFocus(true);
    };
    const sendMsg = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && focus) {
            startSend();
        }
    };
    useEffect(() => {
        document.addEventListener('keyup', sendMsg);
        return () => {
            document.removeEventListener('keyup', sendMsg);
        };
    });
    return (
        <div
            className={styles['send-box']}
            contentEditable={true}
            ref={box}
            onBlur={notSend}
            onFocus={canSend}
        ></div>
    );
}
