export interface ReadRequest {
    LastNameFilter: string | undefined,
    SortRule: SortRule,
};

export enum SortRule {
    'asc',
    'desc',
};

export interface Errors {
    Firstname: string[],
    Lastname: string[],
    Age: string[],
    Sex: string[],
}