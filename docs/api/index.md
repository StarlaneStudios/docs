---
sidebar_position: 5
---

# API Reference

Cirql offers a flexible API for querying SurrealDB. This API is split into two parts: the Cirql class and the QueryWriter class.

## `Cirql` class
The `Cirql` class (and its `Legacy` variants) is the main entry point for querying SurrealDB. It provides a simple API for sending queries to the database and receiving the results.

### `new Cirql(options: CirqlOptions)`
Used to create a new Cirql instance. The `options` parameter is an object that may contain the following properties depending on what class is instantiated:

|                | `Cirql`            | `LegacyCirqlStateful` | `LegacyCirqlStateless` |
| -------------- | :----------------: | :------------------:  | :--------------------: |
| `connection`   | :x:                | :heavy_check_mark:    | :heavy_check_mark:     |
| `credentials`  | :x:                | :heavy_check_mark:    | :heavy_check_mark:     |
| `logging`      | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |
| `logPrinter`   | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |
| `autoConnect`  | :x:                | :heavy_check_mark:    | :x:                    |
| `retryCount`   | :x:                | :heavy_check_mark:    | :x:                    |
| `retryDelay`   | :x:                | :heavy_check_mark:    | :x:                    |
| `queryTimeout` | :x:                | :heavy_check_mark:    | :x:                    |

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
When enabled, the connection will be established automatically when the Cirql instance is created. When disabled, you will need to call `cirql.connect` manually.

#### `retryCount` (`10`)
The number of times to retry a query when it fails. This is useful when the connection is lost and the query needs to be retried.

#### `retryDelay` (`2000`)
The delay in milliseconds between each retry.

#### `queryTimeout` (`5000`)
The maximum possible duration in milliseconds for query attempt to wait for server response. If no response after the timeout will be present, that attempt will be considered as failed.

### `new Cirql(surreal: Surreal, options: CirqlOptions)`
Although Cirql provides an API to configure SurrealDB connection, you can also pass an instance of `Surreal` connection class as the first parameter to the constructor. In that case `options` parameter can be placed second.

That can be useful if you already have a preconfigured connection and just wait to add Cirql functionality on it.

> Note: only works for `Cirql` class constructor.

### Fields and methods
The following table shows which fields and methods are available for each class:

|                | `Cirql`            | `LegacyCirqlStateful` | `LegacyCirqlStateless` |
| -------------- | :----------------: | :------------------:  | :--------------------: |
| `connect`      | :x:                | :heavy_check_mark:    | :x:                    |
| `disconnect`   | :x:                | :heavy_check_mark:    | :x:                    |
| `isConnected`  | :x:                | :heavy_check_mark:    | :x:                    |
| `ready`        | :x:                | :heavy_check_mark:    | :x:                    |
| `handle`       | :heavy_check_mark: | :heavy_check_mark:    | :x:                    |
| `query`        | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |
| `execute`      | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |
| `batch`        | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |
| `transaction`  | :heavy_check_mark: | :heavy_check_mark:    | :heavy_check_mark:     |

#### `cirql.connect()`
Establishes a connection to the database. This is only required when `autoConnect` is set to `false`.

#### `cirql.disconnect()`
Closes the connection to the database.

#### `cirql.isConnected`
A boolean indicating whether the connection is currently open.

#### `cirql.ready()`
Returns a promise which can be awaited for the connection to open. This is useful if you need to execute queries as soon as the connection is available.

#### `cirql.handle`
Returns an underlying `Surreal` instance. All of its methods can be found [here](https://docs.surrealdb.com/docs/integration/sdks/nodejs).

#### `cirql.query(query: string, params: Record<string, any>)`
Sends a raw SQL query to the database with provided parameters (`params`) as an object and returns the result bypassing the validation logic. Here is an example of such operation:

```ts
const result = await cirql.query("SELECT * FROM user WHERE email = $email", {
    email: "john@doe.org",
});
```

However, as validation is bypassed, the type of `result` is `any`.

#### `cirql.execute(query: QueryRequest)`
Sends a single query to the database and returns the results. The `query` parameter is an object containing the following properties:

##### `query`
The query to execute, passed as an instance of `QueryWriter`. If you need to execute a raw query string, you can use the `query()` function to wrap a raw string in a `QueryWriter` instance or use the `cirql.query` method mentioned above.

##### `schema`
The Zod schema to use for the query. Query results are automatically validated against this schema unless `validate` is set to `false`. If the results don't match the schema, an error will be thrown.

Besides aiding in validation the schema also provides TypeScript typings for the results. This allows you to use the results in your code without having to cast them to a specific type.

> Note: you can provide validation schema via `.with` or `.with`-like methods in query writer itself. In that case you do not have to specify this exact property.

##### `params` (`{}`)
The object containing parameters for the query. They function the same as in the `cirql.query` method.

##### `validate` (`true`)
Determines whether to validate query result against the provided schema or not.

#### `cirql.batch(...queries: QueryRequest[])`
Allows you to send multiple queries in a single request. Returns an array containing the results of each query in the same order as the queries were passed to the function. This allows you to destructure the results easily, for example:

```ts
const [users, organisations] = await cirql.batch(
	{ query: select().from('user'), schema: User },
	{ query: select().from('organisation'), schema: Organisation }
);
```

#### `cirql.transaction(...queries: QueryRequest[])`
Similar to `cirql.batch`, except that all queries are executed in a single transaction. This means that either all queries will succeed or none of them will. This is useful for situations where you need to ensure that all queries succeed or fail together.
