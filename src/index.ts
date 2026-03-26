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
        resetLabel: "Reset all"
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

        // Build banner using DOM APIs to avoid innerHTML (Trusted Types safe)
        const banner = document.createElement('div');
        banner.setAttribute('id', 'wcpConsentBannerCtrl');
        banner.setAttribute('class', styles.bannerBody);
        banner.setAttribute('dir', this.direction);
        banner.setAttribute('role', 'alert');

        // Banner inform section
        let bannerInform = document.createElement('div');
        bannerInform.setAttribute('class', styles.bannerInform);

        let iconSpan = document.createElement('span');
        iconSpan.setAttribute('class', `${ styles.infoIcon } ${ styles.textColorTheme }`);

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('x', '0px');
        svg.setAttribute('y', '0px');
        svg.setAttribute('viewBox', '0 0 44 44');
        svg.setAttribute('width', '24px');
        svg.setAttribute('height', '24px');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');

        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '22');
        circle.setAttribute('cy', '22');
        circle.setAttribute('r', '20');
        circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);

        let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '22');
        line1.setAttribute('x2', '22');
        line1.setAttribute('y1', '18');
        line1.setAttribute('y2', '33');
        line1.setAttribute('stroke-width', '3');
        svg.appendChild(line1);

        let line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '22');
        line2.setAttribute('x2', '22');
        line2.setAttribute('y1', '12');
        line2.setAttribute('y2', '15');
        line2.setAttribute('stroke-width', '3');
        svg.appendChild(line2);

        iconSpan.appendChild(svg);
        bannerInform.appendChild(iconSpan);

        let bannerInformBody = document.createElement('p');
        bannerInformBody.setAttribute('class', `${ styles.bannerInformBody } ${ styles.hyperLinkTheme } ${ styles.textColorTheme }`);
        HtmlTools.setHtmlContent(bannerInformBody, this.textResources.bannerMessageHtml);
        bannerInform.appendChild(bannerInformBody);

        banner.appendChild(bannerInform);

        // Button group
        let buttonGroup = document.createElement('div');
        buttonGroup.setAttribute('class', styles.buttonGroup);

        let acceptAllBtn = document.createElement('button');
        acceptAllBtn.setAttribute('type', 'button');
        acceptAllBtn.setAttribute('class', `${ styles.bannerButton } ${ styles.secondaryButtonTheme }`);
        acceptAllBtn.textContent = this.textResources.acceptAllLabel || '';

        let rejectAllBtn = document.createElement('button');
        rejectAllBtn.setAttribute('type', 'button');
        rejectAllBtn.setAttribute('class', `${ styles.bannerButton } ${ styles.secondaryButtonTheme }`);
        rejectAllBtn.textContent = this.textResources.rejectAllLabel || '';

        let moreInfoBtn = document.createElement('button');
        moreInfoBtn.setAttribute('type', 'button');
        moreInfoBtn.setAttribute('class', `${ styles.bannerButton } ${ styles.secondaryButtonTheme }`);
        moreInfoBtn.textContent = this.textResources.moreInfoLabel || '';

        buttonGroup.appendChild(acceptAllBtn);
        buttonGroup.appendChild(rejectAllBtn);
        buttonGroup.appendChild(moreInfoBtn);
        banner.appendChild(buttonGroup);

        this.containerElement?.appendChild(banner);

        moreInfoBtn.addEventListener('click', () => this.showPreferences(cookieCategoriesPreferences));
        acceptAllBtn.addEventListener('click', () => this.onAcceptAllClicked(cookieCategoriesPreferences));
        rejectAllBtn.addEventListener('click', () => this.onRejectAllClicked(cookieCategoriesPreferences));
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
