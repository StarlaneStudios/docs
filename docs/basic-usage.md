---
sidebar_position: 3
---

# Basic usage

Once Cirql has been installed and connected to SurrealDB, you can start sending queries to the database.

```ts
import { query } from 'cirql';

const profiles = await cirql.execute({ 
    query: query('SELECT * FROM profile WHERE age > $minAge'),
    schema: z.any(),
    params: {
        minAge: 42
    }
});
```

The above example will send a raw string query to the database and return the result. The result will be validated against the provided schema, which in this case is `z.any()`. We have also stored the minimum age in a parameter, which will be automatically replaced in the query. Parameters are always escaped to prevent SQL injection attacks.

## Using the Query Writer API

Writing raw query strings is tedious and error prone. Cirql provides a Query Writer API to help you write queries in a more structured way.

```ts
import { select } from 'cirql';

export const Organisation = z.object({
    id: z.string(),
    name: z.string().min(1),
    isEnabled: z.boolean(),
    createdAt: z.string()
});

const organisations = await cirql.execute({ 
    query: select().from('organisation').where({ isEnabled: true }),
    schema: Organisation
});

// organisations has full TypeScript typing based on your Zod schema

```

In the above example we are using the `select` function to create a query writer. You can chain any number of functions to build up your query. Cirql provides query writer functions for most common SurQL statements, including `update`, `delete`, `relate`, and more.

The above example also makes use of a [Zod](https://github.com/colinhacks/zod) schema to validate the query result. This schema is used to infer the TypeScript typing of the result. This means that you can use the result as if it was typed as `Organisation[]`. The schema property is required for all queries, however you can set it to `z.any()` to disable validation.

### Available Query Writers
TODO - Link to individual pages<br/>
We currently provide the following query writers:
- `select()`
- `count()`
- `del()`
- `delRecord()`
- `create()`
- `createRecord()`
- `update()`
- `updateRecord()`
- `relate()`
- `relateRecords()`
- `letValue()`
- `query()`

## Raw query values & operators
While the Query Writer API provides a safe way to write queries, it is still possible to insert raw values into your queries. This can be useful for inserting SurrealDB [functions](https://github.com/StarlaneStudios/cirql/blob/main/lib/sql/functions.ts), [operators](https://github.com/StarlaneStudios/cirql/blob/main/lib/sql/operators.ts) or parameter names into `WHERE` clauses and `SET` expressions. By default values will use an equals sign (`=`).

In the following example we are creating a new organisation, and setting the `createdAt` field to the current time using the Surreal `time::now()` function.

```ts
const profile = await cirql.execute({ 
    query: create('organisation').setAll({
        name: 'Example',
        isEnabled: eq('$enable'),
        createdAt: eq(timeNow()) // time::now()
    }),
    schema: Organisation,
    params: {
        enable: true
    }
});
```

When adding or subtracting items from arrays, you can use the `add` and `remove` functions instead of eq for inserting `+=` and `-=` operators.

## Batched queries & transactions
While you can use `.execute()` to send a single query to SurrealDB, you can also use `.batch()` and `.transaction()` to send multiple queries in a single request.

The returned array will contain the results of each query in the same order as they were sent. If you are using TypeScript, the results will also be typed based on the schema you provided. You can destructure the results to get the individual values easily.

```ts
const [a, b, c, d] = await database.batch(
    {
        query: create('organisation').setAll({
            name: 'Example',
            isEnabled: eq('$enable'),
            createdAt: eq(timeNow())
        }),
        schema: Organisation,
        params: {
            enable: true
        }
    },
    {
        query: query('SELECT * FROM profile WHERE age > $minAge').single(),
        schema: Profile,
        params: {
            minAge: 42
        }
    },
    {
        query: count('organisation')
    },
    {
        query: select('id').from('organisation').where({ isEnabled: true }),
        schema: Organisation.pick({ id: true })
    }
);
```