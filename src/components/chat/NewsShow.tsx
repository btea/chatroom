import React, { ReactElement } from 'react';
import styles from './newsshow.module.less';

interface news {
    info: string;
}

export default function NewsShow(props: news): ReactElement {
    const { info } = props;
    return (
        <div className={styles['news-show']}>
            <div className={styles['content-box']}>
                <div className={styles['news-box']}>{info}</div>
            </div>
        </div>
    );
}
