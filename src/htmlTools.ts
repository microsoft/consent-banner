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
        a.rel = 'noopener noreferrer';
        a.textContent = text;
        return a;
    }

    public static appendTextWithLinks(
        container: HTMLElement,
        text: string,
        links?: Array<{ text: string; href: string }>
    ): void {
        const parts = text.split(/(\{\d+\})/);

        for (const part of parts) {
            const match = part.match(/^\{(\d+)\}$/);
            if (match) {
                const index = parseInt(match[1], 10);
                if (links && links[index]) {
                    container.appendChild(
                        HtmlTools.createLink(links[index].text, links[index].href)
                    );
                }
            }
            else if (part) {
                container.appendChild(HtmlTools.createText(part));
            }
        }
    }
}