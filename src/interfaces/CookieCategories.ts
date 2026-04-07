export interface ICookieCategory {
    id: string;
    name: string;
    desc: string;
    descLink?: { text: string; href: string };
    isUnswitchable?: boolean;       // optional, prevents toggling the category. True only for categories like Essential cookies.
}
