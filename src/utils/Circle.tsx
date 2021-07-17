import { randomColor } from '@btea/utils';

const w = 200;
const h = 200;

export default function createCircle(x: number, y: number): void {
    let opa = 0.6;
    const initStyle = {
        width: '100px',
        height: '100px',
        'border-radius': '50%',
        background: 'rgba(102, 204, 255, .4)',
        position: 'absolute',
        left: '',
        top: '',
        transform: 'translate(-50%, -50%)',
        'z-index': 0
    };
    const el = document.createElement('div');
    initStyle.left = `${x}px`;
    initStyle.top = `${y}px`;
    const rgb = hexToRgb(randomColor());
    initStyle.background = `${rgb.slice(0, -1)},${opa})`;
    const timer = window.setInterval(() => {
        Object.defineProperties(el.style, Object.getOwnPropertyDescriptors(initStyle));
        const _w = parseInt(el.style.width);
        const _h = parseInt(el.style.height);
        opa -= 0.05;
        initStyle.background = `${rgb.slice(0, -1)},${opa})`;
        initStyle.width = `${_w + 10}px`;
        initStyle.height = `${_h + 10}px`;
        if (_w + 10 >= w && _h + 10 >= h) {
            clearInterval(timer);
            document.body.removeChild(el);
            document.body.removeChild(comment);
        }
    }, 1000 / 60);
    const comment = new Comment(`setInterval ${timer}`);
    document.body.appendChild(comment);
    document.body.appendChild(el);
}

function hexToRgb(color: string): string {
    color = color.slice(1);
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(-2), 16);
    return `rgba(${r}, ${g}, ${b})`;
}
