import * as styles from './styles.scss';
import { PreferencesControl } from './preferencesControl';
import { HtmlTools } from './htmlTools';

import { RTL_LANGUAGE } from './language-list.const';
import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/TextResources';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class ConsentControl {
    culture: string;
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;

    private direction: string = 'ltr';
    private containerElement: string = '';

    // All categories should be replaced with the passed ones in the control
    defaultCookieCategories: ICookieCategory[] =
    [
        {
            id: "c0",
            name: "1. Essential cookies",
            descHtml: "We use this cookie, read more <a href='link'>here<a>.",
            isUnswitchable: true        // optional, prevents toggling the category. True only for categories like Essential cookies.
        },
        {
            id: "c1",
            name: "2. Performance & analytics",
            descHtml: "We use this cookie, read more <a href='link'>here<a>."
        },
        {
            id: "c2",
            name: "3. Advertising/Marketing",
            descHtml: "Blah"
        },
        {
            id: "c3",
            name: "4. Targeting/personalization",
            descHtml: "Blah"
        }
    ];

    // only the passed text resources should be replaced in the control.
    // If any string is not passed the control should keep the default value
    defaultTextResources: ITextResources = {
        bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
        acceptAllLabel: "Accept all",
        rejectAllLabel: "Reject all",
        moreInfoLabel: "More info",
        preferencesDialogCloseLabel: "Close",
        preferencesDialogTitle: "Manage cookie preferences",
        preferencesDialogDescHtml: "Most Microsoft sites...",
        acceptLabel: "Accept",
        rejectLabel: "Reject",
        saveLabel: "Save changes",
        resetLabel: "Reset all"
    };

    constructor(culture: string, cookieCategories?: ICookieCategory[], textResources?: ITextResources) {
        this.culture = culture;

        if (cookieCategories) {
            this.cookieCategories = cookieCategories;
        }
        else {
            this.cookieCategories = this.defaultCookieCategories;
        }

        this.textResources = this.defaultTextResources;
        if (textResources) {
            this.setTextResources(textResources);
        }

        this.setDirection();
    }

    /**
     * callback function, called on preferences changes (via "Accept All", "Reject All", or "Save changes"), 
     * must pass cookieCategoriesPreferences
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences preferences for each cookie categories
     */
    public onPreferencesChanged(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        // TODO
    }

    /**
     * Set the text resources for the banner to display the text in each area
     * 
     * @param {ITextResources} textResources the text want to be displayed
     */
    public setTextResources(textResources: ITextResources): void {
        if (textResources.bannerMessageHtml) {
            this.textResources.bannerMessageHtml = textResources.bannerMessageHtml;
        }
        if (textResources.acceptAllLabel) {
            this.textResources.acceptAllLabel = textResources.acceptAllLabel;
        }
        if (textResources.rejectAllLabel) {
            this.textResources.rejectAllLabel = textResources.rejectAllLabel;
        }
        if (textResources.moreInfoLabel) {
            this.textResources.moreInfoLabel = textResources.moreInfoLabel;
        }
        if (textResources.preferencesDialogCloseLabel) {
            this.textResources.preferencesDialogCloseLabel = textResources.preferencesDialogCloseLabel;
        }
        if (textResources.preferencesDialogTitle) {
            this.textResources.preferencesDialogTitle = textResources.preferencesDialogTitle;
        }
        if (textResources.preferencesDialogDescHtml) {
            this.textResources.preferencesDialogDescHtml = textResources.preferencesDialogDescHtml;
        }
        if (textResources.acceptLabel) {
            this.textResources.acceptLabel = textResources.acceptLabel;
        }
        if (textResources.rejectLabel) {
            this.textResources.rejectLabel = textResources.rejectLabel;
        }
        if (textResources.saveLabel) {
            this.textResources.saveLabel = textResources.saveLabel;
        }
        if (textResources.resetLabel) {
            this.textResources.resetLabel = textResources.resetLabel;
        }
    }

    /**
     * Insert all necessary HTML code and shows the banner. 
     * Until this method is called there should be no HTML elements of the Consent Control anywhere in the DOM
     * 
     * @param {string} containerElementOrId here the banner will be inserted
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences see below
     */
    public showBanner(containerElementOrId: string, cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        // Add <meta name="viewport" content="width=device-width, initial-scale=1.0">
        // for responsive web design
        if (!document.querySelector('meta[name="viewport"]')) {
            let meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }

        this.setContainerElementId(containerElementOrId);
        
        let htmlTools = new HtmlTools();
        let insert = document.querySelector('#' + this.containerElement);

        let infoIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' viewBox='0 0 44 44' width='24px' height='24px' fill='none' stroke='currentColor'>
          <circle cx='22' cy='22' r='20' stroke-width='2'></circle>
          <line x1='22' x2='22' y1='18' y2='33' stroke-width='3'></line>
          <line x1='22' x2='22' y1='12' y2='15' stroke-width='3'></line>
        </svg>
        `;

        const bannerInnerHtml = `
        <div class="${ styles.bannerInform }">
            <span class="${ styles.infoIcon }">${ infoIcon }</span> <!--  used for icon  -->
            <p class="${ styles.bannerInformBody }">
                ${ this.textResources.bannerMessageHtml }
            </p>
        </div>

        <div class="${ styles.buttonGroup }">
            <button type="button" class="${ styles.bannerButton }">${ htmlTools.escapeHtml(this.textResources.acceptAllLabel) }</button>
            <button type="button" class="${ styles.bannerButton }">${ htmlTools.escapeHtml(this.textResources.rejectAllLabel) }</button>
            <button type="button" class="${ styles.bannerButton }">${ htmlTools.escapeHtml(this.textResources.moreInfoLabel) }</button>
        </div>
        `;

        const banner = document.createElement('div');
        banner.setAttribute('class', styles.bannerBody);
        banner.setAttribute('dir', this.direction);
        banner.setAttribute('role', 'alert');
        banner.innerHTML = bannerInnerHtml;

        if (insert) {
            insert.appendChild(banner);
        }

        let preferencesControl = new PreferencesControl(this.cookieCategories, 
                                                        this.textResources, 
                                                        cookieCategoriesPreferences, 
                                                        this.containerElement, 
                                                        true, 
                                                        this.direction);
    }

    /**
     * Hides the banner and the Preferences Dialog. 
     * Removes all HTML elements of the Consent Control from the DOM
     */
    public hideBanner(): void {
        let parent = document.querySelector('#' + this.containerElement);
        if (parent) {
            let banner = document.getElementsByClassName(styles.bannerBody)[0];
            let cookieModal = document.getElementsByClassName(styles.cookieModal)[0];

            parent.removeChild(banner);
            parent.removeChild(cookieModal);
        }
    }

    /**
     * Set the id of container that will be used for the banner
     * 
     * @param {string} containerElementOrId here the banner will be inserted
     */
    public setContainerElementId(containerElementOrId: string): void {
        this.containerElement = containerElementOrId;
    }

    /**
     * Set the direction by passing the parameter or by checking the culture property
     * 
     * @param {string} dir direction for the web, ltr or rtl
     */
    public setDirection(dir?: string): void {
        if (dir) {
            this.direction = dir;
        }
        else {
            let formatCulture: string = this.culture.toLowerCase();
            let cultureArray: string[] = formatCulture.split('-');
            let lang: string = cultureArray[0];
    
            // Check <html dir="rtl"> or <html dir="ltr">
            if (document.dir) {
                this.direction = document.dir;
            }
            // Check <body dir="rtl"> or <body dir="ltr">
            else if (document.body.dir) {
                this.direction = document.body.dir;
            }
            else {
                if (RTL_LANGUAGE.indexOf(lang) !== -1) {
                    this.direction = 'rtl';
                }
                // ks-Arab-IN is right to left (in language-list.const.ts)
                // ks-Deva-IN is left to right
                else if (RTL_LANGUAGE.indexOf(cultureArray[0] + '-' + cultureArray[1]) !== -1) {
                    this.direction = 'rtl';
                }
                else {
                    this.direction = 'ltr';
                }
            }
        }
    }

    /**
     * Return the direction
     */
    public getDirection(): string {
        return this.direction;
    }
}

// Add <meta name="viewport" content="width=device-width, initial-scale=1.0">
// for responsive web design
if (!document.querySelector('meta[name="viewport"]')) {
    let meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.getElementsByTagName('head')[0].appendChild(meta);
}

// Insert point for banner
let insert = document.querySelector('#app');

let infoIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' viewBox='0 0 44 44' width='24px' height='24px' fill='none' stroke='currentColor'>
  <circle cx='22' cy='22' r='20' stroke-width='2'></circle>
  <line x1='22' x2='22' y1='18' y2='33' stroke-width='3'></line>
  <line x1='22' x2='22' y1='12' y2='15' stroke-width='3'></line>
</svg>
`;

let dir = 'ltr';
if (document.dir) {
    dir = document.dir;
}
else if (document.body.dir) {
    dir = document.body.dir;
}

const banner = 
`
    <div class="${styles.bannerBody}" dir=${dir} role="alert">
        <div class="${styles.bannerInform}">
            <span class="${styles.infoIcon}" aria-label="Information message">${infoIcon}</span> <!--  used for icon  -->
            <p class="${styles.bannerInformBody}">
                We use optional cookies to provide a better experience, read more about them 
                <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank">here</a>.
            </p>
        </div>

        <div class="${styles.buttonGroup}">
            <button type="button" class="${styles.bannerButton}">Accept all</button>
            <button type="button" class="${styles.bannerButton}">Reject all</button>
            <button type="button" class="${styles.bannerButton}">More info</button>
        </div>
    </div>

    <!-- The Modal -->
    <div class="${styles.cookieModal}" dir=${dir}>
        <div role="presentation" tabindex="-1"></div>
        <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${styles.modalContainer}" tabindex="-1">
            <button aria-label="Close dialog" class="${styles.closeModalIcon}" tabindex="0">&#x2715;</button>
            <div role="document" class="${styles.modalBody}">
                <div>
                    <h2 class="${styles.modalTitle}">Manage cookie preferences</h2>
                </div>
                
                <form class="${styles.modalContent}">
                    <p class="${styles.cookieStatement}">
                        Most Microsoft sites use cookies, small text files placed on your device which web servers in 
                        the domain that placed the cookie can retrieve later. We use cookies to store your preferences 
                        and settings, help with sign-in, provide targeted ads, and analyze site operations. 
                        For more information, see the 
                        <a href="https://privacy.microsoft.com/en-us/privacystatement#maincookiessimilartechnologiesmodule" target="_blank">
                            Cookies and similar technologies section of the Privacy Statement
                        </a>.
                    </p>

                    <ol class="${styles.cookieOrderedList}">
                        <li class="${styles.cookieListItem}">
                            <h3 class="${styles.cookieListItemTitle}">1. Essential cookies</h3>
                            <p class="${styles.cookieListItemDescription}">
                                We use essential cookies to do things.
                            </p>
                        </li>
                
                        <li class="${styles.cookieListItem}">
                            <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Performance and analytics cookies setting">
                                <h3 class="${styles.cookieListItemTitle}">2. Performance & analytics</h3>
                                <p class="${styles.cookieListItemDescription}">
                                    We use performance & analytics cookies to track how things are working. Message text. This 
                                    is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                                </p>
                                <div class="${styles.cookieItemRadioBtnGroup}">
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="accept">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                    </label>
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="reject">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li class="${styles.cookieListItem}">
                            <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Advertising/Marketing cookies setting">
                                <h3 class="${styles.cookieListItemTitle}">3. Advertising/Marketing</h3>
                                <p class="${styles.cookieListItemDescription}">
                                    We use advertising/marketing cookies to provide our partners with data. Message text. This 
                                    is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                                </p>
                                <div class="${styles.cookieItemRadioBtnGroup}">
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="accept">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                    </label>
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="reject">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li class="${styles.cookieListItem}">
                            <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Targeting/personalization cookies setting">
                                <h3 class="${styles.cookieListItemTitle}">4. Targeting/personalization</h3>
                                <p class="${styles.cookieListItemDescription}">
                                    We use targeting/personalization cookies to enhance the quality of ads you see. Message text. 
                                    This is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                                </p>
                                <div class="${styles.cookieItemRadioBtnGroup}">
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="accept">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                    </label>
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="reject">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                    </label>
                                </div>
                            </div>
                        </li>

                        <li class="${styles.cookieListItem}">
                            <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Social media cookies setting">
                                <h3 class="${styles.cookieListItemTitle}">5. Social media</h3>
                                <p class="${styles.cookieListItemDescription}">
                                    We use social media cookies to improve the experience you see. Message text. This is where 
                                    the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                                </p>
                                <div class="${styles.cookieItemRadioBtnGroup}">
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="socialMediaCookies" value="accept">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                    </label>
                                    <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                        <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="socialMediaCookies" value="reject">
                                        <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ol>
                </form>
                
                <div class="${styles.modalButtonGroup}">
                    <button type="button" aria-label="Save changes" class="${styles.modalButtonSave}" disabled>Save changes</button>
                    <button type="button" aria-label="Reset all" class="${styles.modalButtonReset}" disabled>Reset all</button>
                </div>
            </div>
        </div>
    </div>
`;

if (insert) {
    insert.innerHTML = banner;
}

let cookieInfo = document.getElementsByClassName(`${styles.bannerButton}`)[2];
let modal: HTMLElement = <HTMLElement> document.getElementsByClassName(`${styles.cookieModal}`)[0];
let closeModalIcon = document.getElementsByClassName(`${styles.closeModalIcon}`)[0];

let cookieItemRadioBtn: Element[] = [].slice.call(document.getElementsByClassName(`${ styles.cookieItemRadioBtn }`));
let modalButtonSave: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(`${ styles.modalButtonSave }`)[0];
let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(`${ styles.modalButtonReset }`)[0];

function popup() {
    if (modal) {
        modal.style.display = 'block';
    }
}

function close() {
    if (modal) {
        modal.style.display = 'none';
    }
}

function enableModalButtons() {
    if (modalButtonSave) {
        modalButtonSave.disabled = false;
    }

    if (modalButtonReset) {
        modalButtonReset.disabled = false;
    }
}

if (cookieInfo) {
    cookieInfo.addEventListener('click', popup);

    // Add this line in case some browsers in mobile do not like click event 
    // cookieInfo.addEventListener('touchstart', popup);
}

if (closeModalIcon) {
    closeModalIcon.addEventListener('click', close);
}

if (cookieItemRadioBtn && cookieItemRadioBtn.length) {
    for (let radio of cookieItemRadioBtn) {
        radio.addEventListener('click', enableModalButtons);
    }
}
