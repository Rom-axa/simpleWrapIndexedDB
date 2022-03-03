# Simple wrap for IndexDB

```ts
import Connection from 'simpleIndexDb';
import Database from 'simpleIndexDb';

const DB_NAME = `my_first_db`;
const STORAGES = [
    { name: `users` },
    { name: `images` }
];

(async () => {
    const connection = await Connection.create(DB_NAME, STORAGES);
    const database = new Database(connection);

    await database.storage(`users`).insert({ name: `Max`, rating: 9 });
    
    // { id: 1 name: `Max`, rating: 9 }
    const user = await database.storage(`users`).find(1);
    user.rating = 5;

    await database.storage(`users`).update(user);
    
    await database.storage(`users`).insertBatch([
        {name: `Alex`, rating: 4},
        {name: `Anna`, rating: 8},
        {name: `Jane`, rating: 1},
        {name: `Donald`, rating: 9},
    ]);

    const result = await database.storage(`users`).filter(user => user.rating > 5).get();
    // [{id: 3, name: `Anna`, rating: 8}, {id: 5, name: `Donald`, rating: 9}]
    result.items;

    const usersIdsToDelete = result.items.map(user => user.id);

    await database.storage(`users`).deleteBatch(usersIdsToDelete);

    const result2 = await database.storage(`users`).get();
    // [
    //     { id: 1 name: `Max`, rating: 9 },
    //     { id: 2, name: `Alex`, rating: 4 },
    //     { id: 4, name: `Jane`, rating: 1 },
    // ]
    const users = result2.items;
    users.forEach(user => user.rating = 10);

    await database.storage(`users`).updateBatch(users);

    const result3 = await database.storage(`users`).limit(2).desc().get();
    // [{ id: 4, name: `Jane`, rating: 10 }, {id: 2, name: `Alex`, rating: 10}]
    result3.items;
})();
```

# Create database

Connection.create method will create db with **databaseName** if it is not exists.

If database already exists **Connection.create** will check diff of it current storages with list in second argument **storagesList**. In case of new storages
which are in **storagesList** but not exists in current db - method will increase
db version and create new storages. If diff show nothing - method just make connection to current db version 

```ts
Connection.create(databaseName, storagesList)
```

