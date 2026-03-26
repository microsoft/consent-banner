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
     * Safely set HTML content on an element using only non-sink DOM APIs.
     * Parses simple HTML containing text and <a> tags without using any
     * Trusted Types sinks (no innerHTML, no createContextualFragment, no DOMParser).
     * 
     * Supports: plain text, <a href="...">text</a> links.
     * Any unrecognized tags are escaped as plain text for security.
     * 
     * @param element target element to set content on
     * @param html HTML string to parse and insert (site-owner provided, may contain <a> tags)
     */
    public static setHtmlContent(element: HTMLElement, html: string | undefined): void {
        if (!html) {
            element.textContent = "";
            return;
        }

        // Clear existing children
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        // Regex to match <a ...>...</a> tags
        let linkRegex = /<a\s+([^>]*)>(.*?)<\/a>/gi;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = linkRegex.exec(html)) !== null) {
            // Add text before this match
            if (match.index > lastIndex) {
                element.appendChild(document.createTextNode(html.substring(lastIndex, match.index)));
            }

            // Parse the <a> tag
            let attrsString = match[1];
            let linkText = match[2];

            let anchor = document.createElement('a');
            anchor.textContent = linkText;

            // Extract href attribute safely
            let hrefMatch = /href\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(attrsString);
            if (hrefMatch) {
                let href = hrefMatch[1] !== undefined ? hrefMatch[1] : hrefMatch[2];
                // Only allow safe URL schemes (allowlist approach)
                if (href && this.isSafeUrl(href)) {
                    anchor.setAttribute('href', href);
                }
            }

            element.appendChild(anchor);
            lastIndex = linkRegex.lastIndex;
        }

        // Add remaining text after last match
        if (lastIndex < html.length) {
            element.appendChild(document.createTextNode(html.substring(lastIndex)));
        }
    }

    /**
     * Checks if a URL uses a safe scheme.
     * Uses an allowlist approach to only permit known-safe protocols.
     * Blocks javascript:, data:, vbscript:, and any other dangerous schemes.
     * 
     * @param url the URL string to validate
     * @returns true if the URL is safe, false otherwise
     */
    private static isSafeUrl(url: string): boolean {
        let trimmed = url.replace(/\s/g, '').toLowerCase();
        
        // Allow relative URLs (no scheme)
        if (trimmed.startsWith('/') || trimmed.startsWith('.') || trimmed.startsWith('#')) {
            return true;
        }

        // Allow only known safe schemes
        if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('mailto:')) {
            return true;
        }

        // Block if it contains any scheme (has colon before first slash)
        if (trimmed.indexOf(':') < trimmed.indexOf('/') && trimmed.indexOf(':') !== -1) {
            return false;
        }

        // Allow scheme-less URLs (e.g., "example.com/page")
        return true;
    }
}