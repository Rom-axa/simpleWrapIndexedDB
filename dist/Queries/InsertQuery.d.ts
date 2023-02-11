import BaseQuery from "./BaseQuery";
export default class InsertQuery extends BaseQuery {
    run(entity: Object): Promise<Event>;
}
