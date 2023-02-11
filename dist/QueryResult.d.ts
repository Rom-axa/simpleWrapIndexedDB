import QueryResultInterface from "./Contracts/QueryResultInterface";
export default class QueryResult<T = Object> implements QueryResultInterface {
    readonly items: ReadonlyArray<T>;
    readonly qty: number;
    constructor(items: T[]);
    first(): T | null;
    last(): T | null;
}
