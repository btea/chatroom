import React, { ChangeEvent, ReactElement, useState } from 'react';
import './panel.css';

export function MainPanel(): ReactElement {
    const [src, setSrc] = useState('');

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
        <div className="panel-box">
            <label htmlFor="avatar" className="avatar-box">
                <input type="file" name="avatar" id="avatar" onChange={avatar} />
                <div className="avatar-con">
                    <img src={src} alt="" />
                </div>
            </label>
        </div>
    );
}
