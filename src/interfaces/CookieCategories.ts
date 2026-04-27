import { ILink } from './Link';

export interface ICookieCategory {
    id: string;
    name: string;
    desc: string;
    descLink?: ILink;
    isUnswitchable?: boolean;
}
