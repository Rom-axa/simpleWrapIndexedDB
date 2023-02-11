import QueryBuilder from "./QueryBuilder";
import Connection from "./Connection";
import DatabaseStorageInterface from "./Contracts/DatabaseStorageInterface";
import QueryResultInterface from "./Contracts/QueryResultInterface";
export default class DatabaseStorage implements DatabaseStorageInterface {
    private readonly connection;
    private readonly name;
    constructor(connection: Connection, name: string);
    private makeStorageTransactionFactory;
    filter(callback: CallableFunction): QueryBuilder;
    limit(limit: number): QueryBuilder;
    offset(offset: number): QueryBuilder;
    desc(): QueryBuilder;
    get(): Promise<QueryResultInterface>;
    find<T = Object>(key: string): Promise<T | null>;
    insert<T = Object>(entity: T): Promise<Event>;
    insertBatch<T = Object>(entities: T[]): Promise<Event>;
    update<T = Object>(entity: T): Promise<Event>;
    updateBatch<T = Object>(entities: T[]): Promise<Event>;
    delete(key: string): Promise<Event>;
    deleteBatch(keys: string[]): Promise<Event>;
}
