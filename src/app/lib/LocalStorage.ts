import { Todo } from "../page";

/**
 * Saves data to localStorage under key. 
 * In this case, it will save an array of objects as defined in Todo interface
 * @param key The key in localStorage the data will be stored under
 * @param data The data to store in key
 */
export function saveToLocalStorage(key: string, data: Todo[]): void {
    try {
        const jsonString = JSON.stringify(data);
        localStorage.setItem(key, jsonString);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

/**
 * Retrieves the array of objects from localStorage as an array of objects Todo[]
 * Returns an empty array and throws an error if not found.
 * @param key The key to read from localStorage
 */
export function getLocalStorage(key: string): Todo[] {
    try {
        const jsonString = localStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString) as Todo[];
        }
    } catch (error) {
        console.warn("localStorage is empty, likely intentional");
    }
    return [];
}