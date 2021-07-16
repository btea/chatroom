import { randomColor } from '@btea/utils';

const w = window.innerWidth;
const h = window.innerHeight;

export default function createCircle(x: number, y: number): void {
    const initStyle = {
        width: '100px',
        height: '100px',
        'border-radius': '50%',
        background: 'rgba(102, 204, 255, .4)',
        position: 'absolute',
        left: '',
        top: ''
    };
    console.log(randomColor());
    const el = document.createElement('div');
    initStyle.left = `${x}px`;
    initStyle.top = `${y}px`;
    const timer = window.setInterval(() => {
        Object.defineProperties(el.style, Object.getOwnPropertyDescriptors(initStyle));
        const _w = parseInt(el.style.width);
        const _h = parseInt(el.style.height);
        initStyle.width = `${_w + 10}px`;
        initStyle.height = `${_h + 10}px`;
        if (_w + 10 >= w && _h + 10 >= h) {
            clearInterval(timer);
            document.body.removeChild(el);
            document.body.removeChild(comment);
        }
    });
    const comment = new Comment(`setInterval ${timer}`);
    document.body.appendChild(comment);
    document.body.appendChild(el);
}
