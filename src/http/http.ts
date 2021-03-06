import request from './api';

interface params {
    [key: string]: string | number;
}

export function login(params: params): Promise<unknown> {
    return request({
        url: '/login',
        method: 'post',
        data: params
    });
}

export function register(params: params): Promise<unknown> {
    return request({
        url: '/register',
        method: 'post',
        data: params
    });
}
