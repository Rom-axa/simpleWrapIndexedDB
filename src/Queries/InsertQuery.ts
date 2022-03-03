import BaseQuery from "./BaseQuery";

export default class InsertQuery extends BaseQuery
{
    public run(entity: Object): Promise<Event> {
        return new Promise((res, rej) => {
            const objectStoreRequest = this.makeObjectStoreTransaction(`readwrite`).add(entity);
    
            objectStoreRequest.onsuccess = function(event) {
                res(event);
            };
            objectStoreRequest.onerror = function(event) {
                rej(event);
            };
        });
    }
}