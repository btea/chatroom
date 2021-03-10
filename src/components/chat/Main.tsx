import React, { ReactElement, useEffect, useState } from 'react';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import styles from './main.module.less';
import startLink from './socket';

export default function Main(): ReactElement {
    const [news, setNews] = useState('');
    let ws;
    useEffect(() => {
        const path = `ws://${location.hostname}:2333`;
        ws = startLink(path);
        ws.onopen = () => {
            console.log('link');
        };
        ws.onmessage = evt => {
            console.log(evt);
            const message = evt.data;
            setNews(message);
        };
        ws.onclose = () => {
            console.log('close');
        };
    });
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <FriendList></FriendList>
                </div>
                <div className={styles['right-chat-box']}>
                    <NewsShow info={news}></NewsShow>
                    <SendMsg></SendMsg>
                </div>
            </div>
        </div>
    );
}
