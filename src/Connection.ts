export type ObjectStoreOptions = {
    autoIncrement?: boolean,
    keyPath?: string
}

export type ObjectStoreConfig = {
    name: string,
    options?: ObjectStoreOptions
}

const defaultObjectStoreOptions: ObjectStoreOptions = {
    keyPath: `id`,
    autoIncrement: true,
}

export default class Connection {
    public readonly db: IDBDatabase;

    constructor(db: IDBDatabase){
        this.db = db;
    }

    private static createFromConfigList(
        name: string,
        version: number,
        objectStoreConfigsList: ObjectStoreConfig[] = []
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const DBOpenRequest = indexedDB.open(name, version);
    
            DBOpenRequest.onupgradeneeded = function(): void {
                const db = DBOpenRequest.result;

                for (let objectStoreConfig of objectStoreConfigsList) {
                    db.createObjectStore(
                        objectStoreConfig.name,
                        Object.assign(defaultObjectStoreOptions, objectStoreConfig?.options ?? {})
                    );
                }

                db.close();
                resolve();
            }

            DBOpenRequest.onerror = function(event) {
                reject(event);
            }

            DBOpenRequest.onsuccess = function() {
                reject(new Error(`Unexpected event`));
            }
        });
    }

    private static resolveConnection(name: string, version: number): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const DBOpenRequest = indexedDB.open(name, version);

            DBOpenRequest.onsuccess = function(event){
                resolve(DBOpenRequest.result);
            };
            DBOpenRequest.onerror = function(event) {
                reject(event);
            };
            DBOpenRequest.onupgradeneeded = function() {
                reject(new Error(`Unexpected event`));
            };
        });
    }

    static create(
        name: string,
        objectStoreConfigsList: ObjectStoreConfig[] = [],
        beforeCreate = (name: string) => {},
        beforeNewVersion = (name: string, version: number) => {}
    ): Promise<Connection> {
        return new Promise(async (resolve, reject) => {
            const databases: IDBDatabaseInfo[] = await indexedDB.databases();
            const databaseInfo = databases.find(database => database.name === name);

            if (!databaseInfo) {
                beforeCreate(name);
                await this.createFromConfigList(name, 1, objectStoreConfigsList);

                resolve(new Connection(await this.resolveConnection(name, 1)));
                return;
            }
            
            const db = await this.resolveConnection(name, databaseInfo.version);
            const newObjectStoresConfigs: ObjectStoreConfig[] = [];

            // try to find new stores which not exists in current db version
            for (let objectStoreConfig of objectStoreConfigsList) {
                if (db.objectStoreNames.contains(objectStoreConfig.name)) {
                    continue;
                }

                newObjectStoresConfigs.push(objectStoreConfig);
            }

            if (!newObjectStoresConfigs.length) {
                resolve(new Connection(db));
                return;
            }

            db.close();

            const version: number = databaseInfo.version + 1;
            beforeNewVersion(name, version);

            await this.createFromConfigList(name, version, newObjectStoresConfigs);
            resolve(new Connection(await this.resolveConnection(name, version)));
        });
    }
}