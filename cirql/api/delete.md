---
sidebar_position: 4
---

# Delete
Delete query writer resembles `DELETE` SQL statement. It is used to delete various entities in SurrealDB database.

For additional information about that statement in SurrealQL you can refer to [official docs](https://docs.surrealdb.com/docs/surrealql/statements/delete/).

> Note: do not confuse it with other similar statement - `REMOVE`.

## `del(...targets: SurrealValue[])`
Starts a new delete query writer with the given targets.

> Note: as 'delete' is already a JavaScript [keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete/), all Cirql functions that construct delete query writer have 'del' prefix.

## `delRecord(record: string)`
Starts a new delete query writer for the given record.

Unlike the `del` function this function will ensure that the record is a valid record link, which may be beneficial in situations where potential injection attacks are a concern.

## `delRecord(table: string, id: string)`
Starts a new delete query writer for the given record. This function is especially useful in situations where the table name within a record pointer may be spoofed, and a specific table name is required.

## `delRelation(relation: RecordRelation)`
Starts a new delete query writer for the given relation. This function is especially useful in situations where the table names within a record pointer may be spoofed, and specific table names are required.

Since this function will automatically configure a `WHERE` clause, calling `.where()` manually will throw an exception.

## Methods
Cirql provides methods of 2 types:
- Cirql-native above SurrealQL (described in 'sections');
- SurrealQL-native resembling SurrealQL clauses (described in respective 'clauses').

### `WITH` section

#### `.with<NS extends ZodTypeAny>(schema: NS)`
Defines the Zod schema that should be used to validate the query result.

#### `.withSchema<T extends ZodRawShape>(schema: T)`
Defines the schema that should be used to validate the query result, useful in situations where you need to validate the query result against the schema without creating one beforehand.

This is short for `with(z.object(schema))`.

#### `.withAny()`
Defines a schema which accepts any value, useful in situations where a specific schema isn't needed.

This is short for `with(z.any())`.

### `WHERE` clause

#### `.where(where: string | Where)`
Defines a predicate function that determines whether a specific query will be deleted or not. All values will be escaped automatically. Use of `raw` is supported, as well as any operators wrapping the raw function.

### `RETURN` clause

#### `.return(mode: 'none' | 'before' | 'after' | 'diff')`
Defines the return behavior mode `mode` for the query.

Mode can be either one of these:
- `'none'` - Doesn't return any result;
- `'diff'` - Returns the changeset diff;
- `'before'` - Returns the record before changes were applied;
- `'after'` - Returns the record after changes were applied.

If no value is set throughout query writer configuring, the default one is `'after'`.

#### `.return(...fields: SchemaFields[])`
Defines the return behavior mode for the query as returning specified fields.

### `TIMEOUT` clause

#### `.timeout(timeout: number)`
Sets the timeout in seconds for the query.

### `PARALLEL` clause

#### `.parallel()`
Runs the query in parallel.

