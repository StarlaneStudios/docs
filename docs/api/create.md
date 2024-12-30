---
sidebar_position: 2
---

# Create
Create query writer resembles `CREATE` SQL statement. It is used to create various entities in SurrealDB database.

For additional information about that statement in SurrealQL you can refer to [official docs](https://docs.surrealdb.com/docs/surrealql/statements/create/).

## `create(...targets: SurrealValue[])`
Starts a new create query writer with the given targets.

## `createRecord(record: string)`
Starts a new create query writer for the given record.

Unlike the `create` function this function will ensure that the record is a valid record link, which may be beneficial in situations where potential injection attacks are a concern.

## `createRecord(table: string, id: string)`
Starts a new create query writer for the given record. This function is especially useful in situations where the table name within a record pointer may be spoofed, and a specific table name is required.

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

### `SET/CONTENT` clause

#### `.set(key: SchemaFields, value: any)`
Sets an individual field to a value.

#### `.setAll(fields: SchemaInput)`
Sets multiple fields at once using an object. Supports recursive objects and raw values. Can be used as effective alternative to `content`.

#### `.content(content: SchemaInput)`
Sets the content for the created record.

The content is serialized to JSON, meaning you can not use raw query values. Thus, when raw values are needed, use the `setAll` function instead.

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

