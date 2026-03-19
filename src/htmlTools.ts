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
     * All browsers that enforce Trusted Types support createRange/createContextualFragment,
     * so no innerHTML fallback is needed.
     * 
     * In test environments (jsdom) where createRange may not exist, a setup file
     * should polyfill document.createRange before tests run.
     * 
     * @param element target element to set content on
     * @param html HTML string to parse and insert (site-owner provided, may contain <a> tags)
     */
    public static setHtmlContent(element: HTMLElement, html: string | undefined): void {
        if (!html) {
            element.textContent = "";
            return;
        }

        let range = document.createRange();
        let fragment = range.createContextualFragment(html);
        element.appendChild(fragment);
    }
}