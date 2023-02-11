import DatabaseStorage from "./DatabaseStorage";
import Connection from "./Connection";
import DatabaseInterface from "./Contracts/DatabaseInterface";
import DatabaseStorageInterface from "./Contracts/DatabaseStorageInterface";

type StoragesList = {
    [name: string]: DatabaseStorageInterface 
}

export default class Database implements DatabaseInterface {
    private connection: Connection;
    private storages: StoragesList = {};

    constructor(connection: Connection){
        this.connection = connection;
    }

    public storage(name: string): DatabaseStorageInterface {
        if (name in this.storages) {
            return this.storages[name];
        }

        this.storages[name] = new DatabaseStorage(this.connection, name);
        return this.storage(name);
    }
}