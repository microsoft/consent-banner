export class HtmlTools {
    public static escapeHtml(s: string | undefined): string {
        if (s) {
            return s.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
        }
        else {
            return "";
        }
    }

    /**
     * Safely set HTML content on an element without triggering Trusted Types violations.
     * Uses Range.createContextualFragment which is not a Trusted Types sink.
     * Falls back to a detached element for environments that lack
     * createRange/createContextualFragment support (e.g., jsdom in unit tests).
     * 
     * @param element target element to set content on
     * @param html HTML string to parse and insert (site-owner provided, may contain <a> tags)
     */
    public static setHtmlContent(element: HTMLElement, html: string | undefined): void {
        if (!html) {
            element.textContent = "";
            return;
        }

        if (typeof document.createRange === 'function') {
            let range = document.createRange();
            if (typeof range.createContextualFragment === 'function') {
                let fragment = range.createContextualFragment(html);
                element.appendChild(fragment);
                return;
            }
        }

        // Fallback for environments without createRange/createContextualFragment (e.g., jsdom)
        let temp = document.createElement('span');
        temp.innerHTML = html;
        while (temp.firstChild) {
            element.appendChild(temp.firstChild);
        }
    }
}