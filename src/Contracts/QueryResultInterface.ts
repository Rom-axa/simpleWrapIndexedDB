export default interface QueryResultInterface<T = Object> {
    readonly qty: number;
    readonly items: ReadonlyArray<T>;

    first(): T | null;

    last(): T | null;
}