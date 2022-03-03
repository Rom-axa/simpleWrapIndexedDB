import BaseQuery from "./Queries/BaseQuery";

type Params = {
    limit: number | undefined,
    offset: number | undefined,
    desc: boolean | undefined,
    filter: CallableFunction | undefined,
}

export default class QueryBuilder
{
    private preparedQuery: BaseQuery | null = null;
    private _limit: number | null = null;
    private _offset: number | null = null;
    private _filter: CallableFunction | null = null;
    private _desc: boolean = false;

    constructor(
        preparedQuery: BaseQuery,
        limit: number = Infinity,
        offset: number = 0,
        filter: CallableFunction = (() => true),
        desc = false
    ){
        this.preparedQuery = preparedQuery;
        this._limit = limit;
        this._offset = offset;
        this._filter = filter;
        this._desc = desc;
    }

    private makeFromParams(params: Params): QueryBuilder {
        const { limit, offset, filter, desc} = params;

        return new QueryBuilder(
            this.preparedQuery,
            limit ?? this._limit,
            offset ?? this._offset,
            filter ?? this._filter,
            desc ?? false
        );
    }

    public limit(limit: number): QueryBuilder {
        return this.makeFromParams({ limit } as Params);
    }
    public offset(offset: number): QueryBuilder {
        return this.makeFromParams({ offset } as Params);
    }
    public filter(callback: CallableFunction): QueryBuilder {
        return this.makeFromParams({ filter : callback } as Params);
    }
    public desc(): QueryBuilder {
        return this.makeFromParams({ desc : true } as Params);
    }

    public get<T>(): Promise<T> {
        return this.preparedQuery.run(this._limit, this._offset, this._filter, this._desc);
    }
}