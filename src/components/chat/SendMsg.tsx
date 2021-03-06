import React, { ReactElement } from 'react';
import styles from './sendmsg.module.less';

export default function SendMessage(): ReactElement {
    return <div className={styles['send-box']} contentEditable={true}></div>;
}
