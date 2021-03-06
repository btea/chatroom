import React, { ReactElement } from 'react';
import styles from './friends.module.less';

interface person {
    person: {
        name: string;
        avatar: string;
        id: string;
        word: string;
    };
}

export default function Friend(props: person): ReactElement {
    const { person } = props;
    return (
        <div className={styles.friend}>
            <div className={styles.avatar}>
                <img src={person.avatar} />
            </div>
            <div className={styles['news-con']}>
                <div className={styles['nick-name']}>{person.name}</div>
            </div>
        </div>
    );
}
