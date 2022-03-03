import BaseQuery from "./BaseQuery";

export default class UpdateQuery extends BaseQuery
{
    public run(entity: Object): Promise<Event> {
        return new Promise((res, rej) => {
            const objectStoreRequest = this.makeObjectStoreTransaction(`readwrite`).put(entity);
    
            objectStoreRequest.onsuccess = function(event: Event) {
                res(event);
            };
            objectStoreRequest.onerror = function(event: Event) {
                rej(event);
            };
        });
    }
}