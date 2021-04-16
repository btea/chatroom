interface date {
    [key: string]: number;
}

/**
 * 将时间格式化成字符串
 * @param str  需要转换成的时间格式字符串
 */
Object.defineProperty(Date.prototype, 'format', {
    value: function format(str: string): string {
        let date = this as Date;
        date = new Date(date);
        if (date.toString() === '"Invalid Date"') {
            return '';
        }
        const keys: date = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        str = str.replace(/y+/g, date.getFullYear() + '');
        Object.keys(keys).forEach((key: string) => {
            str = str.replace(new RegExp(key, 'g'), addZero(keys[key]));
        });
        return str;
    }
});

/**
 * 给个位数字首位补充 0，填充成两位
 * @param v 需要补充0的值
 * @param add 是否补充0，默认补充
 * @return 字符串
 */
function addZero(v: number, add: boolean = true): string {
    let _v = String(v);
    if (add) {
        _v = '0' + _v;
    }
    return _v.slice(-2);
}
