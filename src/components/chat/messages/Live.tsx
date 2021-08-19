import React, { ReactElement } from 'react';
import styles from './live.module.less';

interface live {
    stream: MediaStream;
}

export default function Live(props: live): ReactElement {
    const { stream } = props;
    const src = URL.createObjectURL(stream);
    return (
        <div className={styles['live-box']}>
            <video src={src}></video>
        </div>
    );
}
