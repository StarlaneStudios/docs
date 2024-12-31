---
sidebar_position: 4
---

# Stateless requests

By default Cirql will connect to SurrealDB using stateful WebSockets. This allows you to send queries to the database and receive the results in real-time. However, this also means that you need to keep the connection open. If you are building a serverless application, this may not be ideal.

Cirql provides an alternative API for sending queries in seperate HTTP requests. This is especially useful for situations like Server Side Rendering where credentials may differ per request.

```ts
import { LegacyCirqlStateless, select } from 'cirql';

const cirql = new LegacyCirqlStateless({
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

// You can now use the cirql instance as normal without
// having to call .disconnect()

const organisations = await cirql.execute({ 
    query: select().from('organisation').where({ isEnabled: true }),
    schema: Organisation
});
```

Since there is no need to close a connection you don't need to keep a reference to the Cirql instance. You can simply create a new instance for each request.

When you don't need stateless behavior is it highly recommended to use the stateful API instead. This will decrease the time each query takes as it doesn't need to authenticate for each request.
