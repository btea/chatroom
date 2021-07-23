import React, { ReactElement, Suspense, useEffect, useRef } from 'react';
import styles from './newsshow.module.less';
import { userInfo } from '../../utils/useUser';

interface news {
    info: Array<InfoType.info>;
    id: number;
}

export default function NewsShow(props: news): ReactElement {
    const { info, id } = props;
    const types: { [key: string]: string } = {
        text: 'Text',
        audio: 'Audio',
        image: 'Image',
        other: 'Other'
    };
    let type = 'text';
    if (info[0]) {
        type = info[0].type;
    }
    const src = types[type] || 'Other';
    const MsgBox = React.lazy(() => {
        return import(/* @vite-ignore */ `./messages/${src}`);
    });
    const el = useRef(null);
    useEffect(() => {
        if (el.current) {
            // const _el = (el.current as unknown) as HTMLElement;
            const _el = el.current! as HTMLElement;
            // const _last = _el.lastChild as HTMLElement;
            // if (_last) {
            // _last.scrollIntoView({
            // block: 'end',
            // behavior: 'smooth'
            // });
            // }
            _el.scrollIntoView({
                block: 'end'
            });
        }
    });
    return (
        <div className={styles['news-show']}>
            <div className={styles['news-container']} ref={el}>
                {info &&
                    info.map((news, i) => {
                        return (
                            <div
                                className={
                                    styles['content-box'] +
                                    ' ' +
                                    styles[userInfo.id == Number(news.from.id) ? 'right' : 'left']
                                }
                                key={news.time + ''}
                            >
                                <div className={styles['avatar']}>
                                    <img
                                        className={styles['avatar-img']}
                                        src="https://pic.rmb.bdstatic.com/f6794743b48dc2a0142ae2462c4b6f7f.jpeg"
                                        alt=""
                                    />
                                </div>
                                <div className={styles['news-box']}>
                                    <Suspense fallback={''}>
                                        <MsgBox {...news}></MsgBox>
                                    </Suspense>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
