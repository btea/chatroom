import React, {ReactElement} from "react";
import styles from './text.module.less';

export default function Text(props: InfoType.info): ReactElement {
    const {content} = props;
    return (
        <div className={styles['text-msg']}>
            {content && <span className={styles['txt-con']}>{content}</span>}
        </div>
    )
}
