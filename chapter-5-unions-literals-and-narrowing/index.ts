import type { Expect, Equal } from '@type-challenges/utils';

// Union Types

// Union Types are when we use the Pipe character ("|") to say that the type can be either this or that
const logId = (id: string | number) => {
    console.log(id)
}

logId(1)
logId('1')
// logId(true) // Won't work since the argument is a boolean




// Literal Types

// Literal types is when we say that the literal value is the only values that are allowed
type YesOrNo = "yes" | "no"
type StatusCode = 200 | 404 | 500

// This feature is what powers the document.addEventListener, first argument in document.addEventListener is a union of string literals, which is why we get autocomplete of different event types.
document.addEventListener(
    "click", // Union of string literals including "click"
    () => {}
)



// Union of Unions

// When we combine a union type with another union type, we make a big union type
type DigitalFormat = "MP3" | "FLAC"
type PhysicalFormat = "LP" | "CD" | "Cassette"

// Union of Unions
type AlbumFormat = DigitalFormat | PhysicalFormat



// Exercises
// Exercise 1
const exercise1 = () => {
    function getUsername(username: string | null) {
        if (username !== null) {
            return username
        }
        return 'Guest'
    }
    const result = getUsername("Alice")
    type test = Expect<Equal<typeof result, string>>
    
    const res2 = getUsername(null)
    type test2 = Expect<Equal<typeof res2, string>>
}
exercise1()

const exercise2 = () => {
    type directions = 'up' | 'down' | 'left' | 'right'
    // Valid directions are only up, down, right, and left
    function move(direction: directions, distance: number) {
        // Move the specified distance in the given direction
    }
    // @ts-expect-error
    move('up-right', 10)
    // @ts-expect-error
    move('down-left', 10)
}
exercise2()



// Refer Markdown Line 1



// Narrowing with typeof
const getAlbumYear = (year: string | number | boolean) => {
    if (typeof year === 'string') {
        console.log(`The album was released in ${year.toUpperCase()}.`)
    } else if (typeof year === 'number') {
        console.log(`The album was released in ${year.toFixed(0)}.`)
    }
    console.log(year) // year is string | number | boolean
}

// Exercises
const narrowing1 = () => {
    // Narrowing using if block
    function validateUsername(username: string | null): boolean {
        if (typeof username === 'string') return username?.length > 5
        
        return false
    }
}
