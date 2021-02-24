import * as React from 'react';
import './hello.css';
export interface HelloProps {
    compiler: string;
    framework: string;
}
export const Hello = (props: HelloProps) => {
    return (
        <h1 className="demo">
            Hello from {props.compiler} and {props.framework}!
        </h1>
    );
};
