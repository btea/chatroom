export interface Info {
    _id: string;
    id: number;
    nickname: string;
    avatar: string;
    sign: string;
}

export const userInfo: Partial<Info> = {};
export const friendInfo: Partial<Info> = {};
