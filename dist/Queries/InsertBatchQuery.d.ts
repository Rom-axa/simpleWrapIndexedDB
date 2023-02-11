import BaseQuery from "./BaseQuery";
export default class InsertBatch extends BaseQuery {
    run(entities: Object[]): Promise<Event>;
}
