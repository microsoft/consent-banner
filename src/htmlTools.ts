export class HtmlTools {
    /**
     * Safely creates a text node.
     */
    public static createText(s: string | undefined): Text {
        return document.createTextNode(s ?? '');
    }

    /**
     * Creates a safe <a> element with only text content — no innerHTML used.
     */
    public static createLink(text: string, href: string, target: string = '_blank'): HTMLAnchorElement {
        const a = document.createElement('a');
        a.href = href;
        a.target = target;
        a.rel = 'noopener noreferrer'; // required whenever target="_blank"
        a.textContent = text;
        return a;
    }
}