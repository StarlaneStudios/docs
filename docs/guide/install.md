---
sidebar_position: 2
---

# Installation

The first step to use Cirql is to install the package from npm, together with a supported version of zod.
```
npm install cirql zod
```

You can of course use any package manager (npm, yarn, pnpm, etc).

## Connecting to SurrealDB

You can connect to SurrealDB in 3 ways:
- statefull way using WebSockets from surrealdb.js API (new from v1.0.0); 
- statefull way using WebSockets (legacy v0.7.9);
- stateless way using HTTP requests (legacy v0.7.9). 

### Statefull request

By default, since v1.0.0, Cirql uses [surrealdb.js API](https://docs.surrealdb.com/docs/integration/sdks/nodejs/) to connect to SurrealDB instance. This ensures compatibility with existing official SDK and allow to add Cirql functionality on top of it. 
Here is an example how to connect to database:

```ts
import { Cirql } from 'cirql';

const cirql = new Cirql();

await cirql.handle.connect('http://localhost:8000/');
await cirql.handle.signin({
    namespace: 'test',
    database: 'test',
    username: 'root',
    password: 'root',
});
```

This will automatically make Cirql open a connection to SurrealDB.

### Legacy statefull request

Here is an example how to connect to database using v0.7.9 API:

```ts
import { LegacyCirqlStateful } from 'cirql';

const cirql = new LegacyCirqlStateful({
    connection: {
        endpoint: 'http://localhost:8000/',
        namespace: 'test',
        database: 'test',
    },
    credentials: {
        user: 'root',
        pass: 'root',
    }
});
```

This will automatically make Cirql open a connection to SurrealDB. If you prefer to handle this manually, you may configure `autoConnect` to `false`.

#### Waiting for the connection

You can wait for the connection to open by using the ready function. From this point on you will be able to send queries to the database.
```ts
await cirql.ready();
```

Alternatively, you can also listen to the `open` event using `addEventListener`.

#### Manual connection management

If you have to disabled auto connect, you can manually initiate the connection using the connect function.
```ts
cirql.connect();
```

When you need to dispose of your connection, simply call the disconnect function.
```ts
cirql.disconnect();
```
