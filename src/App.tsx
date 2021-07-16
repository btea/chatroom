import React, { ReactElement, useEffect } from 'react';
import { MainPanel } from './components/panelIn/MainPanel';
import Register from './components/panelIn/Register';
import './app.css';
import create from './utils/Circle';

export function MainBox(): ReactElement {
    const handleCreate = (e: MouseEvent) => {
        create(e.clientX, e.clientY);
    };
    useEffect(() => {
        document.addEventListener('click', handleCreate);
        return () => {
            document.removeEventListener('click', handleCreate);
        };
    });
    return (
        <div className="main-in">
            {/* <MainPanel /> */}
            <Register></Register>
        </div>
    );
}
