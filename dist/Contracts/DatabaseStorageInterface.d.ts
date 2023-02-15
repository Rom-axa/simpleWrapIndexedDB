import QueryBuilderInterface from "./QueryBuilderInterface";
export default interface DatabaseStorageInterface<T> extends QueryBuilderInterface<T> {
    find(key: string): Promise<T | null>;
    insert(entity: T): Promise<Event>;
    insertBatch(entities: T[]): Promise<Event>;
    update(entity: T): Promise<Event>;
    updateBatch(entities: T[]): Promise<Event>;
    delete(key: string): Promise<Event>;
    deleteBatch(keys: string[]): Promise<Event>;
}
