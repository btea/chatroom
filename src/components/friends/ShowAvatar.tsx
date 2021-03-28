import React, { ReactElement } from 'react';
import styles from './friends.module.less';

interface avatar {
    avatar: string;
    changeShow: (type: boolean) => void;
}

export default function ShowAvatar(props: avatar): ReactElement {
    const { avatar, changeShow } = props;

    return (
        <div
            className={styles['big-avatar']}
            onClick={() => {
                changeShow(false);
            }}
        >
            <div className={styles['avatar-box']}>
                <img
                    src={avatar}
                    alt="avatar"
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            </div>
        </div>
    );
}
