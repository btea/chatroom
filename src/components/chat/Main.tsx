import React, { ReactElement, useEffect, useState } from 'react';
import { Router, useLocation } from 'react-router-dom';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import SetList from './SetList';
import styles from './main.module.less';
import startLink from './socket';

function link(id: number) {
    const path = `ws://${location.hostname}:2233?id=${id}`;
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
    const location = useLocation();
    const state = location.state as { id: number };
    const id = state.id;
    const [news, setNews] = useState<Array<InfoType.info>>([]);
    const [wsObj, setObj] = useState(WebSocket.prototype);
    let list: Array<InfoType.info> = [];
    useEffect(() => {
        const ws = link(id);
        setObj(ws);
        ws.onmessage = evt => {
            console.log(list);
            const message = evt.data;
            const info = {
                from: {
                    id: 1,
                    name: '徐念'
                },
                to: {
                    id: 2,
                    name: '李药师'
                },
                time: Date.now(),
                type: 'text',
                content: message
            };
            list = [...list, info];
            // console.log(n_s);
            setNews(list);
            console.log(message);
        };
    }, []);
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <SetList></SetList>
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
