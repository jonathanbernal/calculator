// Credit goes to https://www.geeksforgeeks.org/implementation-stack-javascript/ for the implementation details.
// I only rewrote this implementation using the factory pattern to test out my understanding of this stack implementation.

/**
 * A Stack is a LIFO implementation of a list data structure and can hold N items.
 * It supports the operations of push, pop, and peek.
 * 
 * @returns a stack initialized with zero items on it.
 */
export default function Stack() {
    let items = [];

    /**
     * Inspects the topmost item on the stack without removing it
     * @returns the topmost item on the stack
     */
    let peek = () => items.at( -1 );

    /**
     * Adds an item onto the stack
     * @param {Any} item the item to add to the top of the stack
     * @returns undefined
     */
    let push = ( item ) => items.push( item );

    /**
     * Removes the topmost item on the stack and returns it
     * @returns the item that was removed from the top of the stack
     */
    let pop = () => {
        if ( items.length === 0 ) return undefined;
        let lastItem = peek();
        items = items.filter( (item) => item !== items.at(-1) );
        return lastItem;
    }

    /**
     * Checks if the stack is empty
     * @returns whether the stack is empty or not
     */
    let isEmpty = () => items.length === 0;

    /**
     * Prints out the items on the stack. The rightmost item is the item on top of the stack.
     * @returns a string representation of the stack from bottom to top.
     */
    let printStack = () => items.length === 0 ? '' : items.reduce( (acc, item) => acc + ' ' + item );

    return {
        peek,
        push,
        pop,
        isEmpty,
        printStack,
    }
}