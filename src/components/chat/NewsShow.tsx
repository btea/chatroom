import React, { ReactElement, useEffect, useRef } from 'react';
import styles from './newsshow.module.less';

interface news {
    info: Array<string>;
}

export default function NewsShow(props: news): ReactElement {
    const { info } = props;
    const el = useRef(null);
    useEffect(() => {
        if (el.current) {
            const _el = (el.current as unknown) as HTMLElement;
            const _last = _el.lastChild as HTMLElement;
            if (_last) {
                _last.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });
            }
        }
    });
    return (
        <div className={styles['news-show']} ref={el}>
            {info &&
                info.map((news, i) => {
                    return (
                        <div className={styles['content-box'] + ' ' + styles['left']} key={i}>
                            <div className={styles['avatar']}></div>
                            <div className={styles['news-box']}>{news}</div>
                        </div>
                    );
                })}
        </div>
    );
}
