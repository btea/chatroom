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
import { friendInfo } from '../../utils/useUser';
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
    const [isChat, setChat] = useState(false);
    const [friends, setFreiend] = useState<Array<InfoType.friendInfo>>([]);

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
        async function fetchFriends(params: { id: string | number }) {
            const result = await getFriendList({ id: params.id });
            const data = result as { data: { data: Array<InfoType.friendInfo> } };
            const list = data.data.data;
            setFreiend(list);
        }
        fetchFriends({ id });
    }, [id]); // 传入一个空数组为参数，不管什么情况useEffect只会执行一次
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <SetList></SetList>
                    <FriendList
                        list={friends}
                        startChat={info => {
                            Object.assign(friendInfo, info);
                            setChat(true);
                        }}
                    ></FriendList>
                </div>
                {isChat ? (
                    <div className={styles['right-chat-box']}>
                        <NewsShow info={news}></NewsShow>
                        <SendMsg
                            ws={wsObj}
                            id={id}
                            addNews={(info: InfoType.info) => {
                                // newsList.push(info);
                                setNews(news => [...news, info]);
                            }}
                        ></SendMsg>
                    </div>
                ) : (
                    <div className={styles['blank-board']}>当此世，赢输都算闲话！</div>
                )}
            </div>
        </div>
    );
}
