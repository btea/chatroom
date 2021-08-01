import React, { ReactElement, useState } from 'react';
import styles from './friends.module.less';
import ShowAvatar from './ShowAvatar';

interface person {
    person: InfoType.friendInfo;
    chat: (info: InfoType.friendInfo) => void;
}

export default function Friend(props: person): ReactElement {
    const { person, chat } = props;
    const [showAvatar, switchShowAvatar] = useState(false);

    return (
        <div
            className={styles.friend}
            onClick={() => {
                chat(person);
            }}
        >
            <div className={styles.avatar}>
                <img
                    src={person.avatar}
                    onClick={() => {
                        switchShowAvatar(true);
                    }}
                />
            </div>
            <div className={styles['news-con']}>
                <div className={styles['nick-name']}>{person.nickname}</div>
            </div>
            {showAvatar && (
                <ShowAvatar avatar={person.avatar} changeShow={switchShowAvatar}></ShowAvatar>
            )}
        </div>
    );
}
