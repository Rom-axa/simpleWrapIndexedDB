import BaseQuery from "./Queries/BaseQuery";
export default class QueryBuilder {
    private preparedQuery;
    private _limit;
    private _offset;
    private _filter;
    private _desc;
    constructor(preparedQuery: BaseQuery, limit?: number, offset?: number, filter?: CallableFunction, desc?: boolean);
    private makeFromParams;
    limit(limit: number): QueryBuilder;
    offset(offset: number): QueryBuilder;
    filter(callback: CallableFunction): QueryBuilder;
    desc(): QueryBuilder;
    get<T>(): Promise<T>;
}
