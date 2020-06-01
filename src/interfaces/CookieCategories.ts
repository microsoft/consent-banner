export interface ICookieCategory {
    id: string;
    name: string;
    descHtml: string;
    isUnswitchable?: boolean;       // optional, prevents toggling the category. True only for categories like Essential cookies.
}
