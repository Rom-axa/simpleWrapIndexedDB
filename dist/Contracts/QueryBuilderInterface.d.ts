import QueryResultInterface from "./QueryResultInterface";
export default interface QueryBuilderInterface {
    filter(callback: CallableFunction): QueryBuilderInterface;
    limit(limit: number): QueryBuilderInterface;
    offset(offset: number): QueryBuilderInterface;
    desc(): QueryBuilderInterface;
    get(): Promise<QueryResultInterface>;
}
