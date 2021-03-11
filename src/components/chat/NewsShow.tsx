import React, { ReactElement } from 'react';
import styles from './newsshow.module.less';

interface news {
    info: Array<string>;
}

export default function NewsShow(props: news): ReactElement {
    const { info } = props;
    return (
        <div className={styles['news-show']}>
            {info &&
                info.map((news, i) => {
                    return (
                        <div className={styles['content-box']} key={i}>
                            <div className={styles['news-box']}>{news}</div>
                        </div>
                    );
                })}
        </div>
    );
}
