import React, { ReactElement, useState } from 'react';
import Friend from './Friend';
import styles from './friends.module.less';

interface person {
    name: string;
    avatar: string;
    id: string;
    word: string;
}

export default function FriendList(): ReactElement {
    const [friends, setFriends] = useState([
        {
            name: '维多利加',
            avatar: 'https://pic.rmb.bdstatic.com/f6794743b48dc2a0142ae2462c4b6f7f.jpeg',
            word: '...',
            id: '1'
        },
        {
            name: '博丽灵梦',
            word: '...',
            avatar:
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2289144580,2156433701&fm=26&gp=0.jpg',
            id: '2'
        },
        {
            name: '伊蕾娜',
            word: '...',
            avatar:
                'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2427868306,3048312380&fm=11&gp=0.jpg',
            id: '3'
        }
    ]);
    return (
        <ul className={styles['friends-list']}>
            {friends.map((per: person) => {
                return <Friend person={per} key={per.id}></Friend>;
            })}
        </ul>
    );
}
