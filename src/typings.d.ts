declare module '*.module.scss' {
    const classes: {
        [key: string]: string;
    };
    export default classes;
}
declare module '*.module.less' {
    const classes: {
        [key: string]: string;
    };
    export default classes;
}

/**
 * 解决在tsx中引入module.less或者module.scss找不到模块的警告，在此声明模块类型
 * https://blog.csdn.net/qq_24147051/article/details/109746127
 */

declare namespace InfoType {
    export interface info {
        from: {
            id: number;
            name: string;
            avatar: string;
        };
        to: {
            id: number;
            name: string;
            avatar: string;
        };
        time: number | string | Date;
        type: string;
        content: string | Blob | Buffer;
    }

    export interface friend {
        name: string;
        avatar: string;
        time: number | string;
        content: string;
        type: string;
    }
}
