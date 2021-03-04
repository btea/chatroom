import React, { ReactElement } from 'react';
import styles from './main.module.less';

export default function Main(): ReactElement {
    return (
        <div className={styles['main-con']}>
            <div className={styles['main-chat-model']}>
                <div className={styles['left-chat-list']}></div>
                <div className={styles['right-chat-box']}></div>
            </div>
        </div>
    );
}
