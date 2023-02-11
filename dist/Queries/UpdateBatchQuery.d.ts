import BaseQuery from "./BaseQuery";
export default class UpdateBatchQuery extends BaseQuery {
    run(entities: Object[]): Promise<Event>;
}
