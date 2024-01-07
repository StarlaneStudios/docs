---
sidebar_position: 6
---

# Relate
Create query writer resembles `RELATE` SQL statement. It is used to relate various entities in SurrealDB database between themselves in logical 2-way verb (its object and subject) relationship.

For additional information about that statement in SurrealQL you can refer to [official docs](https://docs.surrealdb.com/docs/surrealql/statements/relate/).

## `relate(from: SurrealValue, edge: string, to: SurrealValue)`
Starts a new relate query writer for a relation described as a set of parameters.

## `relateRelation(relation: RecordRelation)`
Starts a new relate query writer for a relation described as `RecordRelation` object.

This function is especially useful in situations where the table name within a record pointer may be spoofed, and a specific table name is required.

> Note: these two expressions will build up the same writer: 
>
> ```ts
> relate(
>     'person:l19zjikkw1p1h9o6ixrg', 
>     'wrote', 
>     'article:8nkk6uj4yprt49z7y3zm'
> )
> ```
> and:
> ```ts
> relateRelation({
>     fromId: 'person:l19zjikkw1p1h9o6ixrg',
>     edge: 'wrote',
>     toId: 'article:8nkk6uj4yprt49z7y3zm'
> })
> ```

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

