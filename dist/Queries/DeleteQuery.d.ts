import BaseQuery from "./BaseQuery";
export default class DeleteQuery extends BaseQuery {
    run(key: string): Promise<Event>;
}
