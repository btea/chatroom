import React, { ReactElement, useEffect, useRef, useState } from 'react';
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
    const [friends, setFreiend] = useState<Array<InfoType.friend>>([]);
    function establish() {
        const ws = link(id);
        setObj(ws);
        ws.onmessage = evt => {
            const message = evt.data;
            const info = JSON.parse(message);
            if (info.start) {
                return;
            }
            newsList.push(info);
            // console.log(n_s);
            setNews(deepClone(newsList));
        };
    }
    // let list: Array<InfoType.info> = [];
    // useEffect(() => {
    //     establish();
    //     let ignore = false;
    //     async function fetchFriends(params: { id: string | number }) {
    //         const result = await getFriendList({ id: params.id });
    //         console.log(result);
    //     }
    //     fetchFriends({ id });
    //     return () => {
    //         ignore = true;
    //     };
    // }, []);
    // 传入一个空数组为参数，不管什么情况useEffect只会执行一次
    useEffect(() => {
        const ws = link(id);
        setObj(ws);
        ws.onmessage = evt => {
            const message = evt.data;
            const info = JSON.parse(message);
            if (info.start) {
                return;
            }
            // 函数式更新 https://react.docschina.org/docs/hooks-reference.html#functional-updates
            setNews(news => [...news, info]);
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
                    <NewsShow info={news} id={id}></NewsShow>
                    <SendMsg
                        ws={wsObj}
                        id={id}
                        addNews={(info: InfoType.info) => {
                            // newsList.push(info);
                            setNews(news => [...news, info]);
                        }}
                    ></SendMsg>
                </div>
            </div>
        </div>
    );
}
