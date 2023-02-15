import QueryBuilderInterface from "./QueryBuilderInterface";
export default interface DatabaseStorageInterface extends QueryBuilderInterface {
    find<T = Object>(key: string): Promise<T | null>;
    insert<T = Object>(entity: T): Promise<Event>;
    insertBatch<T = Object>(entities: T[]): Promise<Event>;
    update<T = Object>(entity: T): Promise<Event>;
    updateBatch<T = Object>(entities: T[]): Promise<Event>;
    delete(key: string): Promise<Event>;
    deleteBatch(keys: string[]): Promise<Event>;
}
