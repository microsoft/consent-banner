import { ILink } from './Link';

/**
 * Base contract: a localized text block optionally containing inline hyperlinks.
 * Placeholders inside `message` ({0}, {1}, ...) are replaced by
 * the corresponding entries in `links` when rendered.
 */
export interface IRichText {
    message: string;
    links?: ILink[];
}

/**
 * Rich-text content rendered inside the consent banner body.
 */
export interface IBannerContent extends IRichText {}

/**
 * Rich-text content rendered inside the preferences dialog description.
 */
export interface IPreferencesDialogContent extends IRichText {}