// TypeScript gives much better AutoComplete
const acceptsObj = (obj: { foo: string; bar: number; baz: boolean }) => {};

acceptsObj({
    foo: 'abc',
    bar: 1,
    baz: true
});

const element = document.getElementById('')

/**
 * Logs the values of an object to the console.
 *
 * @param obj - The object to log.
 *
 * @example
 * ```ts
 * logValues({ a: 1, b: 2 });
 * // Output:
 * // a: 1
 * // b: 2
 * ```
*/

const logValues = (obj: any) => {
    for (const key in obj) {
        console.log(`${key}: ${obj[key]}`);
    }
};

type User = {
    id: string
}
const users:User[] = []
const filterUsersById = (userIdToFilterBy: string) => {
    return users.filter((user) => user.id === userIdToFilterBy);
};


/* 
Highlight a variable, line, or entire code block then hit Command + . to open the Quick Fix menu. There will be several options for modifying the code, depending on where your cursor is when you open the menu.
*/
const func = () => {
    // Refactor this to be its own function
    const randomPercentage = `${(Math.random() * 100).toFixed(2)}%`;

    console.log(randomPercentage);
};
