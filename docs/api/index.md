---
sidebar_position: 5
---

# API Reference

Cirql offers a flexible API for querying SurrealDB. This API is split into two parts: the Cirql class and the QueryWriter class.

## `Cirql`
The Cirql class (and `StatelessCirql` variant) is the main entry point for querying SurrealDB. It provides a simple API for sending queries to the database and receiving the results.

### `new Cirql(options: CirqlOptions)`
Used to create a new Cirql instance. The `options` parameter is an object containing the following properties:

#### `connection`
An object containing the connection details for the database. The following properties are available:
- `endpoint` - The URL of the SurrealDB server.
- `namespace` - The namespace to use for the connection. This is optional and defaults to `default`.
- `database` - The database to use for the connection. This is optional and defaults to `default`.

#### `credentials`
An object containing the credentials for the connection. The following properties are available:
- `user` - The username to use for the connection.
- `pass` - The password to use for the connection.
- `NS` - The namespace to use for the connection.
- `DB` - The database to use for the connection.
- `SC` - The scope to use for the connection.
- `token` - The token to use for the connection. When this is specified the other credentials are ignored.


#### `logging` (`false`)
Enables logging of queries and parameters. When enabled, queries will be printed to `console.log`. You can customize the
logging output using `logPrinter`.

#### `logPrinter` (`console.log`)
A function that is called when a query is executed. The function receives the query string and the parameters as arguments. You can use this hook to log queries to a custom logging service.

#### `autoConnect` (`true`)
When enabled, the connection will be established automatically when the Cirql instance is created. When disabled, you will need to call `.connect()` manually.

#### `retryCount` (`10`)
The number of times to retry a query when it fails. This is useful when the connection is lost and the query needs to be retried.

#### `retryDelay` (`2000`)
The delay in milliseconds between each retry.

### `cirql.connect()`
Establishes a connection to the database. This is only required when `autoConnect` is set to `false`.

### `cirql.disconnect()`
Closes the connection to the database.

### `cirql.isConnected`
A boolean indicating whether the connection is currently open.

### `cirql.ready()`
Returns a promise which can be awaited for the connection to open. This is useful if you need to execute queries as soon as the connection is available.

### `cirql.execute(query: QueryRequest)`
Sends a single query to the database and returns the results. The `query` parameter is an object containing the following properties:

#### `query`
The query to execute, passed as an instance of `QueryWriter`. If you need to execute a raw query string, you can use the `query()` function to wrap a raw string in a `QueryWriter` instance.

#### `schema`
The Zod schema to use for the query. Query results are automatically validated against this schema. If the results don't match the schema, an error will be thrown.

Besides aiding in validation the schema also provides TypeScript typings for the results. This allows you to use the results in your code without having to cast them to a specific type.

### `cirql.batch(...queries: QueryRequest[])`
Allows you to send multiple queries in a single request. Returns an array containing the results of each query in the same order as the queries were passed to the function. This allows you to destructure the results easily, for example:

```ts
const [users, organisations] = await cirql.batch(
	{ query: select().from('user'), schema: User },
	{ query: select().from('organisation'), schema: Organisation }
);
```

### `cirql.transaction(...queries: QueryRequest[])`
Similar to `batch`, except that all queries are executed in a single transaction. This means that either all queries will succeed or none of them will. This is useful for situations where you need to ensure that all queries succeed or fail together.
