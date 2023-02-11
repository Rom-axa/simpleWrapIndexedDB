import BaseQuery from "./BaseQuery";
export default class SingleSelectQuery extends BaseQuery {
    run<T>(key: string): Promise<T | null>;
}
