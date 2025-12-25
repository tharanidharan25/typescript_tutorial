# Narrowing

### Wider vs Narrower Types

#### Some types are wider versions of other types

> For example, type `string` is wider than the literal type `small`.
Similarly, `404` is a narrower type than the type `number`.

> Narrower version of a type can take the place of the wider version.

### Unions are wider than their members

#### A union type is wider type than its members.

> For example, `string | number` is wider than `string` or `number` on their own.

> However, `this does not work in reverse`. We can't pass a `string | number` to a function that only accepts `string`

## What is Narrowing?

#### Narrowing in TS lets us take a wider type and make it narrower using runtime code.

This is useful when we want to do different things based on the type of a value. For example, we might want to handle a string differently to a number.

### Narrowing with `typeof`

One way we can narrow down the type of a value is to use the `typeof` operator, combined with an `if statement`.

```
const getAlbumYear = (year: string | number | boolean) => {
    if (typeof year === 'string') {
        console.log(`The album was released in ${year.toUpperCase()}.`)
    } else if (typeof year === 'number') {
        console.log(`The album was released in ${year.toFixed(0)}.`)
    }
    
    // year is string | number | boolean
    console.log(year)
}
```

### Other ways to Narrow

TS can use other conditional operators like `&&` and `||` and will take the truthiness into account for coercing the boolean value.

We can also use `instanceof` and `in` for checking object properties. We can even throw errors and use early returns to narrow types.