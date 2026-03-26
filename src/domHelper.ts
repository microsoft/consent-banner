/**
 * Trusted Types-safe alternative to innerHTML for test setup.
 * Uses <template>.innerHTML which is excluded from TT enforcement.
 * 
 * @param element target element
 * @param html HTML string to parse and insert
 */
export function setElementHtml(element: HTMLElement, html: string): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let template = document.createElement('template');
    template.innerHTML = html;
    element.appendChild(template.content.cloneNode(true));
}

/**
 * Trusted Types-safe alternative to innerHTML += for appending HTML.
 * 
 * @param element target element
 * @param html HTML string to parse and append
 */
export function appendElementHtml(element: HTMLElement, html: string): void {
    let template = document.createElement('template');
    template.innerHTML = html;
    element.appendChild(template.content.cloneNode(true));
}