export default abstract class BaseQuery {
    protected transactionResolver: Function;
    protected makeObjectStoreTransaction(type: string): IDBObjectStore;
    constructor(transactionResolver: Function);
    abstract run(...arg: any): Promise<any>;
}
