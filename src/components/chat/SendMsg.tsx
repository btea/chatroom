import React, { ReactElement, useState, useRef, useEffect } from 'react';
import styles from './sendmsg.module.less';

interface sendMsg {
    ws: WebSocket;
}

export default function SendMessage(props: sendMsg): ReactElement {
    // console.log(props);
    const { ws } = props;
    let focus = true;
    const [showTip, setShowTip] = useState(false);
    const box = useRef(null);
    const startSend = () => {
        if (!box.current) return;
        const el = (box.current as unknown) as HTMLTextAreaElement;
        const str = el.value.trim();
        // if (!str) {
        //     setShowTip(true);
        //     return;
        // } else {
        //     setShowTip(false);
        // }
        ws.send(str);
        el.value = '';
    };
    const notSend = () => {
        focus = false;
    };
    const canSend = () => {
        focus = true;
    };
    const sendMsg = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && focus) {
            startSend();
            canSend();
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
            <textarea
                className={styles['word-box']}
                ref={box}
                onBlur={notSend}
                onFocus={canSend}
            ></textarea>
            {showTip && <div className={styles.tip}>发送信息不能为空</div>}
        </div>
    );
}
