import React, { ReactElement, useEffect, useState } from 'react';
import { Router, useLocation } from 'react-router-dom';
import { deepClone } from '@btea/utils';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import SetList from './SetList';
import styles from './main.module.less';
import startLink from './socket';
import { getFriendList } from '../../http/http';
import { newsList } from '../../state/news';

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
    // let list: Array<InfoType.info> = [];
    useEffect(() => {
        const ws = link(id);
        setObj(ws);
        ws.onmessage = evt => {
            // console.log(list);
            const message = evt.data;
            const info = JSON.parse(message);

            if (info.start) {
                return;
            }
            newsList.push(info);
            // console.log(n_s);
            setNews(deepClone(newsList));
        };
        getFriendList({ id }).then(res => {
            console.log(res);
        });
    }, []);
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <SetList></SetList>
                    <FriendList></FriendList>
                </div>
                <div className={styles['right-chat-box']}>
                    <NewsShow info={news} id={id}></NewsShow>
                    <SendMsg
                        ws={wsObj}
                        id={id}
                        addNews={(info: InfoType.info) => {
                            newsList.push(info);
                            setNews(deepClone(newsList));
                        }}
                    ></SendMsg>
                </div>
            </div>
        </div>
    );
}
