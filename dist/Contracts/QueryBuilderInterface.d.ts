import QueryResultInterface from "./QueryResultInterface";
export default interface QueryBuilderInterface<T = Object> {
    filter(callback: CallableFunction): QueryBuilderInterface<T>;
    limit(limit: number): QueryBuilderInterface<T>;
    offset(offset: number): QueryBuilderInterface<T>;
    desc(): QueryBuilderInterface<T>;
    get(): Promise<QueryResultInterface<T>>;
}
