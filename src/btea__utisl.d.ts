declare module '@btea/utils' {
    export function isLeapyear(year: string | number): boolean;
    export function getMonthTotal(year: string | number, month: string | number): number;
    export function formatDate(date: Date | string | number, format: string): string;
    export function randomColor(): string;
    export function isEven(val: unknown): boolean;
    export function isOdd(val: unknown): boolean;
    export function randomNum(max: number, min: number, isInteger: boolean): number;
    export function isString(val: unknown): boolean;
    export function isNumber(val: unknown): boolean;
    export function isArray(val: unknown): boolean;
    export function isObject(val: unknown): boolean;
    export function isTruly(val: unknown): boolean;
    export function getType(val: unknown): string;
    export function deepClone(val: T): T;
}
