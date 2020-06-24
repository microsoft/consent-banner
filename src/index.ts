import * as styles from './styles.scss';
import { PreferencesControl } from './preferencesControl';
import { HtmlTools } from './htmlTools';

import { RTL_LANGUAGE } from './language-list.const';
import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/TextResources';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class ConsentControl {
    private containerElementOrId: string;   // here the banner will be inserted
    culture: string;

    // callback function, called on preferences changes (via "Accept All", or "Save changes")
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void;
    
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;

    preferencesCtrl: PreferencesControl | null = null;
    private direction: string = 'ltr';

    // All categories should be replaced with the passed ones in the control
    defaultCookieCategories: ICookieCategory[] =
    [
        {
            id: "c0",
            name: "1. Essential cookies",
            descHtml: "We use this cookie, read more <a href='link'>here</a>.",
            isUnswitchable: true        // optional, prevents toggling the category. True only for categories like Essential cookies.
        },
        {
            id: "c1",
            name: "2. Performance & analytics",
            descHtml: "We use this cookie, read more <a href='link'>here</a>."
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
        bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
        acceptAllLabel: "Accept all",
        moreInfoLabel: "More info",
        preferencesDialogCloseLabel: "Close",
        preferencesDialogTitle: "Manage cookie preferences",
        preferencesDialogDescHtml: "Most Microsoft sites...",
        acceptLabel: "Accept",
        rejectLabel: "Reject",
        saveLabel: "Save changes",
        resetLabel: "Reset all"
    };

    constructor(containerElementOrId: string, 
                culture: string, 
                onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void, 
                cookieCategories?: ICookieCategory[], 
                textResources?: ITextResources) {
        
        this.containerElementOrId = containerElementOrId;
        this.culture = culture;
        this.onPreferencesChanged = onPreferencesChanged;

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
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    public showBanner(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        // Add <meta name="viewport" content="width=device-width, initial-scale=1.0">
        // for responsive web design
        if (!document.querySelector('meta[name="viewport"]')) {
            let meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }

        // Remove existing banner and preference dialog
        if (document.getElementsByClassName(styles.bannerBody)) {
            let length = document.getElementsByClassName(styles.bannerBody).length;
            for (let i = 0; i < length; i++) {
                this.hideBanner();
            }
        }

        let htmlTools = new HtmlTools();
        let insert = document.querySelector('#' + this.containerElementOrId);

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

        if (!this.preferencesCtrl) {
            this.preferencesCtrl = new PreferencesControl(this.cookieCategories, 
                                                          this.textResources, 
                                                          cookieCategoriesPreferences, 
                                                          this.containerElementOrId, 
                                                          this.direction, 
                                                          () => this.nullPreferences());
            
            this.preferencesCtrl.createPreferencesDialog();
            
            // Add event handler to "Save changes" button event
            this.preferencesCtrl.addSaveButtonEvent(() => this.onPreferencesChanged(cookieCategoriesPreferences));

            // Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
            let cookieInfo = document.getElementsByClassName(styles.bannerButton)[1];
            if (cookieInfo) {
                cookieInfo.addEventListener('click', () => {
                    this.showPreferences(cookieCategoriesPreferences);
                    (<PreferencesControl> this.preferencesCtrl).showPreferencesDialog();
                });
            }
        }

        let acceptAllBtn = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[0];
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', () => {
                for (let cookieCategory of this.cookieCategories) {
                    if (!cookieCategory.isUnswitchable) {
                        cookieCategoriesPreferences[cookieCategory.id] = true;
    
                        // Set cookieCategoriesPreferences in preferencesCtrl
                        if (this.preferencesCtrl) {
                            let cookiePreferences = this.preferencesCtrl.cookieCategoriesPreferences;
                            cookiePreferences[cookieCategory.id] = true;
                        }
                    }
                }
    
                this.onPreferencesChanged(cookieCategoriesPreferences);
            });
        }
    }

    /**
     * Hides the banner and the Preferences Dialog. 
     * Removes all HTML elements of the Consent Control from the DOM
     */
    public hideBanner(): void {
        let parent = document.querySelector('#' + this.containerElementOrId);
        if (parent) {
            let banner = document.getElementsByClassName(styles.bannerBody)[0];
            parent.removeChild(banner);

            this.hidePreferences();
        }
    }

    /**
     * Shows Preferences Dialog. Leaves banner state unchanged
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    public showPreferences(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        if (this.preferencesCtrl) {
            return;
        }
        this.preferencesCtrl = new PreferencesControl(this.cookieCategories, 
                                                      this.textResources, 
                                                      cookieCategoriesPreferences, 
                                                      this.containerElementOrId, 
                                                      this.direction, 
                                                      () => this.nullPreferences());

        this.preferencesCtrl.createPreferencesDialog();
        this.preferencesCtrl.showPreferencesDialog();

        // Add event handler to "Save changes" button event
        this.preferencesCtrl.addSaveButtonEvent(() => this.onPreferencesChanged(cookieCategoriesPreferences));
    }

    /**
     * Hides Preferences Dialog. 
     * Removes all HTML elements of the Preferences Dialog from the DOM. Leaves banner state unchanged
     */
    public hidePreferences(): void {
        if (!this.preferencesCtrl) {
            return;
        }

        this.preferencesCtrl.hidePreferencesDialog();
        this.preferencesCtrl = null;
    }

    private nullPreferences(): void {
        this.preferencesCtrl = null;
    }

    /**
     * Set the id of container that will be used for the banner
     * 
     * @param {string} containerElementOrId here the banner will be inserted
     */
    public setContainerElementOrId(containerElementOrId: string): void {
        this.containerElementOrId = containerElementOrId;
    }

    /**
     * Return the id of container that is used for the banner
     */
    public getContainerElementOrId(): string {
        return this.containerElementOrId;
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
