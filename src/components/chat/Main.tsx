import React, { ReactElement } from 'react';
import SendMsg from './SendMsg';
import NewsShow from './NewsShow';
import FriendList from '../friends/FriendList';
import styles from './main.module.less';

export default function Main(): ReactElement {
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}>
                    <FriendList></FriendList>
                </div>
                <div className={styles['right-chat-box']}>
                    <NewsShow></NewsShow>
                    <SendMsg></SendMsg>
                </div>
            </div>
        </div>
    );
}
