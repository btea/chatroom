import React, { ReactElement } from 'react';
import styles from './register.module.less';
import { MainPanel } from './MainPanel';
// 用户注册模块

export default function Register(): ReactElement {
    return (
        <div className={styles['register-box']}>
            <div>注册</div>
            <MainPanel></MainPanel>
        </div>
    );
}
