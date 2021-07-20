import React, {
    ReactElement,
    useState,
    useRef,
    useEffect,
    MutableRefObject,
    forwardRef
} from 'react';
import styles from './sendmsg.module.less';
import Message from '../../utils/Message';
import { userInfo } from '../../utils/useUser';
interface sendMsg {
    ws: WebSocket;
    id: number;
}

export default function SendMessage(props: sendMsg): ReactElement {
    // console.log(props);
    const { ws, id } = props;
    let focus = true;
    const box = useRef(null);
    const startSend = () => {
        if (!box.current) return;
        const el = (box.current as unknown) as HTMLElement;
        const str = el.innerText.trim();
        if (!str) {
            Message({ msg: '不能发送空白信息' });
        } else {
            const to: Partial<{ id: number; nickname: string; avatar: string }> = {};
            if (userInfo.id === 1) {
                to.id = 2;
                to.nickname = '洛天依';
                to.avatar = '';
            } else {
                to.id = 1;
                to.nickname = '伊蕾娜';
                to.avatar = '';
            }
            const params: InfoType.info = {
                content: str,
                from: { id, name: userInfo.nickname as string, avatar: '' },
                to: { id: to.id, name: to.nickname, avatar: to.avatar },
                type: 'text',
                time: Date.now()
            };
            ws.send(JSON.stringify(params));
        }
        el.innerText = '';
    };
    const notSend = () => {
        focus = false;
    };
    const canSend = () => {
        focus = true;
    };
    const sendMsg = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && focus) {
            e.preventDefault();
            startSend();
            canSend();
            return false;
        }
    };
    useEffect(() => {
        const el = box.current as unknown;
        if (!el) return;
        const _el = el as HTMLElement;
        _el.addEventListener('keydown', sendMsg);
        return () => {
            _el.removeEventListener('keydown', sendMsg);
        };
    });
    return (
        <div className={styles['send-box']}>
            <div
                className={styles['word-box']}
                contentEditable="true"
                ref={box}
                onBlur={notSend}
                onFocus={canSend}
            ></div>
            {/* <textarea
                className={styles['word-box']}
                ref={box}
                onBlur={notSend}
                onFocus={canSend}
            ></textarea> */}
        </div>
    );
}
