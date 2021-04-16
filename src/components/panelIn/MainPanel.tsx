import React, { ChangeEvent, ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './panel.module.less';
import Message from '../../utils/Message';

export function MainPanel(): ReactElement {
    const [src, setSrc] = useState('');
    const [focus, setFocus] = useState(false);
    const [register, setRegister] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.key !== 'Enter') {
                return;
            }
            if (!src) {
                Message({ msg: '请先添加头像' });
                return;
            }
            if (focus && src) {
                history.push('/main');
            }
        };
        document.addEventListener('keyup', handle);
        return () => {
            document.removeEventListener('keyup', handle);
        };
    });

    const avatar = (e: ChangeEvent) => {
        const el = e.target as HTMLInputElement;
        if (el && el.files) {
            const file = el.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        console.log(e.target);
    };

    return (
        <div
            className={register ? styles['panel-box'] + ' ' + styles['back'] : styles['panel-box']}
        >
            <label htmlFor={styles.avatar} className={styles['avatar-box']}>
                <input type="file" name="avatar" id={styles.avatar} onChange={avatar} />
                <div
                    className={styles['avatar-con']}
                    style={{ backgroundImage: `url(${src})` }}
                ></div>
            </label>
            <div className={styles.nick}>
                <input
                    type="text"
                    className={styles['nick-input']}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}
                />
                <div className={styles.line}></div>
            </div>
            <div className={styles['btns']}>
                <button className={styles['login']}>登录</button>
                <button
                    className={styles['register']}
                    onClick={() => {
                        setRegister(true);
                    }}
                >
                    注册
                </button>
            </div>
            {/* <div className={styles['login-btn']}>加入</div> */}
        </div>
    );
}
