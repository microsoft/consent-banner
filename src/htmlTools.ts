export class HtmlTools {
    public escapeHtml(s: string | undefined): string {
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
}