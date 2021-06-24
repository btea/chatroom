/**
 * 图片消息
*/
import React, {ReactElement} from "react";
import styles from './image.module.less';

export default function Image(props: InfoType.info): ReactElement{
    const { content } = props;
    let src;
    if (typeof content === 'string') {
        src = content
    }
    return (
        <div className={styles['image-msg']}>
            {src && <img className={styles['img-con']} src={src} alt="图片消息" />}
        </div>
    )
}
