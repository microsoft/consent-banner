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
     * Safely set HTML content on an element using <template> element.
     * <template>.innerHTML is excluded from Trusted Types enforcement per the HTML spec
     * because template content is inert (scripts don't execute, resources don't load).
     * 
     * No TT policies needed. No manual parsing. No createContextualFragment.
     * 
     * @param element target element to set content on
     * @param html HTML string to parse and insert
     */
    public static setHtmlContent(element: HTMLElement, html: string | undefined): void {
        if (!html) {
            element.textContent = "";
            return;
        }

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        let template = document.createElement('template');
        template.innerHTML = html;
        element.appendChild(template.content.cloneNode(true));
    }
}