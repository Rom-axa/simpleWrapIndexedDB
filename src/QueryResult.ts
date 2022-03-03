import QueryResultInterface from "./Contracts/QueryResultInterface";

export default class QueryResult<T = Object> implements QueryResultInterface
{
    public readonly items: ReadonlyArray<T>;
    public readonly qty: number;

    constructor(items: T[]){
        this.items = items;
        this.qty = items.length;
    }

    public first(): T | null {
        return this.items[0] ?? null;
    }

    public last(): T | null {
        return this.qty ? this.items[this.qty - 1] : null;
    }
}