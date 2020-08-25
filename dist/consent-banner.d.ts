interface ITheme {
    "close-button-color": string;
    "secondary-button-disabled-opacity": string;
    "secondary-button-hover-shadow": string;
    "primary-button-disabled-opacity": string;
    "primary-button-hover-border": string;
    "primary-button-disabled-border": string;
    "primary-button-hover-shadow": string;
    "banner-background-color": string;
    "dialog-background-color": string;
    "primary-button-color": string;
    "text-color": string;
    "secondary-button-color": string;
    "secondary-button-disabled-color": string;
    "secondary-button-border": string;
    "background-color-between-page-and-dialog"?: string;
    "dialog-border-color"?: string;
    "hyperlink-font-color"?: string;
    "secondary-button-hover-color"?: string;
    "secondary-button-hover-border"?: string;
    "secondary-button-disabled-border"?: string;
    "secondary-button-focus-border-color"?: string;
    "secondary-button-text-color"?: string;
    "secondary-button-disabled-text-color"?: string;
    "primary-button-hover-color"?: string;
    "primary-button-disabled-color"?: string;
    "primary-button-border"?: string;
    "primary-button-focus-border-color"?: string;
    "primary-button-text-color"?: string;
    "primary-button-disabled-text-color"?: string;
    "radio-button-border-color"?: string;
    "radio-button-checked-background-color"?: string;
    "radio-button-hover-border-color"?: string;
    "radio-button-hover-background-color"?: string;
    "radio-button-disabled-color"?: string;
    "radio-button-disabled-border-color"?: string;
}
declare interface IThemes {
    [key: string]: ITheme | undefined;
    light?: ITheme;
    dark?: ITheme;
    "high-contrast"?: ITheme;
}
declare interface ITextResources {
    bannerMessageHtml?: string;
    acceptAllLabel?: string;
    moreInfoLabel?: string;
    preferencesDialogCloseLabel?: string;
    preferencesDialogTitle?: string;
    preferencesDialogDescHtml?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    saveLabel?: string;
    resetLabel?: string;
}
declare interface IOptions {
    textResources?: ITextResources;
    themes?: IThemes;
    initialTheme?: string
}
declare interface ICookieCategory {
    id: string;
    name: string;
    descHtml: string;
    isUnswitchable?: boolean;
}
declare interface ICookieCategoriesPreferences {
    [key: string]: boolean | undefined;
}

declare class PreferencesControl { }

export declare class ConsentControl {
    private containerElement;
    culture: string;
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void;
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    themes: IThemes;
    preferencesCtrl: PreferencesControl | null;
    private direction;
    defaultCookieCategories: ICookieCategory[];
    defaultTextResources: ITextResources;
    constructor(containerElementOrId: string | HTMLElement, culture: string, onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void, cookieCategories?: ICookieCategory[], options?: IOptions);
    /**
     * Set the text resources for the banner to display the text in each area
     *
     * @param {ITextResources} textResources the text want to be displayed
     */
    setTextResources(textResources: ITextResources): void;
    /**
     * Use the passed theme to set the theme property
     *
     * @param {string} name the theme property that we want to set
     * @param {ITheme} theme the passed theme that we want to display
     */
    createTheme(name: string, theme: ITheme): void;
    /**
     * Apply the theme and change banner and preferences dialog's color
     *
     * @param {string} themeName theme that will be applied
     */
    applyTheme(themeName: string): void;
    /**
     * Insert all necessary HTML code and shows the banner.
     * Until this method is called there should be no HTML elements of the Consent Control anywhere in the DOM
     *
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    showBanner(cookieCategoriesPreferences: ICookieCategoriesPreferences): void;
    /**
     * Hides the banner and the Preferences Dialog.
     * Removes all HTML elements of the Consent Control from the DOM
     */
    hideBanner(): void;
    /**
     * Shows Preferences Dialog. Leaves banner state unchanged
     *
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    showPreferences(cookieCategoriesPreferences: ICookieCategoriesPreferences): void;
    /**
     * Hides Preferences Dialog.
     * Removes all HTML elements of the Preferences Dialog from the DOM. Leaves banner state unchanged
     */
    hidePreferences(): void;
    /**
     * The method is used to initialize the preferences dialog.
     *
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    private initPreferencesCtrl;
    /**
     * Function that will be called when "Accept all" button is clicked
     *
     * @param {ICookieCategoriesPreferences} cookieCategoriesPreferences object that indicates cookie categories preferences
     */
    private onAcceptAllClicked;
    /**
     * Function that is used to set preferencesCtrl property to null
     */
    private onPreferencesClosed;
    /**
     * Set the container that will be used for the banner
     *
     * @param {string | HTMLElement} containerElementOrId here the banner will be inserted
     */
    setContainerElement(containerElementOrId: string | HTMLElement): void;
    /**
     * Return the container that is used for the banner
     */
    getContainerElement(): HTMLElement | null;
    /**
     * Set the direction by passing the parameter or by checking the culture property
     *
     * @param {string} dir direction for the web, ltr or rtl
     */
    setDirection(dir?: string): void;
    /**
     * Return the direction
     */
    getDirection(): string;
}
