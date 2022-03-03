import BaseQuery from "./BaseQuery";

export default class DeleteQuery extends BaseQuery
{
    public run(key: string): Promise<Event> {
        return new Promise((res, rej) => {
            const objectStoreRequest: IDBRequest = this.makeObjectStoreTransaction(`readwrite`).delete(key);
    
            objectStoreRequest.onsuccess = function(event: Event): void {
                res(event);
            };
            objectStoreRequest.onerror = function(event: Event): void {
                rej(event);
            };
        });
    }
}
