/**
 * 显示暂不支持的消息类型
*/

import React, { ReactElement } from "react";
import styles from './other.module.less';


export default function Other(props: InfoType.info): ReactElement {
    return (
        <div className={styles['other-msg']}>暂不支持显示此类消息</div>
    )
}
