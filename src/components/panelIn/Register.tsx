import React, { ReactElement, useRef } from 'react';
import { register } from '../../http/http';
import Message from '../../utils/Message';
import styles from './register.module.less';
// 用户注册模块

export default function Register(): ReactElement {
    const name = useRef<HTMLInputElement>(null);
    const pwd = useRef<HTMLInputElement>(null);
    const startRegister = () => {
        const params = {
            username: '',
            password: ''
        };
        if (!name.current?.value) {
            Message({
                msg: '请输入用户名',
                type: 'error'
            });
            return;
        } else {
            params.username = name.current.value;
        }
        if (!pwd.current?.value) {
            Message({
                msg: '请输入账号密码',
                type: 'error'
            });
            return;
        } else {
            params.password = pwd.current.value;
        }
        register(params).then(res => {
            console.log(res);
        });
    };
    return (
        <div className={styles['register-box']}>
            <div className={styles['nickname']}>
                <input type="text" className={styles['input']} ref={name} />
            </div>
            <div className={styles['password']}>
                <input type="password" className={styles['input']} ref={pwd} />
            </div>
            <div className={styles['btns']}>
                <button className={styles['btn-text']} onClick={startRegister}>
                    注册
                </button>
            </div>
        </div>
    );
}
