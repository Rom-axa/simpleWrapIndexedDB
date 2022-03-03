import BaseQuery from "./BaseQuery";

export default class DeleteBatchQuery extends BaseQuery
{
    public run(keys: Array<number | string>): Promise<Event> {
        return new Promise((resolve, reject) => {
            const objectStore = this.makeObjectStoreTransaction(`readwrite`);
            
            objectStore.transaction.addEventListener(`complete`, event => resolve(event));
            objectStore.transaction.addEventListener(`abort`, event => resolve(event));
            objectStore.transaction.addEventListener(`error`, event => reject(event));
            
            keys.forEach(key => objectStore.delete(key));
            objectStore.transaction.commit();
        });
    }
}