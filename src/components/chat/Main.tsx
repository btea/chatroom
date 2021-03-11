import React, { ReactElement, useEffect, useState } from 'react';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import styles from './main.module.less';
import startLink from './socket';

export default function Main(): ReactElement {
    const val: Array<string> = [];
    const [news, setNews] = useState(val);
    const [wsObj, setObj] = useState(WebSocket.prototype);
    const init = () => {
        const path = `ws://${location.hostname}:2333`;
        const ws = startLink(path);
        ws.onopen = () => {
            console.log('link');
        };
        ws.onmessage = evt => {
            console.log(evt);
            const message = evt.data;
            console.log(news);
            const n_s = [...news, message];
            console.log(n_s);
            setNews(n_s);
        };
        ws.onclose = () => {
            console.log('close');
        };
        setObj(ws);
    };
    useEffect(() => {
        init();
    }, []);
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <FriendList></FriendList>
                </div>
                <div className={styles['right-chat-box']}>
                    <NewsShow info={news}></NewsShow>
                    <SendMsg ws={wsObj}></SendMsg>
                </div>
            </div>
        </div>
    );
}
