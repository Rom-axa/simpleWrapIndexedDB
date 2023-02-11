import BaseQuery from "./BaseQuery";
export default class DeleteBatchQuery extends BaseQuery {
    run(keys: Array<number | string>): Promise<Event>;
}
