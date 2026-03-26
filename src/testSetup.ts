/**
 * Polyfill document.createRange for jsdom environments that lack it.
 * This enables HtmlTools.setHtmlContent to work in tests without
 * an innerHTML fallback in production code.
 */
if (typeof document.createRange !== 'function') {
    (document as any).createRange = function () {
        return {
            createContextualFragment(html: string): DocumentFragment {
                let template = document.createElement('template');
                template.innerHTML = html;
                return template.content;
            },
            setStart() {},
            setEnd() {},
            commonAncestorContainer: document.documentElement
        };
    };
}