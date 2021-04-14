import React, { ReactElement } from 'react';
import styles from './register.module.less';
// 用户注册模块

export default function Register(): ReactElement {
    return (
        <div className={styles['register-box']}>
            <div className={styles['nickname']}>
                <input type="text" className={styles['input']} />
            </div>
            <div className={styles['password']}>
                <input type="password" className={styles['input']} />
            </div>
            <div className={styles['btns']}>
                <button className={styles['btn-text']}>注册</button>
            </div>
        </div>
    );
}
