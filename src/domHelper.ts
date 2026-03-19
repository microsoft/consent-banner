/**
 * Trusted Types-safe alternative to innerHTML for test setup.
 * Parses an HTML string into DOM nodes and appends them to the target element.
 * Clears existing children first.
 * 
 * @param element target element
 * @param html HTML string to parse and insert
 */
export function setElementHtml(element: HTMLElement, html: string): void {
    // Clear existing children
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let range = document.createRange();
    let fragment = range.createContextualFragment(html);
    element.appendChild(fragment);
}

/**
 * Trusted Types-safe alternative to innerHTML += for appending HTML to body or an element.
 * 
 * @param element target element
 * @param html HTML string to parse and append
 */
export function appendElementHtml(element: HTMLElement, html: string): void {
    let range = document.createRange();
    let fragment = range.createContextualFragment(html);
    element.appendChild(fragment);
}