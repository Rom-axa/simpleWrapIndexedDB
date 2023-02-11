import Connection from "./Connection";
import DatabaseInterface from "./Contracts/DatabaseInterface";
import DatabaseStorageInterface from "./Contracts/DatabaseStorageInterface";
export default class Database implements DatabaseInterface {
    private connection;
    private storages;
    constructor(connection: Connection);
    storage(name: string): DatabaseStorageInterface;
}
