import QueryResult from "../QueryResult";
import BaseQuery from "./BaseQuery";
export default class MultiSelectQuery extends BaseQuery {
    run(limit: number, offset: number, filter: CallableFunction, desc: boolean): Promise<QueryResult>;
}
