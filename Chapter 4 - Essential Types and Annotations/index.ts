import type { Expect, Equal } from '@type-challenges/utils';
import { expect, it } from "vitest";

// Importing shared types
import { Animal } from './shared.types';


// Function Parameter Annotations, Function parameters always need Type Annotations if the parameter is not given a default value, else TypeScript implicitly gives them "any" type, which is unsafe.

function logSongInfo(
    title: string,
    year: number,
    isReleased: boolean,
    format: string = "CD", // Default value for the parameter
    // we can also omit the :string annotation and just write format = "CD"
    releaseDate?: string // Optional parameter
): string { // Function return type
    console.log(title, year, isReleased)
    return title
}

logSongInfo("Bohemian Rhapsody", 1975, true)

// Variable Annotations
const albumTitle: string = "Midnights"
let isReleased: boolean = true
let trackCount: number = 13

// Basic Types
/* 
    Here are the basic types we can use to annotate our code. However, variable doesn't always need annotations, TypeScript is intelligent enough to "infer" from the values.
*/
const name: string = "Tharani"
const dob: number = 2001
const isWoke: boolean = true
const symbol: symbol = Symbol()
const netWorth: bigint = 9999994247238947238974239847239847239874n
const gf: null = null
const sadness: undefined = undefined

// The Any type
let anyVariable: any = "This can be anything"
// anyVariable() // No Compile time Error
// anyVariable.deep.property.access; // No Compile time Error

// Exercise 1
const add = (a: number, b: number) => {
    return a + b
}

const added: number = add(1, 2)

type addTest = Expect<Equal<typeof added, number>>;

// Exercise 2
const concatTwoStrings = (a: string, b: string) => {
    return [a, b].join("");
}

const concattedStr = concatTwoStrings("Hello", "World")

type concatTest = Expect<Equal<typeof concattedStr, string>>

// Exercise 3
const handleFormData = (e: any) => {
    e.preventDefault();

    // const data = new FormData(e.terget); // Vitest will throw an error, because of the typo and TS won't alert us because we are using the 'any' type.

    const data = new FormData(e.target); // Fix for the above error

    const value = Object.fromEntries(data.entries());

    return value;
};

it("Should handle a form submit", () => {
    const form = document.createElement("form");

    form.innerHTML = `
        <input name="name" value="Tharanidharan"></Exercise>
    `;

    form.onsubmit = (e) => {
        const value = handleFormData(e);

        expect(value).toEqual({ name: "Tharanidharan" });
    };

    form.requestSubmit();

    expect.assertions(1);
});


// Object Literal Types
// We can use '?' to make a property optional
const talkToAnimal = (animal: { name: string, type: string, age?: number }) => {
    console.log(`Hello ${name}`)
}

// Object Literal Types Exercises
// Exercise 1

const concatName = (user: { first: string, last: string }) => {
    return `${user.first} ${user.last}`
}

const concatNameOptional = (user: { first: string; last?: string }) => {
    if (!user.last) {
        return user.first;
    }

    return `${user.first} ${user.last}`;
};

it("Should return the full name", () => {
    const result = concatName({
        first: "Tharani",
        last: "Dharan"
    })

    type test = Expect<Equal<typeof result, string>>;
    expect(result).toEqual("Tharani Dharan")
})

it("Should return the first name if last name not available", () => {
    const result = concatNameOptional({
        first: "Tharani"
    })

    type test = Expect<Equal<typeof result, string>>;
    expect(result).toEqual("Tharani")
})



//Type Aliases
const pet: Animal = {
    name: "Churros",
    type: "dog"
}

// Typing Function parameter using the 'Animal' type
const animalDescription = (animal: Animal) => {

}

const desc = animalDescription(pet);

// Type Aliases can be object, but can also be basic types
type Id = string | number;

// Type Aliases Exercises
// Exercise 1
type Rectangle = {
    width: number;
    height: number;
}
const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: Rectangle ) => {
    return 2 * (rectangle.width + rectangle.height);
};

it("Should return the area of the rectangle", () => {
    const result = getRectangleArea({
        width: 10,
        height: 20
    })

    type test = Expect<Equal<typeof result, number>>

    expect(result).toEqual(200)
})

it("Should return the perimeter of the rectangle", () => {
    const result = getRectanglePerimeter({
        width: 10,
        height: 20
    })

    type result = Expect<Equal<typeof result, number>>

    expect(result).toEqual(60)
})

// Typing Arrays
let albums: string[] = [
    "Rubber Soul",
    "Revolver",
]

let albums2: Array<string> = [
    "Rubber Soul",
    "Revolver",
]

type Album = {
    artist: string;
    title: string;
    year: number;
}
// We can use Type Aliases too
const albumObjects: Album[] = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1965,
    },
]


// Tuples
let album: [string, number] = ["The Rubber Soul", 1965]

let albumWithPlayCount: [Album, number] = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1965
    },
    10000
]

// Named Tuples
type myTuple = [album: Album, playCount: number]

// Arrays and Tuples Exercises
// Exercise 1
type ShoppingCart = {
    userId: string,
    items: string[]
}

const processCart = (cart: ShoppingCart) => {
    // Do Something
}

processCart({
    userId: "user123",
    items: ["item1", "item2", "item3"],
})

// Exercise 2
type Ingredient = {
    name: string;
    quantity: string;
}
type Recipe = {
    title: string;
    ingredients: Ingredient[];
    instructions: string;
}

const processRecipe = (recipe: Recipe) => {
    // Do Something
}

processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "..."
})

// Exercise 3
const setRange = (range: [number, number]) => {
    const x = range[0]
    const y = range[1]
    
    type tests = [
        Expect<Equal<typeof x, number>>,
        Expect<Equal<typeof y,  number>>
    ]
}
// @ts-expect-error too few arguments
setRange([0])
// @ts-expect-error too few arguments
setRange([0, 10, 20])

setRange([0, 10])

// Exercise 4 - Optional Members of Tuples
const goToLocation = (coordinates: [latitude: number, longitude: number, elevation?: number]) => {
    const latitude = coordinates[0]
    const longitude = coordinates[1]
    const elevation = coordinates[2]

    type tests = [
        Expect<Equal<typeof latitude, number>>,
        Expect<Equal<typeof longitude, number>>,
        Expect<Equal<typeof elevation, number | undefined>>,
    ]
}

const formats = new Set<string>()
formats.add("digital")
// formats.add(123) // This will error, cos the value is not a string

// We can't do this because not all functions can take type arguments
// const audioElement = document.getElementById<HTMLAudioElement>("player")


// This works, because document.querySelector can receive type arguments
const audioEle = document.querySelector<HTMLAudioElement>("#player")

// Exercises for type arguments in functions

// Exercise 1: Passing Types to Map
type User = { name: string; age: number }
const userMap = new Map<number, User>();
userMap.set(1, { name: "Max", age: 30 })
userMap.set(1, { name: "Tharani", age: 24 })

// @ts-expect-error
userMap.set("3", { name: "Anna", age: 29 })

// @ts-expect-error
userMap.set(3, "123")

// Exercise 2: JSON.parse() can't receive Type Arguments
it("Should check the parseData type", () => {
    const parsedData: {
        name: string;
        age: number;
    } = JSON.parse('{"name": "Alice", "age": 30}')
    
    type test = Expect<
        Equal<
            typeof parsedData,
            {
                name: string;
                age: number;
            }
        >
    >;
})

// Annotating rest parameters
function getAlbumFormats(album: Album, ...formats: string[]) {
    return `${album.title} is available in the following formats: ${formats.join(", ",)}`;
}
getAlbumFormats(
    { artist: "Radiohead", title: "OK Computer", year: 1997 },
    "CD",
    "LP",
    "Cassette",
);


// Annotating functions
type Mapper = (item: string) => number

const mapOverItems = (items: string[], mapperFn: Mapper) => {
    return items.map(mapperFn)
}

// Void type
const consoleLog = (value: string): void => {
    console.log(value)
}