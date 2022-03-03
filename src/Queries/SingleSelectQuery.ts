import BaseQuery from "./BaseQuery";

export default class SingleSelectQuery extends BaseQuery
{
    public run<T>(key: string): Promise<T|null>{
        return new Promise((res, rej) => {
            const objectStoreRequest = this.makeObjectStoreTransaction(`readonly`).get(key);
    
            objectStoreRequest.onsuccess = function() {
                res(objectStoreRequest.result);
            };
            objectStoreRequest.onerror = function(event: Event) {
                rej(event);
            };
        });
    }
}