import DatabaseStorageInterface from "./DatabaseStorageInterface";
export default interface DatabaseInterface {
    storage(name: string): DatabaseStorageInterface;
}
