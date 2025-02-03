---
sidebar_position: 1
---

# What is Cirql

Cirql is a simple and lightweight ORM and query builder for <a href="https://surrealdb.com/">SurrealDB</a> with
built in model mapping and validation powered by <a href="https://github.com/colinhacks/zod">Zod</a>.
Unlike most query builders, Cirql takes a very open approach, providing you with complete control over your queries.

## Features
- 🔗 Connect to SurrealDB over stateful WebSockets or stateless requests
- 📦 Support for query batching & transactions
- ⚙️ Zod-powered schema validation of query results
- 📝 Full TypeScript support with Zod schema inference
- 💎 Write flexible queries using the Query Writer API

You can find the roadmap of intended features [here](https://github.com/StarlaneStudios/cirql/blob/main/ROADMAP.md).<br />
The changelog of previous versions can be found [here](https://github.com/StarlaneStudios/cirql/blob/main/CHANGELOG.md).

## Why does Cirql use Zod?
We believe that your code should always be fully in sync with your database. Since a database is a complex ever changing environment, it is important for your TypeScript types to correctly describe your query results. Zod will enforce these types and prevent incorrect data from being casted and potentially causing issues further down in your code base.

While you can always disable zod by specifying `z.any()` for a query, the benefit of writing Zod schemas is that if a query returns an unexpected result, instead of continuing and potentially leading to unclear issues and undefined behavior, the query function will fail with a descriptive explanation.

## Maintainers
Cirql is built and maintained by <a href="https://starlane.studio/">Starlane Studios</a> at no cost.<br />
If you would like to support our work feel free to [donate to us](https://paypal.me/StarlaneStudios) ⚡