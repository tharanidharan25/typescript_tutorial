## Function Parameter Annotations
***Function parameters always need Type Annotations if the parameter is not given a default value, else TypeScript implicitly gives them `any` type, which is unsafe.***

```
function logSongInfo(
    title = "",
    year: number,
    isReleased: boolean
) {
    console.log(title, year, isReleased)
}

logSongInfo("Bohemian Rhapsody", 1975, true)
```

## Variable Annotations
```
const albumTitle: string = "Midnights"
let isReleased: boolean = true
let trackCount: number = 13
```

### Basic Types
Here are the basic types we can use to annotate our code. However, variable doesn't always need annotations, TypeScript is intelligent enough to "infer" from the values.

```
const name: string = "Tharani"
const dob: number = 2001
const isWoke: boolean = true
const symbol: symbol = Symbol()
const netWorth: bigint = 9999994247238947238974239847239847239874n
const gf: null = null
const sadness: undefined = undefined
```

## The Any type
- When TS doesn't know what type something is, it implicitly assigns the `any` type.

- The `any` types `breaks the type system`, basically it turns off the type safety for the thing it's assigned to.

- This means that anything can be assigned to it, any property can be accessed/assigned to and it can be called like a function.

```
let anyVariable: any = "This can be anything"
anyVariable() // No Compile time Error
anyVariable.deep.property.access; // No Compile time Error
```

The above code will error at Runtime, but TS is not warning us.

So, `any` type can be used to turn off errors in TypeScript. It can be a useful hatch if the type is too complex to describe

## Object Literal Types

- Object types are used to describe the shape of objects.
- Each property of an object can have its own annotation.

```
const talkToAnimal = (animal: { name: string, type: string, age: number }) => {
    console.log(`Hello ${name}`)
}
```

#### Optional Object Properties
We can use `?` operator to make the `age` property as optional:

```
const talkToAnimal = (animal: { name: string, type: string, age?: number }) => {
    console.log(`Hello ${name}`)
}
```

## Type Aliases
So far, we've been declaring all of our types inline. This is fine for simple examples, but in a real application, we will have types which will repeat throughout the application.

This is where the `type` keyword comes in and it allows us to define a type once and re-use it in multiple places.

```
type Animal = {
    name: string;
    type: string;
    age?: number;
}
```

This is called as a `type alias`. We can give a name to a type and use the name wherever we need to use that type.

To create a new variable with the Animal type, we will use it as type annotation after the variable name like this:
```
const pet: Animal = {
    name: "Churros",
    type: "dog"
}
```

Type Aliases can be Objects, but can also be basic types

```
type Id = string | number
```

`Using a type alias is a great way to ensure there's a single source of truth for a type definition, which makes it easier to make changes in the future.`

## Sharing Types across Modules
- Type Aliases can be created in their own `.ts` files and imported into the files where we need them.
- This is useful when sharing types in multiple places, or when a type definition gets too large.

```
<!-- In shared.types.ts -->
export type Animal = {
    name: string;
    type: string;
}

<!-- In index.ts -->
import { Animal } from "./shared-types.ts"
```

## Typing Arrays
- There are two types of syntaxes for typing arrays.

    * The first option is to use the `square brackets` like below:
        ```
        let albums: string[] = [
            "Rubber Soul",
            "Revolver",
        ]
        ```
    * The second option is to explicitly use the `Array` type with angle brackets containing the type of data array will hold.
        ```
        let albums: Array<string> = [
            "Rubber Soul",
            "Revolver",
        ]
        ```
- Both syntaxes are same, but the `Square bracket` syntax is bit more concise when creating Arrays.

- We can type Aliases too.

### Tuples
- Tuples let us specify an array with a fixed number of elements, where each element has its own type.

- We can create the tuple using the square brackets same as Array except that the square bracket contains the types like below:
```
let album: [string, number] = ["Rubber Soul", 1965]
```

- Tuples are useful for grouping related information together without having to create a new type.

```
let albumWithPlayCount: [Album, number] = [
    {
        artist: "The Beatles",
        title: "Revolver",
        year: 1965,
    },
    10000,
]
```

## Passing Types to Types

```
Array<string>
```

- This type describes a Array of Strings, for that we are passing the type `string` to the type `Array`.

- There are lots of other types that can receive types like `Promise<string>`, `Record<string>` and others.
- We use `angle brackets` to pass a type to another type

<br>
<br>

We can use this same syntax to pass types to functions:
## Passing types to `Set`
We can create a `set` in JS like this:
```
const formats = new Set()
```
- If we hover over the 'formats' variable, we can see that it is types as `Set<unknown>`
- That's because the set doesn't know what type it's supposed to be! We have passed it any values yet, so it defaults to `unknown` type
- We can some initial values to let TS know what is the type of the values that the set will or can hold. But, we may not always know what values we will pass into the set when we declare the set or we might want to create an empty set. For this we can use:

```
const formats = new Set<string>()
```
Now, formats is a set of strings

## Not all functions can receive types
#### `Most functions in TS can't receive types.`

A common example would be document.getElementById().

```
const audioElement = document.getElementById<HTMLAudioElement>("player")
```
If we do this,we get an error saying that `.getElementById` expects `zero type arguments`

But, `document.querySelector` can receive type arguments, we can find this by hovering over it and if we see angle brackets next to the function name, then the function will be able to receive type arguments. Whatever value is inside the angle brackets in function signature (shown when hovered over the function) is what will be default type of the function

## Function Types

We can use TS to annotate the functions themselves, not just the parameters

```
type Mapper = (item:  string) => number
```
This is the type alias for a function that takes in a string and returns a number

We can then use this type to annotate a callback function passed to another function like this:
```
const mapOverItems = (items: string[], mapperFn: Mapper) => {
    return items.map(mapperFn)
}
```

or we can also declare it inline:
```
const mapOverItems = (items: string[], mapperFn: (item: string) => number) => {
    return items.map(mapperFn)
}
```

## The `void` type

Some functions don't return anything.

A great example is `console.log("Hellooo")`

TS has a special type for these situations where a function's return value should be deliberately ignored. It's called `void`

If we hover over console.log, we can see the following annotation:
```
(method) Console.log(...data: any[]): void
```