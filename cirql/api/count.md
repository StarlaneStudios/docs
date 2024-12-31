---
sidebar_position: 8
---

# Counting rows
Count query writer is used to count the rows of the table.

Under the hood it performs `SELECT` query with SurrealQL [`count`](https://docs.surrealdb.com/docs/surrealql/functions/count/) function. It may be useful to build subquery in `SELECT` main query with `GROUP BY/GROUP ALL` clause. 

## `count(target: SurrealValue)`
Starts a new count query writer with the given target.

## `countRecord(record: string)`
Starts a new count query writer for the given record.

Unlike the `count` function this function will ensure that the record is a valid record link, which may be beneficial in situations where potential injection attacks are a concern.

## `countRecord(table: string, id: string)`
Starts a new count query writer for the given record. This function is especially useful in situations where the table name within a record pointer may be spoofed, and a specific table name is required.

## `countRelation(relation: RecordRelation)`
Starts a new count query writer for the given relation. This function is especially useful in situations where the table names within a record pointer may be spoofed, and specific table names are required.

Since this function will automatically configure a `WHERE` clause, calling `.where()` manually will throw an exception.

## Methods

### `WHERE` clause

#### `.where(where: string | Where)`
Defines a predicate function that determines whether a specific query will be counted or not. All values will be escaped automatically. Use of `raw` is supported, as well as any operators wrapping the raw function.
