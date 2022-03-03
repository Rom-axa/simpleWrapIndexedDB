export default abstract class BaseQuery
{
    protected transactionResolver: Function;

    protected makeObjectStoreTransaction(type: string): IDBObjectStore {
        return this.transactionResolver(type);
    }

    constructor(transactionResolver: Function){
        this.transactionResolver = transactionResolver;
    }

    public abstract run(...arg: any): Promise<any>;
}