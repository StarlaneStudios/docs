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

You can connect to SurrealDB in a statefull or stateless way. For this tutorial we will be using the statefull API using WebSockets under the hood.

```ts
import { Cirql } from 'cirql';

const cirql = new Cirql({
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

### Waiting for the connection

You can wait for the connection to open by using the ready function. From this point on you will be able to send queries to the database.
```ts
await cirql.ready();
```

Alternatively, you can also listen to the `open` event using `addEventListener`.

### Manual connection management

If you have to disabled auto connect, you can manually initiate the connection using the connect function.
```ts
cirql.connect();
```

When you need to dispose of your connection, simply call the disconnect function.
```ts
cirql.disconnect();
```