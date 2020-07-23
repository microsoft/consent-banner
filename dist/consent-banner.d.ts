declare interface ICookieCategory {
    id: string;
    name: string;
    descHtml: string;
    isUnswitchable?: boolean;
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
    preferencesCtrl: PreferencesControl | null;
    private direction;
    defaultCookieCategories: ICookieCategory[];
    defaultTextResources: ITextResources;
    constructor(containerElementOrId: string | HTMLElement, culture: string, onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void, cookieCategories?: ICookieCategory[], textResources?: ITextResources);
    /**
     * Set the text resources for the banner to display the text in each area
     *
     * @param {ITextResources} textResources the text want to be displayed
     */
    setTextResources(textResources: ITextResources): void;
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
