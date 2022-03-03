import QueryBuilder from "./QueryBuilder";
import DeleteQuery from "./Queries/DeleteQuery";
import InsertQuery from "./Queries/InsertQuery";
import MultiSelectQuery from "./Queries/MultiSelectQuery";
import SingleSelectQuery from "./Queries/SingleSelectQuery";
import UpdateQuery from "./Queries/UpdateQuery";
import Connection from "./Connection";
import QueryResult from "./QueryResult";
import InsertBatchQuery from "./Queries/InsertBatchQuery";
import DeleteBatchQuery from "./Queries/DeleteBatchQuery";
import DatabaseStorageInterface from "./Contracts/DatabaseStorageInterface";
import QueryResultInterface from "./Contracts/QueryResultInterface";
import UpdateBatchQuery from "./Queries/UpdateBatchQuery";

export default class DatabaseStorage implements DatabaseStorageInterface
{
    private readonly connection: Connection;
    private readonly name: string;

    constructor(connection: Connection, name: string){
        this.connection = connection;
        this.name = name;
    }

    private makeStorageTransactionFactory(): CallableFunction {
        return (type: IDBTransactionMode) => this.connection.db.transaction(this.name, type).objectStore(this.name);
    }

    public filter(callback: CallableFunction): QueryBuilder {
        const databaseQuery = new MultiSelectQuery(this.makeStorageTransactionFactory());
        return (new QueryBuilder(databaseQuery)).filter(callback);
    }
    public limit(limit: number): QueryBuilder {
        const databaseQuery = new MultiSelectQuery(this.makeStorageTransactionFactory());
        return (new QueryBuilder(databaseQuery)).limit(limit);
    }
    public offset(offset: number): QueryBuilder {
        const databaseQuery = new MultiSelectQuery(this.makeStorageTransactionFactory());
        return (new QueryBuilder(databaseQuery)).offset(offset);
    }
    public desc(): QueryBuilder {
        const databaseQuery = new MultiSelectQuery(this.makeStorageTransactionFactory());
        return (new QueryBuilder(databaseQuery)).desc();
    }
    public get(): Promise<QueryResultInterface> {
        const databaseQuery = new MultiSelectQuery(this.makeStorageTransactionFactory());
        return (new QueryBuilder(databaseQuery)).get<QueryResult>();
    }

    public find<T = Object>(key: string): Promise<T|null> {
        return (new SingleSelectQuery(this.makeStorageTransactionFactory())).run(key);
    }
    public insert<T = Object>(entity: T): Promise<Event> {
        return (new InsertQuery(this.makeStorageTransactionFactory())).run(entity);
    }
    public insertBatch<T = Object>(entities: T[]): Promise<Event> {
        return (new InsertBatchQuery(this.makeStorageTransactionFactory())).run(entities);
    }
    public update<T = Object>(entity: T): Promise<Event> {
        return (new UpdateQuery(this.makeStorageTransactionFactory())).run(entity);
    }
    public updateBatch<T = Object>(entities: T[]): Promise<Event> {
        return (new UpdateBatchQuery(this.makeStorageTransactionFactory())).run(entities);
    }
    public delete(key: string): Promise<Event> {
        return (new DeleteQuery(this.makeStorageTransactionFactory())).run(key);
    }
    public deleteBatch(keys: string[]): Promise<Event> {
        return (new DeleteBatchQuery(this.makeStorageTransactionFactory())).run(keys);
    }
}