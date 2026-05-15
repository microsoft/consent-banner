import { IRichText } from './RichText';

export interface ICookieCategory {
    id: string;
    name: string;
    description: IRichText;
    isUnswitchable?: boolean;
}
