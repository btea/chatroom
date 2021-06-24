import React, { ReactElement, useEffect, useRef } from 'react';
import styles from './newsshow.module.less';
import text from './messages/Text'
interface news {
    info: Array<InfoType.info>;
}

export default function NewsShow(props: news): ReactElement {
    const { info } = props;
    const types = {
        'text': 'Text',
        'audio': 'Audio',
        'image': 'Image',
        'other': 'Other'
    }
    const type = 'text';
    let src = types[type] || 'Other'
    const MsgBox = require(`./messages/${src}`).default;


    const el = useRef(null);
    useEffect(() => {
        if (el.current) {
            const _el = (el.current as unknown) as HTMLElement;
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
                            <div className={styles['content-box'] + ' ' + styles['left']} key={i}>
                                <div className={styles['avatar']}>
                                    <img
                                        className={styles['avatar-img']}
                                        src="https://pic.rmb.bdstatic.com/f6794743b48dc2a0142ae2462c4b6f7f.jpeg"
                                        alt=""
                                    />
                                </div>
                                <div className={styles['news-box']}>
                                    <MsgBox {...news}></MsgBox>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
