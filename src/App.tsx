import React, { ReactElement } from 'react';
import { MainPanel } from './components/panelIn/MainPanel';
import './app.css';

export function MainBox(): ReactElement {
    return (
        <div className="main-in">
            <MainPanel />
        </div>
    );
}
