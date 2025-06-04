export interface ResponseRequest {
    data: any
}

export interface ResponseHttpRequest<T> {
    data: T,
    status: number,
}

export interface DefaultSelect {
    label: string,
    value: any
}

export interface Breadcrumb {
    text: string,
    disabled: boolean,
    href: string,
    premissao?: () => boolean,
}

export interface DefaultHeaderTable {
    text: string,
    value: string,
    align?: 'start' | 'center' | 'end' | 'd-none',
    sortable?: boolean,
    filterable?: boolean,
    divider?: boolean,
    class?: string | string[],
    width?: string | number,
    filter?: (value: any, search: string, items: any) => boolean,
    sort?: (a: any, b: any) => number
}