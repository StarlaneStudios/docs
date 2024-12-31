---
sidebar_position: 7
---

# Let parameters
Let query writer is used for creating intermediate variables in query that, for exapmple, would be too complex or repeating otherwise.

This statement is particularly useful in combination with multi-statement executors - `batch` and `transaction`.

## `letValue(name: string, value: any)`
Used to create let query writer with provided name and value.

#### `name`
Name should be a string containing only alphanumeric characters.

#### `value`
Value of variable could be anything. The final value that would be inserted into query is depending on the type on `value` as such:
- if a raw query - the raw value;
- if a query writer - the final query execution result;
- if null - the string `'NONE'`;
- if date - the ISO formatted string;
- otherwise - the JSON value stringified.

## Reserved names
You can not define variables with reserved names, but can access them in queries:

| Variable name | Value      |
|-------------- | ---------- |
| `$auth`	    | Represents the currently authenticated scope user |
| `$token`	    | Represents values held inside the JWT token used for the current session |
| `$Scope`	    | Represents the name of the scope of a currently authenticated scope user |
| `$session`	| Represents values from the session functions as an object |
| `$before`	    | Represents the value before a mutation on a field |
| `$after`	    | Represents the value after a mutation on a field |
| `$value`	    | Represents the value after a mutation on a field (identical to `$after` in the case of an event) |
| `$input`	    | Represents the initially inputted value in a field definition, as the value clause could have modified the `$value` variable |
| `$parent`	    | Represents the parent record in a subquery |
| `$event`	    | Represents the type of table event triggered on an event |

## Helper functions

### `param(value: string)`
Used to insert variable name into query, which would otherwise require the `'$'` symbol to prefix the name.

So, `param('people')` and `'$people'` are basically the same.

## Examples
Those are 2 examples how let parameters can be used to factor up the logic of the query.

1. Using `letValue` for query writer:
```ts
await cirql.transaction({
	query: letValue('orgs', select('name').from('organisation'))
}, {
	query: select()
		.from('$orgs') // Note the '$' marking a variable
		.withAny()
})
```

2. Using `letValue` for raw value:
```ts
await ciqrl.transaction({
	query: letValue('people', ['Alfred', 'Bob', 'John'])
}, {
	query: select()
		.from('person')
		.with(RecordSchema)
		.where({
			name: inside(param('people'))
		})
})
```
