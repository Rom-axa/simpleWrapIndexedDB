import BaseQuery from "./BaseQuery";
export default class UpdateQuery extends BaseQuery {
    run(entity: Object): Promise<Event>;
}
