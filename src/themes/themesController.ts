import * as styles from '../styles.scss';
import { ITheme } from '../interfaces/Options';

export class ThemesController {
    /**
     * Use the passed theme to set the theme property
     * 
     * @param {ITheme} destTheme the theme property that we want to set
     * @param {ITheme} srcTheme the passed theme that we want to display
     */
    public static createTheme(destTheme: ITheme, srcTheme: ITheme): void {

        // determined by "dialog-background-color"
        if (!srcTheme["background-color-between-page-and-dialog"]) {
            let provided: string = srcTheme["dialog-background-color"];
            this.setMissingColorFromAnotherProperty("background-color-between-page-and-dialog", provided, 0.6, destTheme);
        }
        if (!srcTheme["primary-button-text-color"]) {
            destTheme["primary-button-text-color"] = srcTheme["dialog-background-color"];
        }
        if (!srcTheme["primary-button-disabled-text-color"]) {
            destTheme["primary-button-disabled-text-color"] = srcTheme["dialog-background-color"];
        }

        // determined by "primary-button-color"
        if (!srcTheme["dialog-border-color"]) {
            destTheme["dialog-border-color"] = srcTheme["primary-button-color"];
        }
        if (!srcTheme["hyperlink-font-color"]) {
            destTheme["hyperlink-font-color"] = srcTheme["primary-button-color"];
        }
        if (!srcTheme["primary-button-hover-color"]) {
            destTheme["primary-button-hover-color"] = srcTheme["primary-button-color"];
        }
        if (!srcTheme["primary-button-disabled-color"]) {
            destTheme["primary-button-disabled-color"] = srcTheme["primary-button-color"];
        }
        if (!srcTheme["primary-button-border"]) {
            destTheme["primary-button-border"] = "1px solid " + srcTheme["primary-button-color"];
        }
        if (!srcTheme["primary-button-focus-border-color"]) {
            destTheme["primary-button-focus-border-color"] = srcTheme["primary-button-color"];
        }
        if (!srcTheme["radio-button-hover-border-color"]) {
            destTheme["radio-button-hover-border-color"] = srcTheme["primary-button-color"];
        }

        // determined by "text-color"
        if (!srcTheme["secondary-button-text-color"]) {
            destTheme["secondary-button-text-color"] = srcTheme["text-color"];
        }
        if (!srcTheme["secondary-button-disabled-text-color"]) {
            destTheme["secondary-button-disabled-text-color"] = srcTheme["text-color"];
        }
        if (!srcTheme["radio-button-border-color"]) {
            destTheme["radio-button-border-color"] = srcTheme["text-color"];
        }
        if (!srcTheme["radio-button-checked-background-color"]) {
            destTheme["radio-button-checked-background-color"] = srcTheme["text-color"];
        }
        if (!srcTheme["radio-button-hover-background-color"]) {
            let provided: string = srcTheme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-hover-background-color", provided, 0.8, destTheme);
        }
        if (!srcTheme["radio-button-disabled-color"]) {
            let provided: string = srcTheme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-disabled-color", provided, 0.2, destTheme);
        }
        if (!srcTheme["radio-button-disabled-border-color"]) {
            let provided: string = srcTheme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-disabled-border-color", provided, 0.2, destTheme);
        }

        // determined by "secondary-button-color"
        if (!srcTheme["secondary-button-hover-color"]) {
            destTheme["secondary-button-hover-color"] = srcTheme["secondary-button-color"];
        }

        // determined by "secondary-button-disabled-color"
        if (!srcTheme["secondary-button-disabled-border"]) {
            destTheme["secondary-button-disabled-border"] = "1px solid " + srcTheme["secondary-button-disabled-color"];
        }
        
        // determined by "secondary-button-border"
        if (!srcTheme["secondary-button-hover-border"]) {
            destTheme["secondary-button-hover-border"] = srcTheme["secondary-button-border"];
        }
        if (!srcTheme["secondary-button-focus-border-color"]) {
            let secondaryBtnBorderElement: string[] = srcTheme["secondary-button-border"].split(" ");
            destTheme["secondary-button-focus-border-color"] = secondaryBtnBorderElement[secondaryBtnBorderElement.length - 1];
        }

    }

    /**
     * Create theme elements for applying the theme
     */
    public static createThemeStyle(): void {
        let themesStyles = document.createElement('style');
        themesStyles.type = 'text/css';
        themesStyles.id = 'ms-consent-banner-theme-styles';

        document.head.appendChild(themesStyles);
    }

    /**
     * 
     * Apply the theme and change banner and preferences dialog's color
     * 
     * @param {ITheme} theme theme that will be applied
     */
    public static applyTheme(theme: ITheme): void {
        let newStyles = '';

        let newBannerStyle = `.${ styles.bannerBody } {
            background-color: ${ theme["banner-background-color"] } !important;
        }`;
        newStyles += newBannerStyle;
        
        let newTextColorStyle = `.${ styles.textColorTheme } {
            color: ${ theme["text-color"] } !important;
        }`;
        newStyles += newTextColorStyle;

        let newHyperLinkStyle = `.${ styles.hyperLinkTheme } a {
            color: ${ theme["hyperlink-font-color"] } !important;
        }`;
        newStyles += newHyperLinkStyle;
        
        newStyles += this.buildDialogStyle(theme);
        newStyles += this.buildPrimaryBtnStyle(theme);
        newStyles += this.buildSecondaryBtnStyle(theme);
        newStyles += this.buildRadioBtnStyle(theme);

        document.getElementById('ms-consent-banner-theme-styles')!.innerHTML = newStyles;
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
    private static setMissingColorFromAnotherProperty(missing: keyof ITheme,
                                               provider: string,
                                               transparencyFactor: number,
                                               currentTheme: ITheme): void {

        // provider: #ffffff; missing: rgba(255, 255, 255, transparencyFactor)
        if (provider.startsWith("#")) {
            let hexColor = parseInt(provider.substring(1), 16);
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
            
            let newTransparency = parseFloat(transparency.trim()) * transparencyFactor;
            let missingColor = provider.substring(0, rgbIdx + 1) + newTransparency.toFixed(2) + ")";
            currentTheme[missing] = missingColor;
        }
    }

    /**
     * Apply the theme to dialog
     * 
     * @param {ITheme} theme theme that will be applied to dialog
     */
    private static buildDialogStyle(theme: ITheme): string {
        let newStyles = '';

        // overwrite cookieModal styles (background between page and dialog)
        let newCookieModalStyle = `.${ styles.cookieModal } {
            background-color: ${ theme["background-color-between-page-and-dialog"] } !important;
        }`;
        newStyles += newCookieModalStyle;

        // overwrite preferences dialog styles
        let newDialogStyle = `.${ styles.modalContainer } {
            background-color: ${ theme["dialog-background-color"] } !important;
            border: 1px solid ${ theme["dialog-border-color"] } !important;
        }`;
        newStyles += newDialogStyle;

        // overwrite close button styles
        let newCloseIconStyle = `.${ styles.closeModalIcon } {
            color: ${ theme["close-button-color"] } !important;
            background-color: ${ theme["dialog-background-color"] } !important;
        }`;
        newStyles += newCloseIconStyle;

        return newStyles;
    }

    /**
     * Apply the theme to secondary button
     * 
     * @param {ITheme} theme theme that will be applied to secondary button
     */
    private static buildSecondaryBtnStyle(theme: ITheme): string {
        let newStyles = '';

        let newSecondaryBtnStyle = `.${ styles.secondaryButtonTheme } {
            border: ${ theme["secondary-button-border"] } !important;
            background-color: ${ theme["secondary-button-color"] } !important;
            color: ${ theme["secondary-button-text-color"] } !important;
        }`;
        newStyles += newSecondaryBtnStyle;

        let newSecondaryBtnHoverStyle = `.${ styles.secondaryButtonTheme }:hover {
            color: ${ theme["secondary-button-text-color"] } !important;
            background-color: ${ theme["secondary-button-hover-color"] } !important;
            box-shadow: ${ theme["secondary-button-hover-shadow"] } !important;
            border: ${ theme["secondary-button-hover-border"] } !important;
        }`;
        newStyles += newSecondaryBtnHoverStyle;

        let newSecondaryBtnFocusStyle = `.${ styles.secondaryButtonTheme }:focus {
            background-color: ${ theme["secondary-button-hover-color"] } !important;
            box-shadow: ${ theme["secondary-button-hover-shadow"] } !important;
            border: 2px solid ${ theme["secondary-button-focus-border-color"] } !important;
        }`;
        newStyles += newSecondaryBtnFocusStyle;

        let newSecondaryBtnDisabledStyle = `.${ styles.secondaryButtonTheme }:disabled {
            opacity: ${ theme["secondary-button-disabled-opacity"] } !important;
            color: ${ theme["secondary-button-disabled-text-color"] } !important;
            background-color: ${ theme["secondary-button-disabled-color"] } !important;
            border: ${ theme["secondary-button-disabled-border"] } !important;
        }`;
        newStyles += newSecondaryBtnDisabledStyle;

        return newStyles;
    }

    /**
     * Apply the theme to primary button
     * 
     * @param {ITheme} theme theme that will be applied to primary button
     */
    private static buildPrimaryBtnStyle(theme: ITheme): string {
        let newStyles = '';

        let newPrimaryBtnStyle = `.${ styles.primaryButtonTheme } {
            border: ${ theme["primary-button-border"] } !important;
            background-color: ${ theme["primary-button-color"] } !important;
            color: ${ theme["primary-button-text-color"] } !important;
        }`;
        newStyles += newPrimaryBtnStyle;

        let newPrimaryBtnHoverStyle = `.${ styles.primaryButtonTheme }:hover {
            color: ${ theme["primary-button-text-color"] } !important;
            background-color: ${ theme["primary-button-hover-color"] } !important;
            box-shadow: ${ theme["primary-button-hover-shadow"] } !important;
            border: ${ theme["primary-button-hover-border"] } !important;
        }`;
        newStyles += newPrimaryBtnHoverStyle;

        let newPrimaryBtnFocusStyle = `.${ styles.primaryButtonTheme }:focus {
            background-color: ${ theme["primary-button-hover-color"] } !important;
            box-shadow: ${ theme["primary-button-hover-shadow"] } !important;
            border: 2px solid ${ theme["primary-button-focus-border-color"] } !important;
        }`;
        newStyles += newPrimaryBtnFocusStyle;

        let newPrimaryBtnDisabledStyle = `.${ styles.primaryButtonTheme }:disabled {
            opacity: ${ theme["primary-button-disabled-opacity"] } !important;
            color: ${ theme["primary-button-disabled-text-color"] } !important;
            background-color: ${ theme["primary-button-disabled-color"] } !important;
            border: ${ theme["primary-button-disabled-border"] } !important;
        }`;
        newStyles += newPrimaryBtnDisabledStyle;

        return newStyles;
    }

    /**
     * Apply the theme to radio button
     * 
     * @param {ITheme} theme theme that will be applied to radio button
     */
    private static buildRadioBtnStyle(theme: ITheme): string {
        let newStyles = '';

        let newRadioBtnStyle = `input[type="radio"].${ styles.cookieItemRadioBtn } + label::before {
            border: 1px solid ${ theme["radio-button-border-color"] } !important;
            background-color: ${ theme["dialog-background-color"] } !important;
        }`;
        newStyles += newRadioBtnStyle;

        let newRadioBtnFocusOutline = `.${ styles.cookieItemRadioBtnCtrlOutline } {
            outline: 2px solid ${ theme["radio-button-hover-background-color"] } !important;
        }`;
        newStyles += newRadioBtnFocusOutline;

        let newRadioBtnCheckedStyle = `input[type="radio"].${ styles.cookieItemRadioBtn }:checked + label::after {
            background-color: ${ theme["radio-button-checked-background-color"] } !important;
        }`;
        newStyles += newRadioBtnCheckedStyle;

        let newRadioBtnHoverStyle = `input[type="radio"].${ styles.cookieItemRadioBtn } + label:hover::before {
            border: 1px solid ${ theme["radio-button-hover-border-color"] } !important;
        }`;
        newStyles += newRadioBtnHoverStyle;

        let newRadioBtnHoverAfterStyle = `input[type="radio"].${ styles.cookieItemRadioBtn } + label:hover::after {
            background-color: ${ theme["radio-button-hover-background-color"] } !important;
        }`;
        newStyles += newRadioBtnHoverAfterStyle;
        
        let newRadioBtnFocusStyle = `input[type="radio"].${ styles.cookieItemRadioBtn } + label:focus::before {
            border: 1px solid ${ theme["radio-button-hover-border-color"] } !important;
        }`;
        newStyles += newRadioBtnFocusStyle;
        
        let newRadioBtnFocusAfterStyle = `input[type="radio"].${ styles.cookieItemRadioBtn } + label:focus::after {
            background-color: ${ theme["radio-button-checked-background-color"] } !important;
        }`;
        newStyles += newRadioBtnFocusAfterStyle;
        
        let newRadioBtnDisabledStyle = `input[type="radio"].${ styles.cookieItemRadioBtn }:disabled + label::before {
            border: 1px solid ${ theme["radio-button-disabled-border-color"] } !important;
            background-color: ${ theme["radio-button-disabled-color"] } !important;
        }`;
        newStyles += newRadioBtnDisabledStyle;

        return newStyles;
    }
}