import BaseQuery from "./BaseQuery";

export default class InsertBatch extends BaseQuery
{
    public run(entities: Object[]): Promise<Event> {
        return new Promise((resolve, reject) => {
            const objectStore = this.makeObjectStoreTransaction(`readwrite`);
            
            objectStore.transaction.addEventListener(`complete`, event => resolve(event));
            objectStore.transaction.addEventListener(`abort`, event => resolve(event));
            objectStore.transaction.addEventListener(`error`, event => reject(event));
            
            entities.forEach(entity => objectStore.add(entity));
            objectStore.transaction.commit();
        });
    }
}