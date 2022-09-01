import * as rawStyles from './styles.scss';
import * as injectStylesIntoStyleTag from 'style-loader/dist/runtime/injectStylesIntoStyleTag';

import { PreferencesControl } from './preferencesControl';
import { HtmlTools } from './htmlTools';
import { ThemesController } from './themes/themesController';

import { RTL_LANGUAGE } from './language-list.const';
import { DEFAULT_THEMES } from './themes/theme-styles';

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources, IOptions, IThemes, ITheme } from './interfaces/Options';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

const styles = rawStyles.locals;

export class ConsentControl {
    private containerElement: HTMLElement | null = null;   // here the banner will be inserted
    culture: string;

    // callback function, called on preferences changes (via "Accept All", or "Save changes")
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void;
    
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    themes: IThemes = {
        light: { ...DEFAULT_THEMES.lightTheme },
        dark: { ...DEFAULT_THEMES.darkTheme },
        "high-contrast": { ...DEFAULT_THEMES.highContrast }
    };

    preferencesCtrl: PreferencesControl | null = null;
    private direction: string = 'ltr';
    private isDirty: { changed: boolean } = { changed: false };

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
        rejectAllLabel: "Reject all",
        moreInfoLabel: "More info",
        preferencesDialogCloseLabel: "Close",
        preferencesDialogTitle: "Manage cookie preferences",
        preferencesDialogDescHtml: "Most Microsoft sites...",
        acceptLabel: "Accept",
        rejectLabel: "Reject",
        saveLabel: "Save changes",
        resetLabel: "Reset all",
        bannerCloseLabel: "Close banner"
    };

    constructor(containerElementOrId: string | HTMLElement, 
                culture: string, 
                onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void, 
                cookieCategories?: ICookieCategory[], 
                options?: IOptions) {
        
        this.setContainerElement(containerElementOrId);

        if (options?.stylesNonce) {
            injectStylesIntoStyleTag(rawStyles, {
                attributes: {
                    id: "ms-consent-banner-main-styles",
                    nonce: options.stylesNonce
                }
            });
        }
        else {
            injectStylesIntoStyleTag(rawStyles, {
                attributes: {
                    id: "ms-consent-banner-main-styles"
                }
            });
        }

        this.culture = culture;
        this.onPreferencesChanged = onPreferencesChanged;

        if (cookieCategories) {
            this.cookieCategories = cookieCategories;
        }
        else {
            this.cookieCategories = this.defaultCookieCategories;
        }

        this.textResources = this.defaultTextResources;
        if (options?.textResources) {
            this.setTextResources(options.textResources);
        }

        for (let themeName in options?.themes) {
            let typeThemeName = <keyof IThemes> themeName;

            if (options?.themes[typeThemeName]) {
                this.createTheme(themeName, <ITheme> options?.themes[typeThemeName]);
            }
        }

        ThemesController.createThemeStyle(options?.stylesNonce);
        if (options?.initialTheme) {
            this.applyTheme(options.initialTheme);
        }

        this.setDirection();
    }

    /**
     * Set the text resources for the banner to display the text in each area
     * 
     * @param {ITextResources} textResources the text want to be displayed
     */
    public setTextResources(textResources: ITextResources): void {
        for (let key of Object.keys(this.textResources)) {
            let typeKey = <keyof ITextResources> key;

            if (textResources[typeKey]) {
                this.textResources[typeKey] = textResources[typeKey];
            }
        }
    }

    /**
     * Use the passed theme to set the theme property
     * 
     * @param {string} name the theme property that we want to set
     * @param {ITheme} theme the passed theme that we want to display
     */
    public createTheme(name: string, theme: ITheme): void {
        let typeName = <keyof IThemes> name;
        this.themes[typeName] = theme;

        // Determine optional styles
        ThemesController.createTheme(<ITheme> this.themes[typeName], theme);
    }

    /**
     * Apply the theme and change banner and preferences dialog's color 
     * 
     * @param {string} themeName theme that will be applied
     */
    public applyTheme(themeName: string): void {
        if (!this.themes[themeName]) {
            throw new Error("Theme not found error");
        }

        let theme: ITheme = <ITheme> this.themes[themeName];
        ThemesController.applyTheme(theme);
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
            document.head.appendChild(meta);
        }

        // Remove existing banner and preference dialog
        this.hideBanner();

        let infoIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12.7139 2 13.4187 2.07494 14.1059 2.22228C14.6865 2.34679 14.899 3.06471 14.4797 3.48521C14.0148 3.95137 13.75 4.57868 13.75 5.25C13.75 6.42043 14.5612 7.42718 15.6858 7.68625C16.0559 7.7715 16.3039 8.1199 16.2632 8.49747C16.2544 8.5787 16.25 8.66307 16.25 8.75C16.25 10.1307 17.3693 11.25 18.75 11.25C19.4766 11.25 20.1513 10.9393 20.6235 10.4053C21.0526 9.92011 21.8536 10.1704 21.9301 10.8137C21.9766 11.2048 22 11.6009 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.4367 20.5 20.0795 17.1008 20.4661 12.7646L20.485 12.5085L20.492 12.351L20.2985 12.4391C19.9679 12.5779 19.6173 12.6725 19.2549 12.7183L18.9811 12.7434L18.75 12.75C16.7439 12.75 15.0828 11.2732 14.7943 9.34752L14.7694 9.14675L14.755 8.96L14.6101 8.89964C13.3259 8.32272 12.4199 7.09599 12.2715 5.66565L12.2549 5.44962L12.25 5.25C12.25 4.80313 12.3238 4.36764 12.4636 3.95777L12.5553 3.71503L12.64 3.525L12.3637 3.50763L12 3.5ZM15 16C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16ZM8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15ZM12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11ZM7 8C7.55228 8 8 8.44772 8 9C8 9.55228 7.55228 10 7 10C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8Z" fill="#212121" />
      </svg>
        `;

        const bannerInnerHtml = `
        <div class="${ styles.bannerClose }">
        <button aria-label="${ HtmlTools.escapeHtml(this.textResources.bannerCloseLabel) }" class="${ styles.closeBannerIcon }" tabindex="">&#x2715;</button>
        </div>
        <div class="${ styles.bannerInform }">
            <span class="${ styles.infoIcon } ${ styles.textColorTheme }">${ infoIcon }</span> <!--  used for icon  -->
            <p class="${ styles.bannerInformBody } ${ styles.hyperLinkTheme } ${ styles.textColorTheme }">
                ${ this.textResources.bannerMessageHtml }
            </p>
        </div>

        <div class="${ styles.buttonGroup }">
            <button type="button" class="${ styles.bannerButton } ${ styles.secondaryButtonTheme }">${ HtmlTools.escapeHtml(this.textResources.acceptAllLabel) }</button>
            <button type="button" class="${ styles.bannerButton } ${ styles.secondaryButtonTheme }">${ HtmlTools.escapeHtml(this.textResources.rejectAllLabel) }</button>
            <button type="button" class="${ styles.bannerButton } ${ styles.secondaryButtonTheme }">${ HtmlTools.escapeHtml(this.textResources.moreInfoLabel) }</button>
        </div>
        `;

        const banner = document.createElement('div');
        banner.setAttribute('id','wcpConsentBannerCtrl');
        banner.setAttribute('class', styles.bannerBody);
        banner.setAttribute('dir', this.direction);
        banner.setAttribute('role', 'alert');
        banner.innerHTML = bannerInnerHtml;

        this.containerElement?.appendChild(banner);

        let cookieInfo = document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo?.addEventListener('click', () => this.showPreferences(cookieCategoriesPreferences));

        let acceptAllBtn = document.getElementsByClassName(styles.bannerButton)[0];
        acceptAllBtn?.addEventListener('click', () => this.onAcceptAllClicked(cookieCategoriesPreferences));

        let rejectAllBtn = document.getElementsByClassName(styles.bannerButton)[1];
        rejectAllBtn?.addEventListener('click', () => this.onRejectAllClicked(cookieCategoriesPreferences));

        let bannerCloseBtn = document.getElementsByClassName(styles.closeBannerIcon)[0];
        bannerCloseBtn?.addEventListener('click', () => this.onBannerCloseClicked());
    }

    /**
     * Hides the banner and the Preferences Dialog. 
     * Removes all HTML elements of the Consent Control from the DOM
     */
    public hideBanner(): void {
        if (document.getElementsByClassName(styles.bannerBody)) {
            let bannerArray = [].slice.call(document.getElementsByClassName(styles.bannerBody));
            for (let singleBanner of bannerArray) {
                this.containerElement?.removeChild(singleBanner);
            }
            this.hidePreferences();
        }
    }

    /**
     * Shows Preferences Dialog. Leaves banner state unchanged
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    public showPreferences(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        if (!this.preferencesCtrl) {
            this.initPreferencesCtrl(cookieCategoriesPreferences);
        }

        this.preferencesCtrl?.onPreferencesDialogShowing();
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
    }

    /**
     * The method is used to initialize the preferences dialog.
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    private initPreferencesCtrl(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        
        this.preferencesCtrl = new PreferencesControl(this.cookieCategories, 
                                                      this.textResources, 
                                                      cookieCategoriesPreferences, 
                                                      <HTMLElement> this.containerElement, 
                                                      this.direction, 
                                                      this.isDirty, 
                                                      () => this.onPreferencesClosed());
        
        this.preferencesCtrl.createPreferencesDialog();

        // Add event handler to "Save changes" button event
        this.preferencesCtrl.addSaveButtonEvent(() => this.onPreferencesChanged(cookieCategoriesPreferences));
    }

    /**
     * Function that will be called when "Accept all" button is clicked
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    private onAcceptAllClicked(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        for (let cookieCategory of this.cookieCategories) {
            if (!cookieCategory.isUnswitchable) {
                cookieCategoriesPreferences[cookieCategory.id] = true;
            }
        }

        this.onPreferencesChanged(cookieCategoriesPreferences);
    }

     /**
     * Function that will be called when "Reject all" button is clicked
     * 
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
      private onRejectAllClicked(cookieCategoriesPreferences: ICookieCategoriesPreferences): void {
        for (let cookieCategory of this.cookieCategories) {
            if (!cookieCategory.isUnswitchable) {
                cookieCategoriesPreferences[cookieCategory.id] = false;
            }
        }

        this.onPreferencesChanged(cookieCategoriesPreferences);
    }

    /**
     * Function that is used to set preferencesCtrl property to null
     */
    private onPreferencesClosed(): void {
        this.preferencesCtrl = null;
    }

    private onBannerCloseClicked(): void {
        this.hideBanner();
    }

    /**
     * Set the container that will be used for the banner
     * 
     * @param {string | HTMLElement} containerElementOrId here the banner will be inserted
     */
    public setContainerElement(containerElementOrId: string | HTMLElement): void {
        if (containerElementOrId instanceof Element) {
            this.containerElement = containerElementOrId;
        }
        else if (containerElementOrId && containerElementOrId.length > 0) {   // containerElementOrId: string
            this.containerElement = document.querySelector('#' + containerElementOrId);
        }
        else {
            this.containerElement = null;
        }

        if (!this.containerElement) {
            throw new Error("Container not found error");
        }
    }

    /**
     * Return the container that is used for the banner
     */
    public getContainerElement(): HTMLElement | null {
        return this.containerElement;
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
