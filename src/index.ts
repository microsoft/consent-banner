import * as styles from './styles.scss';
import { PreferencesControl } from './preferencesControl';
import { HtmlTools } from './htmlTools';

import { RTL_LANGUAGE } from './language-list.const';
import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources, IOptions, IThemes, ITheme } from './interfaces/Options';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class ConsentControl {
    private containerElement: HTMLElement | null = null;   // here the banner will be inserted
    culture: string;

    // callback function, called on preferences changes (via "Accept All", or "Save changes")
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void;
    
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    themes: IThemes = { };

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

    defaultLightTheme: ITheme = {
        "banner-background-color": "#F2F2F2",
        "cookieModal-background-color": "rgba(255, 255, 255, 0.6)",
        "preferences-background-color": "#ffffff",
        "border-color": "#0067B8",
        "close-button-color": "#666666",
        "hyperlink-font-color": "#0067B8",
        "text-color": "#000000",
        "secondary-button-color": "#EBEBEB",
        "secondary-button-hover-color": "#DBDBDB",
        "secondary-button-disabled-opacity": "1",
        "secondary-button-disabled-color": "rgba(0, 0, 0, 0.2)",
        "secondary-button-border": "none",
        "secondary-button-hover-border": "none",
        "secondary-button-disabled-border": "none",
        "secondary-button-focus-border-color": "#000000",
        "secondary-button-text-color": "#000000",
        "secondary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
        "secondary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
        "primary-button-color": "#0067B8",
        "primary-button-hover-color": "#0067B8",
        "primary-button-disabled-opacity": "1",
        "primary-button-disabled-color": "rgba(0, 120, 215, 0.2)",
        "primary-button-border": "none",
        "primary-button-hover-border": "none",
        "primary-button-disabled-border": "none",
        "primary-button-focus-border-color": "#000000",
        "primary-button-text-color": "#FFFFFF",
        "primary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
        "primary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
        "radio-button-border-color": "#000000",
        "radio-button-background-color": "#000000",
        "radio-button-hover-border-color": "#0067B8",
        "radio-button-hover-background-color": "rgba(0, 0, 0, 0.8)",
        "radio-button-disabled-color": "rgba(0, 0, 0, 0.2)",
        "radio-button-disabled-border-color": "rgba(0, 0, 0, 0.2)"
    };

    // Use the color in https://docs.microsoft.com
    defaultDarkTheme: ITheme = {
        "banner-background-color": "#242424",                  // --body-background-dark
        "cookieModal-background-color": "rgba(23, 23, 23, 0.6)",    // --body-background 0.6
        "preferences-background-color": "#171717",                    // --body-background
        "border-color": "#4db2ff",                     // --primary-base
        "close-button-color": "#e3e3e3",               // --secondary-dark
        "hyperlink-font-color": "#4db2ff",             // --primary-base
        "text-color": "#e3e3e3",                       // --text
        "secondary-button-color": "#171717",           // --body-background
        "secondary-button-hover-color": "#2e2e2e",     // --hover-invert
        "secondary-button-disabled-opacity": "0.5",     // opacity: 0.5
        "secondary-button-disabled-color": "#2e2e2e",    // --body-background-medium
        "secondary-button-border": "1px solid #c7c7c7",              // --text-subtle
        "secondary-button-hover-border": "1px solid #c7c7c7",      // --hover-base
        "secondary-button-disabled-border": "1px solid #242424",      // --body-background-dark
        "secondary-button-focus-border-color": "#c7c7c7",              // --text-subtle
        "secondary-button-text-color": "#e3e3e3",                       // --text
        "secondary-button-disabled-text-color": "#e3e3e3",            // --text
        "secondary-button-hover-shadow": "none",
        "primary-button-color": "#4db2ff",             // --primary-base
        "primary-button-hover-color": "#0091ff",            // --primary-hover
        "primary-button-disabled-opacity": "0.5",          // opacity: 0.5
        "primary-button-disabled-color": "#4db2ff",                // --primary-base
        "primary-button-border": "1px solid #4db2ff",        // --primary-base
        "primary-button-hover-border": "1px solid rgba(0, 0, 0, 0)",      // --border-yellow-high-contrast
        "primary-button-disabled-border": "1px solid rgba(255, 255, 255, 0)",      // --border-white-high-contrast
        "primary-button-focus-border-color": "#4db2ff",             // --primary-base
        "primary-button-text-color": "black",                   // --primary-invert
        "primary-button-disabled-text-color": "black",   // --primary-invert
        "primary-button-hover-shadow": "none",
        "radio-button-border-color": "#e3e3e3",                       // --text
        "radio-button-background-color": "#e3e3e3",                       // --text
        "radio-button-hover-border-color": "#4db2ff",             // --primary-base
        "radio-button-hover-background-color": "rgba(227, 227, 227, 0.8)",
        "radio-button-disabled-color": "rgba(227, 227, 227, 0.2)",
        "radio-button-disabled-border-color": "rgba(227, 227, 227, 0.2)"
    }

    // Use the color in https://docs.microsoft.com
    defaultHighContrast: ITheme = {
        "banner-background-color": "black",                    // --body-background-dark
        "cookieModal-background-color": "rgba(0, 0, 0, 0.6)",   // --body-background 0.6
        "preferences-background-color": "black",                      // --body-background
        "border-color": "yellow",                      // --primary-base
        "close-button-color": "#e3e3e3",              // --secondary-dark
        "hyperlink-font-color": "yellow",              // --primary-base
        "text-color": "white",                         // --text
        "secondary-button-color": "black",            // --body-background
        "secondary-button-hover-color": "black",     // --hover-invert
        "secondary-button-disabled-opacity": "0.5",      // opacity: 0.5
        "secondary-button-disabled-color": "black",      // --body-background-medium
        "secondary-button-border": "1px solid white",           // --text-subtle
        "secondary-button-hover-border": "1px solid yellow",    // --hover-base
        "secondary-button-disabled-border": "1px solid black",         // --body-background-dark
        "secondary-button-focus-border-color": "white",           // --text-subtle
        "secondary-button-text-color": "white",                 // --text
        "secondary-button-disabled-text-color": "white",       // --text
        "secondary-button-hover-shadow": "none",
        "primary-button-color": "yellow",              // --primary-base
        "primary-button-hover-color": "#ffff33",           // --primary-hover
        "primary-button-disabled-opacity": "0.5",          // opacity: 0.5
        "primary-button-disabled-color": "yellow",           // --primary-base
        "primary-button-border": "1px solid yellow",    // --primary-base
        "primary-button-hover-border": "1px solid yellow",     // --border-yellow-high-contrast
        "primary-button-disabled-border": "1px solid white",       // --border-white-high-contrast
        "primary-button-focus-border-color": "yellow",                 // --primary-base
        "primary-button-text-color": "black",                   // --primary-invert
        "primary-button-disabled-text-color": "black",       // --primary-invert
        "primary-button-hover-shadow": "none",
        "radio-button-border-color": "white",                         // --text
        "radio-button-background-color": "white",                         // --text
        "radio-button-hover-border-color": "yellow",              // --primary-base
        "radio-button-hover-background-color": "rgba(255, 255, 255, 0.8)",
        "radio-button-disabled-color": "rgba(255, 255, 255, 0.2)",
        "radio-button-disabled-border-color": "rgba(255, 255, 255, 0.2)"
    }

    constructor(containerElementOrId: string | HTMLElement, 
                culture: string, 
                onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void, 
                cookieCategories?: ICookieCategory[], 
                options?: IOptions) {
        
        this.setContainerElement(containerElementOrId);

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

        this.setThemes(options?.themes);

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
     * Set themes in the banner and preferences dialog
     * If a theme is not included, the default one will be used
     * 
     * @param {IThemes} themes themes that will be used in the banner and preferences dialog
     */
    public setThemes(themes?: IThemes): void {
        this.themes.light = this.defaultLightTheme;
        if (themes?.light) {
            this.setCertainTheme(themes.light, this.themes.light);
        }

        this.themes.dark = this.defaultDarkTheme;
        if (themes?.dark) {
            this.setCertainTheme(themes.dark, this.themes.dark);
        }

        this.themes["high-contrast"] = this.defaultHighContrast;
        if (themes?.["high-contrast"]) {
            this.setCertainTheme(themes["high-contrast"], this.themes["high-contrast"]);
        }
    }

    /**
     * Use the passed theme to set the theme property
     * 
     * @param {ITheme} theme the passed theme that we want to display
     * @param {ITheme} currentTheme the theme property that we want to set
     */
    public setCertainTheme(theme: ITheme, currentTheme: ITheme): void {
        if (theme["close-button-color"]) {
            currentTheme["close-button-color"] = theme["close-button-color"];
        }
        if (theme["secondary-button-disabled-opacity"]) {
            currentTheme["secondary-button-disabled-opacity"] = theme["secondary-button-disabled-opacity"];
        }
        if (theme["secondary-button-hover-shadow"]) {
            currentTheme["secondary-button-hover-shadow"] = theme["secondary-button-hover-shadow"];
        }
        if (theme["primary-button-disabled-opacity"]) {
            currentTheme["primary-button-disabled-opacity"] = theme["primary-button-disabled-opacity"];
        }
        if (theme["primary-button-hover-border"]) {
            currentTheme["primary-button-hover-border"] = theme["primary-button-hover-border"];
        }
        if (theme["primary-button-disabled-border"]) {
            currentTheme["primary-button-disabled-border"] = theme["primary-button-disabled-border"];
        }
        if (theme["primary-button-hover-shadow"]) {
            currentTheme["primary-button-hover-shadow"] = theme["primary-button-hover-shadow"];
        }

        // Styles that can be determined by another one

        if (theme["banner-background-color"]) {
            currentTheme["banner-background-color"] = theme["banner-background-color"];

            if (!theme["preferences-background-color"]) {
                currentTheme["preferences-background-color"] = theme["banner-background-color"];
            }
        }

        if (theme["preferences-background-color"]) {
            currentTheme["preferences-background-color"] = theme["preferences-background-color"];

            if (!theme["cookieModal-background-color"]) {
                let provided: string = theme["preferences-background-color"];
                this.setMissingColorFromAnotherProperty("cookieModal-background-color", provided, 0.6, currentTheme);
            }
            else {
                currentTheme["cookieModal-background-color"] = theme["cookieModal-background-color"];
            }

            if (!theme["banner-background-color"]) {
                currentTheme["banner-background-color"] = theme["preferences-background-color"];
            }

            if (!theme["primary-button-text-color"]) {
                currentTheme["primary-button-text-color"] = theme["preferences-background-color"];
            }
            else {
                currentTheme["primary-button-text-color"] = theme["primary-button-text-color"];
            }

            if (!theme["primary-button-disabled-text-color"]) {
                currentTheme["primary-button-disabled-text-color"] = theme["preferences-background-color"];
            }
            else {
                currentTheme["primary-button-disabled-text-color"] = theme["primary-button-disabled-text-color"];
            }
        }

        if (theme["primary-button-color"]) {
            currentTheme["primary-button-color"] = theme["primary-button-color"];

            if (!theme["border-color"]) {
                currentTheme["border-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["border-color"] = theme["border-color"];
            }

            if (!theme["hyperlink-font-color"]) {
                currentTheme["hyperlink-font-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["hyperlink-font-color"] = theme["hyperlink-font-color"];
            }

            if (!theme["primary-button-hover-color"]) {
                currentTheme["primary-button-hover-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["primary-button-hover-color"] = theme["primary-button-hover-color"];
            }

            if (!theme["primary-button-disabled-color"]) {
                currentTheme["primary-button-disabled-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["primary-button-disabled-color"] = theme["primary-button-disabled-color"];
            }

            if (!theme["primary-button-border"]) {
                currentTheme["primary-button-border"] = "1px solid " + theme["primary-button-color"];
            }
            else {
                currentTheme["primary-button-border"] = theme["primary-button-border"];
            }

            if (!theme["primary-button-focus-border-color"]) {
                currentTheme["primary-button-focus-border-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["primary-button-focus-border-color"] = theme["primary-button-focus-border-color"];
            }

            if (!theme["radio-button-hover-border-color"]) {
                currentTheme["radio-button-hover-border-color"] = theme["primary-button-color"];
            }
            else {
                currentTheme["radio-button-hover-border-color"] = theme["radio-button-hover-border-color"];
            }
        }

        if (theme["text-color"]) {
            currentTheme["text-color"] = theme["text-color"];

            if (!theme["secondary-button-text-color"]) {
                currentTheme["secondary-button-text-color"] = theme["text-color"];
            }
            else {
                currentTheme["secondary-button-text-color"] = theme["secondary-button-text-color"];
            }

            if (!theme["secondary-button-disabled-text-color"]) {
                currentTheme["secondary-button-disabled-text-color"] = theme["text-color"];
            }
            else {
                currentTheme["secondary-button-disabled-text-color"] = theme["secondary-button-disabled-text-color"];
            }

            if (!theme["radio-button-border-color"]) {
                currentTheme["radio-button-border-color"] = theme["text-color"];
            }
            else {
                currentTheme["radio-button-border-color"] = theme["radio-button-border-color"];
            }

            if (!theme["radio-button-background-color"]) {
                currentTheme["radio-button-background-color"] = theme["text-color"];
            }
            else {
                currentTheme["radio-button-background-color"] = theme["radio-button-background-color"];
            }

            if (!theme["radio-button-hover-background-color"]) {
                let provided: string = theme["text-color"];
                this.setMissingColorFromAnotherProperty("radio-button-hover-background-color", provided, 0.8, currentTheme);
            }
            else {
                currentTheme["radio-button-hover-background-color"] = theme["radio-button-hover-background-color"];
            }

            if (!theme["radio-button-disabled-color"]) {
                let provided: string = theme["text-color"];
                this.setMissingColorFromAnotherProperty("radio-button-disabled-color", provided, 0.2, currentTheme);
            }
            else {
                currentTheme["radio-button-disabled-color"] = theme["radio-button-disabled-color"];
            }

            if (!theme["radio-button-disabled-border-color"]) {
                let provided: string = theme["text-color"];
                this.setMissingColorFromAnotherProperty("radio-button-disabled-border-color", provided, 0.2, currentTheme);
            }
            else {
                currentTheme["radio-button-disabled-border-color"] = theme["radio-button-disabled-border-color"];
            }
        }

        if (theme["secondary-button-color"]) {
            currentTheme["secondary-button-color"] = theme["secondary-button-color"];

            if (!theme["secondary-button-hover-color"]) {
                currentTheme["secondary-button-hover-color"] = theme["secondary-button-color"];
            }
            else {
                currentTheme["secondary-button-hover-color"] = theme["secondary-button-hover-color"];
            }
        }

        if (theme["secondary-button-disabled-color"]) {
            currentTheme["secondary-button-disabled-color"] = theme["secondary-button-disabled-color"];

            if (!theme["secondary-button-disabled-border"]) {
                currentTheme["secondary-button-disabled-border"] = "1px solid " + theme["secondary-button-disabled-color"];
            }
            else {
                currentTheme["secondary-button-disabled-border"] = theme["secondary-button-disabled-border"];
            }
        }

        if (theme["secondary-button-border"]) {
            currentTheme["secondary-button-border"] = theme["secondary-button-border"];

            if (!theme["secondary-button-hover-border"]) {
                currentTheme["secondary-button-hover-border"] = theme["secondary-button-border"];
            }
            else {
                currentTheme["secondary-button-hover-border"] = theme["secondary-button-hover-border"];
            }

            if (!theme["secondary-button-focus-border-color"]) {
                let secondaryBtnBorderElement: string[] = theme["secondary-button-border"].split(" ");
                currentTheme["secondary-button-focus-border-color"] = secondaryBtnBorderElement[secondaryBtnBorderElement.length - 1];
            }
            else {
                currentTheme["secondary-button-focus-border-color"] = theme["secondary-button-focus-border-color"];
            }
        }
    }

    /**
     * Set missing color from another provided color
     * 
     * e.g.: 
     * provider: #ffffff; missing: rgba(255, 255, 255, transparencyFactor)
     * provider: rgb(255, 255, 255); missing: rgba(255, 255, 255, transparencyFactor)
     * provider: rgb(255, 255, 255, 1); missing: rgba(255, 255, 255, transparencyFactor)
     * 
     * @param {keyof ITheme} missing missing property in the theme
     * @param {string} provider the provided property in the theme
     * @param {number} transparencyFactor the alpha channel that will be used in the missing property
     * @param {ITheme} currentTheme the target theme that will be set
     */
    private setMissingColorFromAnotherProperty(missing: keyof ITheme, 
                                               provider: string, 
                                               transparencyFactor: number,  
                                               currentTheme: ITheme): void {
        
        // provider: #ffffff; missing: rgba(255, 255, 255, transparencyFactor)
        if (provider.startsWith("#")) {
            let hexColor = parseInt(provider, 16);
            let r = (hexColor >> 16) & 255;
            let g = (hexColor >> 8) & 255;
            let b = hexColor & 255;

            currentTheme[missing] = "rgba(" + r + ", " + g + ", " + b + ", " + transparencyFactor + ")";
        }
        // provider: rgb(255, 255, 255); missing: rgba(255, 255, 255, transparencyFactor)
        else if (provider.startsWith("rgb(")) {
            let missingColor = "rgba" + provider.substring(3, provider.length - 1) + ", " + transparencyFactor + ")";
            currentTheme[missing] = missingColor;
        }
        // provider: rgb(255, 255, 255, 1); missing: rgba(255, 255, 255, transparencyFactor)
        else if (provider.startsWith("rgba")) {
            let rgbIdx = provider.lastIndexOf(",");
            let transparency = provider.substring(rgbIdx + 1, provider.length - 1);

            let newTransparency = parseInt(transparency) * transparencyFactor;
            let missingColor = provider.substring(0, rgbIdx + 1) + newTransparency + ")";
            currentTheme[missing] = missingColor;
        }
    }

    /**
     * 
     * Apply the theme and change banner and preferences dialog's color 
     * 
     * TODO
     * 
     * @param {string} themeName theme that will be applied
     */
    public applyTheme(themeName: string): void {
        ;
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
        this.hideBanner();

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
            <button type="button" class="${ styles.bannerButton }">${ HtmlTools.escapeHtml(this.textResources.acceptAllLabel) }</button>
            <button type="button" class="${ styles.bannerButton }">${ HtmlTools.escapeHtml(this.textResources.moreInfoLabel) }</button>
        </div>
        `;

        const banner = document.createElement('div');
        banner.setAttribute('id','wcpConsentBannerCtrl');
        banner.setAttribute('class', styles.bannerBody);
        banner.setAttribute('dir', this.direction);
        banner.setAttribute('role', 'alert');
        banner.innerHTML = bannerInnerHtml;

        this.containerElement?.appendChild(banner);

        if (!this.preferencesCtrl) {
            this.initPreferencesCtrl(cookieCategoriesPreferences);

            // Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
            let cookieInfo = document.getElementsByClassName(styles.bannerButton)[1];
            cookieInfo?.addEventListener('click', () => this.showPreferences(cookieCategoriesPreferences));
        }

        let acceptAllBtn = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[0];
        acceptAllBtn?.addEventListener('click', () => this.onAcceptAllClicked(cookieCategoriesPreferences));
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

        this.preferencesCtrl?.showPreferencesDialog();
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
