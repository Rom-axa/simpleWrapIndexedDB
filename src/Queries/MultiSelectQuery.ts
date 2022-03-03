import QueryResult from "../QueryResult";
import BaseQuery from "./BaseQuery";

export default class MultiSelectQuery extends BaseQuery
{
    public run(limit: number, offset: number, filter: CallableFunction, desc: boolean): Promise<QueryResult> {
        return new Promise((res, rej) => {
            const openedCursor = this.makeObjectStoreTransaction(`readonly`).openCursor(undefined, desc ? `prev` : undefined);
            const result: any[] = [];
    
            openedCursor.onsuccess = function() {
                const cursor = openedCursor.result;
                
                if (!cursor) {
                    res(new QueryResult(result));
                    return;
                }
                
                const { value } = cursor;

                if (!filter(value)) {
                    return cursor.continue();
                }

                if (offset >= 1) {
                    offset--;
                    return cursor.continue();
                } else {
                    limit--;
                }

                result.push(value);

                if (limit < 1) {
                    res(new QueryResult(result));
                } else {
                    cursor.continue();
                }
            };
            openedCursor.onerror = function(event: Event) {
                rej(event);
            };
        });
    }
}