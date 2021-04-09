import React, { ReactElement, useEffect, useState } from 'react';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import styles from './main.module.less';
import startLink from './socket';

function link() {
    const path = `ws://${location.hostname}:2233`;
    const ws = startLink(path);
    ws.onopen = () => {
        console.log('link');
    };

    ws.onclose = () => {
        console.log('close');
    };
    return ws;
}

export default function Main(): ReactElement {
    const [news, setNews] = useState<Array<string>>([]);
    const [wsObj, setObj] = useState(WebSocket.prototype);
    let list: Array<string> = [];
    useEffect(() => {
        const ws = link();
        setObj(ws);
        ws.onmessage = evt => {
            console.log(list);
            const message = evt.data;
            list = [...list, message];
            // console.log(n_s);
            setNews(list);
            console.log(message);
        };
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
