---
sidebar_position: 1
---

# Select

Select query writer resembles `SELECT` SQL statement. It is used to recieve information from SurrealDB database.

For additional information about that statement in SurrealQL you can refer to [official docs](https://docs.surrealdb.com/docs/surrealql/statements/select/).

## `select(...projections: string[])`
Starts a new select query writer with given projections to return. Omitting that parameter will select all projections.

> Note: `select('*')` works the same way as `select()`.

## `selectValue(projection: string)`
Starts a new select query writer with only one given projection to return.

The difference is that, for example, `select('id')` would return a set of *records* with one projection 'id' while `selectValue('id')` would return a set of respective *IDs themselves* without being wrapped in record.

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

### `AND` section

#### `.and(projection: string)`
Appends another projection to the query.

> Note: usually it is recommended to pass projections to `select`, however in certain situations it may be useful to add additional ones to the query.

#### `.andQuery(alias: string, query: SelectQueryWriter)`
Appends a subquery projection to the query. The query will be aliased with the given alias.

#### `.andQueryOne(alias: string, query: SelectQueryWriter)`
Appends a subquery projection to the query. The query will be aliased with the given alias. Unlike `andQuery`, this will only take *the first* record from the subquery.

### `FROM` clause

#### `.from(...targets: Surreal[])`
Specifies the targets for the query. This can include table names, record IDs, and subqueries.

#### `.fromRecord(record: string)`
Specifies the target for the query as a record pointer.

> Note: this function automatically sets the limit to 1.

#### `.fromRecord(table: string, id: string)`
Specifies the target for the query as a record pointer. This function is especially useful in situations where the table name within a record pointer may be spoofed, and a specific table name is required.

> Note: this function automatically sets the limit to 1.

#### `.fromRelation(relation: RecordRelation)`
Specifies the target for the query as a relation. This function is especially useful in situations where the table names within a record pointer may be spoofed, and specific table names are required.

Since this function will automatically configures a `WHERE` clause, calling `.where()` manually will throw an exception.

### `WHERE` clause

#### `.where(where: string | Where)`
Defines a predicate function that determines whether a specific query will be included in the final result or not. All values will be escaped automatically. Use of `raw` is supported, as well as any operators wrapping the raw function.

### `SPLIT` clause

#### `.split(...split: SchemaFields[])`
Defines the split fields for the query.

### `GROUP BY/GROUP ALL` clause

#### `.groupBy(...group: SchemaFields[])`
Defines the fields to group by. If you are grouping by all fields, use the `groupAll()` method instead.

#### `.groupAll()`
Groups by all fields.

### `ORDER BY` clause

#### `.orderBy(ordering: { [fieldName]: 'asc' | 'desc' })`
Defines the order of query results for each of specified fields.

#### `.orderBy(field: SchemaFields, order: 'asc' | 'desc')`
Defines the order of the query results, sorting only for specified fields. If no order is specified, the default order is ascending.

### `LIMIT` and `START` clause

#### `.limit(limit: number)`
Limits the number of records returned by the query.

#### `.one()`
Limits the number of records returned by the query to one. This is useful for queries that are expected to return a single record.

Unlike `limit(1)`, this method will cause the query to return not an *array of records* when executed, but a *single record* instead.

#### `.start(start: number)`
Starts the query at the given index.

### `FETCH` clause

#### `.fetch(...fetch: SchemaFields[])`
Defines the paths to the fields to fetch.

### `TIMEOUT` clause

#### `.timeout(timeout: number)`
Sets the timeout in seconds for the query.

### `PARALLEL` clause

#### `.parallel()`
Runs the query in parallel.

