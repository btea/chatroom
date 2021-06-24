/**
 * 音频文件
*/
import React, { ReactElement, useState } from "react";
import styles from './audio.module.less';

export default function Audio(props: InfoType.info): ReactElement{
    const {content} = props;
    const [time, setTime] = useState(0)
    return (
        <div className={styles['audio-msg']}>
            <span className={styles['audio-t']}>{time}</span>
            <span className={styles['audio-icon']}></span>
        </div>
    )
}
