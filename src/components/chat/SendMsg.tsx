import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styles from './sendmsg.module.less';

interface sendMsg {
    ws: WebSocket;
}

export default function SendMessage(props: sendMsg): ReactElement {
    console.log(props);
    const { ws } = props;
    let focus = false;
    const [showTip, setShowTip] = useState(false);
    const box = useRef(null);
    const startSend = () => {
        if (!box.current) return;
        const el = (box.current as unknown) as HTMLElement;
        const str = el.innerText.trim();
        if (!str) {
            setShowTip(true);
            return;
        } else {
            setShowTip(false);
        }
        ws.send(str);
        el.innerText = '';
    };
    const notSend = () => {
        focus = false;
    };
    const canSend = () => {
        console.log('focus');
        focus = true;
    };
    const sendMsg = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && focus) {
            startSend();
            focus = true;
        }
    };
    useEffect(() => {
        document.addEventListener('keyup', sendMsg);
        return () => {
            document.removeEventListener('keyup', sendMsg);
        };
    });
    return (
        <div className={styles['send-box']}>
            <div
                className={styles['word-box']}
                contentEditable={true}
                ref={box}
                onBlur={notSend}
                onFocus={canSend}
            ></div>
            {showTip && <div className={styles.tip}>发送信息不能为空</div>}
        </div>
    );
}
