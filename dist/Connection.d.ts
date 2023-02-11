export type ObjectStoreOptions = {
    autoIncrement?: boolean;
    keyPath?: string;
};
export type ObjectStoreConfig = {
    name: string;
    options?: ObjectStoreOptions;
};
export default class Connection {
    readonly db: IDBDatabase;
    constructor(db: IDBDatabase);
    private static createFromConfigList;
    private static resolveConnection;
    static create(name: string, objectStoreConfigsList?: ObjectStoreConfig[], beforeCreate?: (name: string) => void, beforeNewVersion?: (name: string, version: number) => void): Promise<Connection>;
}
