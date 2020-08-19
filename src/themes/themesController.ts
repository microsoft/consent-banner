import * as styles from '../styles.scss';
import { ITheme } from '../interfaces/Options';

export class ThemesController {
    /**
     * Use the passed theme to set the theme property
     * 
     * @param {ITheme} currentTheme the theme property that we want to set
     * @param {ITheme} theme the passed theme that we want to display
     */
    public static createTheme(currentTheme: ITheme, theme: ITheme): void {

        // determined by "dialog-background-color"
        if (!theme["background-color-between-page-and-dialog"]) {
            let provided: string = theme["dialog-background-color"];
            this.setMissingColorFromAnotherProperty("background-color-between-page-and-dialog", provided, 0.6, currentTheme);
        }
        if (!theme["primary-button-text-color"]) {
            currentTheme["primary-button-text-color"] = theme["dialog-background-color"];
        }
        if (!theme["primary-button-disabled-text-color"]) {
            currentTheme["primary-button-disabled-text-color"] = theme["dialog-background-color"];
        }

        // determined by "primary-button-color"
        if (!theme["dialog-border-color"]) {
            currentTheme["dialog-border-color"] = theme["primary-button-color"];
        }
        if (!theme["hyperlink-font-color"]) {
            currentTheme["hyperlink-font-color"] = theme["primary-button-color"];
        }
        if (!theme["primary-button-hover-color"]) {
            currentTheme["primary-button-hover-color"] = theme["primary-button-color"];
        }
        if (!theme["primary-button-disabled-color"]) {
            currentTheme["primary-button-disabled-color"] = theme["primary-button-color"];
        }
        if (!theme["primary-button-border"]) {
            currentTheme["primary-button-border"] = "1px solid " + theme["primary-button-color"];
        }
        if (!theme["primary-button-focus-border-color"]) {
            currentTheme["primary-button-focus-border-color"] = theme["primary-button-color"];
        }
        if (!theme["radio-button-hover-border-color"]) {
            currentTheme["radio-button-hover-border-color"] = theme["primary-button-color"];
        }

        // determined by "text-color"
        if (!theme["secondary-button-text-color"]) {
            currentTheme["secondary-button-text-color"] = theme["text-color"];
        }
        if (!theme["secondary-button-disabled-text-color"]) {
            currentTheme["secondary-button-disabled-text-color"] = theme["text-color"];
        }
        if (!theme["radio-button-border-color"]) {
            currentTheme["radio-button-border-color"] = theme["text-color"];
        }
        if (!theme["radio-button-checked-background-color"]) {
            currentTheme["radio-button-checked-background-color"] = theme["text-color"];
        }
        if (!theme["radio-button-hover-background-color"]) {
            let provided: string = theme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-hover-background-color", provided, 0.8, currentTheme);
        }
        if (!theme["radio-button-disabled-color"]) {
            let provided: string = theme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-disabled-color", provided, 0.2, currentTheme);
        }
        if (!theme["radio-button-disabled-border-color"]) {
            let provided: string = theme["text-color"];
            this.setMissingColorFromAnotherProperty("radio-button-disabled-border-color", provided, 0.2, currentTheme);
        }

        // determined by "secondary-button-color"
        if (!theme["secondary-button-hover-color"]) {
            currentTheme["secondary-button-hover-color"] = theme["secondary-button-color"];
        }

        // determined by "secondary-button-disabled-color"
        if (!theme["secondary-button-disabled-border"]) {
            currentTheme["secondary-button-disabled-border"] = "1px solid " + theme["secondary-button-disabled-color"];
        }
        
        // determined by "secondary-button-border"
        if (!theme["secondary-button-hover-border"]) {
            currentTheme["secondary-button-hover-border"] = theme["secondary-button-border"];
        }
        if (!theme["secondary-button-focus-border-color"]) {
            let secondaryBtnBorderElement: string[] = theme["secondary-button-border"].split(" ");
            currentTheme["secondary-button-focus-border-color"] = secondaryBtnBorderElement[secondaryBtnBorderElement.length - 1];
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
     * Create theme elements for applying the theme
     */
    public static createThemeStyle(): void {

        // Create banner styles
        let bannerStyle = document.createElement('style');
        bannerStyle.type = 'text/css';
        bannerStyle.id = 'bannerStyle';
        document.head.appendChild(bannerStyle);

        // Create text color styles
        let textColorStyle = document.createElement('style');
        textColorStyle.type = 'text/css';
        textColorStyle.id = 'textColorStyle';
        document.head.appendChild(textColorStyle);

        // Create hyper link styles
        let hyperLinkStyle = document.createElement('style');
        hyperLinkStyle.type = 'text/css';
        hyperLinkStyle.id = 'hyperLinkStyle';
        document.head.appendChild(hyperLinkStyle);

        this.createDialogStyle();
        this.createPrimaryBtnStyle();
        this.createSecondaryBtnStyle();
        this.createRadioBtnStyle();

    }

    /**
     * Create theme elements for the preferences dialog
     */
    private static createDialogStyle(): void {

        // Create cookieModal styles (background between page and dialog)
        let cookieModalStyle = document.createElement('style');
        cookieModalStyle.type = 'text/css';
        cookieModalStyle.id = 'cookieModalStyle';
        document.head.appendChild(cookieModalStyle);

        // Create preferences dialog styles
        let dialogStyle = document.createElement('style');
        dialogStyle.type = 'text/css';
        dialogStyle.id = 'dialogStyle';
        document.head.appendChild(dialogStyle);
        
        // Create close button styles
        let closeIconStyle = document.createElement('style');
        closeIconStyle.type = 'text/css';
        closeIconStyle.id = 'closeIconStyle';
        document.head.appendChild(closeIconStyle);

    }

    /**
     * Create theme elements for secondary button
     */
    private static createSecondaryBtnStyle(): void {
        let secondaryButtonStyle = document.createElement('style');
        secondaryButtonStyle.type = 'text/css';
        secondaryButtonStyle.id = 'secondaryButtonStyle';
        document.head.appendChild(secondaryButtonStyle);

        let secondaryButtonHoverStyle = document.createElement('style');
        secondaryButtonHoverStyle.type = 'text/css';
        secondaryButtonHoverStyle.id = 'secondaryButtonHoverStyle';
        document.head.appendChild(secondaryButtonHoverStyle);

        let secondaryButtonFocusStyle = document.createElement('style');
        secondaryButtonFocusStyle.type = 'text/css';
        secondaryButtonFocusStyle.id = 'secondaryButtonFocusStyle';
        document.head.appendChild(secondaryButtonFocusStyle);

        let secondaryButtonDisabledStyle = document.createElement('style');
        secondaryButtonDisabledStyle.type = 'text/css';
        secondaryButtonDisabledStyle.id = 'secondaryButtonDisabledStyle';
        document.head.appendChild(secondaryButtonDisabledStyle);
    }

    /**
     * Create theme elements for primary button
     */
    private static createPrimaryBtnStyle(): void {
        let primaryButtonStyle = document.createElement('style');
        primaryButtonStyle.type = 'text/css';
        primaryButtonStyle.id = 'primaryButtonStyle';
        document.head.appendChild(primaryButtonStyle);

        let primaryButtonHoverStyle = document.createElement('style');
        primaryButtonHoverStyle.type = 'text/css';
        primaryButtonHoverStyle.id = 'primaryButtonHoverStyle';
        document.head.appendChild(primaryButtonHoverStyle);

        let primaryButtonFocusStyle = document.createElement('style');
        primaryButtonFocusStyle.type = 'text/css';
        primaryButtonFocusStyle.id = 'primaryButtonFocusStyle';
        document.head.appendChild(primaryButtonFocusStyle);

        let primaryButtonDisabledStyle = document.createElement('style');
        primaryButtonDisabledStyle.type = 'text/css';
        primaryButtonDisabledStyle.id = 'primaryButtonDisabledStyle';
        document.head.appendChild(primaryButtonDisabledStyle);
    }

    /**
     * Create theme elements for radio button
     */
    private static createRadioBtnStyle(): void {
        let radioButtonStyle = document.createElement('style');
        radioButtonStyle.type = 'text/css';
        radioButtonStyle.id = 'radioButtonStyle';
        document.head.appendChild(radioButtonStyle);

        let radioButtonCheckedStyle = document.createElement('style');
        radioButtonCheckedStyle.type = 'text/css';
        radioButtonCheckedStyle.id = 'radioButtonCheckedStyle';
        document.head.appendChild(radioButtonCheckedStyle);

        let radioButtonHoverStyle = document.createElement('style');
        radioButtonHoverStyle.type = 'text/css';
        radioButtonHoverStyle.id = 'radioButtonHoverStyle';
        document.head.appendChild(radioButtonHoverStyle);

        let radioButtonHoverAfterStyle = document.createElement('style');
        radioButtonHoverAfterStyle.type = 'text/css';
        radioButtonHoverAfterStyle.id = 'radioButtonHoverAfterStyle';
        document.head.appendChild(radioButtonHoverAfterStyle);

        let radioButtonFocusStyle = document.createElement('style');
        radioButtonFocusStyle.type = 'text/css';
        radioButtonFocusStyle.id = 'radioButtonFocusStyle';
        document.head.appendChild(radioButtonFocusStyle);

        let radioButtonFocusAfterStyle = document.createElement('style');
        radioButtonFocusAfterStyle.type = 'text/css';
        radioButtonFocusAfterStyle.id = 'radioButtonFocusAfterStyle';
        document.head.appendChild(radioButtonFocusAfterStyle);

        let radioButtonDisabledStyle = document.createElement('style');
        radioButtonDisabledStyle.type = 'text/css';
        radioButtonDisabledStyle.id = 'radioButtonDisabledStyle';
        document.head.appendChild(radioButtonDisabledStyle);
    }

    /**
     * 
     * Apply the theme and change banner and preferences dialog's color 
     * 
     * @param {ITheme} theme theme that will be applied
     */
    public static applyTheme(theme: ITheme): void {
        
        // overwrite banner styles
        let bannerStyle = <HTMLElement> document.getElementById('bannerStyle');
        bannerStyle.innerHTML = `.${ styles.bannerBody } {
            background-color: ${ theme["banner-background-color"] } !important;
        }`;

        // overwrite text color styles
        let textColorStyle = <HTMLElement> document.getElementById('textColorStyle');
        textColorStyle.innerHTML = `.${ styles.textColorTheme } {
            color: ${ theme["text-color"] } !important;
        }`;

        // overwrite hyper link styles
        let hyperLinkStyle = <HTMLElement> document.getElementById('hyperLinkStyle');
        hyperLinkStyle.innerHTML = `.${ styles.hyperLinkTheme } a {
            color: ${ theme["hyperlink-font-color"] } !important;
        }`;

        this.setDialogStyle(theme);
        this.setPrimaryBtnStyle(theme);
        this.setSecondaryBtnStyle(theme);
        this.setRadioBtnStyle(theme);
    }

    /**
     * Apply the theme to dialog
     * 
     * @param {ITheme} theme theme that will be applied to dialog
     */
    private static setDialogStyle(theme: ITheme): void {

        // overwrite cookieModal styles (background between page and dialog)
        let cookieModalStyle = <HTMLElement> document.getElementById('cookieModalStyle');
        cookieModalStyle.innerHTML = `.${ styles.cookieModal } {
            background-color: ${ theme["background-color-between-page-and-dialog"] } !important;
        }`;

        // overwrite preferences dialog styles
        let dialogStyle = <HTMLElement> document.getElementById('dialogStyle');
        dialogStyle.innerHTML = `.${ styles.modalContainer } {
            background-color: ${ theme["dialog-background-color"] } !important;
            border: 1px solid ${ theme["dialog-border-color"] } !important;
        }`;
        
        // overwrite close button styles
        let closeIconStyle = <HTMLElement> document.getElementById('closeIconStyle');
        closeIconStyle.innerHTML = `.${ styles.closeModalIcon } {
            color: ${ theme["close-button-color"] } !important;
            background-color: ${ theme["dialog-background-color"] } !important;
        }`;

    }

    /**
     * Apply the theme to secondary button
     * 
     * @param {ITheme} theme theme that will be applied to secondary button
     */
    private static setSecondaryBtnStyle(theme: ITheme): void {
        let secondaryButtonStyle = <HTMLElement> document.getElementById('secondaryButtonStyle');
        secondaryButtonStyle.innerHTML = `.${ styles.secondaryButtonTheme } { 
            border: ${ theme["secondary-button-border"] } !important;
            background-color: ${ theme["secondary-button-color"] } !important;
            color: ${ theme["secondary-button-text-color"] } !important;
        }`;

        let secondaryButtonHoverStyle = <HTMLElement> document.getElementById('secondaryButtonHoverStyle');
        secondaryButtonHoverStyle.innerHTML = `.${ styles.secondaryButtonTheme }:hover {
            color: ${ theme["secondary-button-text-color"] } !important;
            background-color: ${ theme["secondary-button-hover-color"] } !important;
            box-shadow: ${ theme["secondary-button-hover-shadow"] } !important;
            border: ${ theme["secondary-button-hover-border"] } !important;
        }`;

        let secondaryButtonFocusStyle = <HTMLElement> document.getElementById('secondaryButtonFocusStyle');
        secondaryButtonFocusStyle.innerHTML = `.${ styles.secondaryButtonTheme }:focus {
            background-color: ${ theme["secondary-button-hover-color"] } !important;
            box-shadow: ${ theme["secondary-button-hover-shadow"] } !important;
            border: 2px solid ${ theme["secondary-button-focus-border-color"] } !important;
        }`;

        let secondaryButtonDisabledStyle = <HTMLElement> document.getElementById('secondaryButtonDisabledStyle');
        secondaryButtonDisabledStyle.innerHTML = `.${ styles.secondaryButtonTheme }:disabled {
            opacity: ${ theme["secondary-button-disabled-opacity"] } !important;
            color: ${ theme["secondary-button-disabled-text-color"] } !important;
            background-color: ${ theme["secondary-button-disabled-color"] } !important;
            border: ${ theme["secondary-button-disabled-border"] } !important;
        }`;
    }

    /**
     * Apply the theme to primary button
     * 
     * @param {ITheme} theme theme that will be applied to primary button
     */
    private static setPrimaryBtnStyle(theme: ITheme): void {
        let primaryButtonStyle = <HTMLElement> document.getElementById('primaryButtonStyle');
        primaryButtonStyle.innerHTML = `.${ styles.primaryButtonTheme } { 
            border: ${ theme["primary-button-border"] } !important;
            background-color: ${ theme["primary-button-color"] } !important;
            color: ${ theme["primary-button-text-color"] } !important;
        }`;

        let primaryButtonHoverStyle = <HTMLElement> document.getElementById('primaryButtonHoverStyle');
        primaryButtonHoverStyle.innerHTML = `.${ styles.primaryButtonTheme }:hover {
            color: ${ theme["primary-button-text-color"] } !important;
            background-color: ${ theme["primary-button-hover-color"] } !important;
            box-shadow: ${ theme["primary-button-hover-shadow"] } !important;
            border: ${ theme["primary-button-hover-border"] } !important;
        }`;

        let primaryButtonFocusStyle = <HTMLElement> document.getElementById('primaryButtonFocusStyle');
        primaryButtonFocusStyle.innerHTML = `.${ styles.primaryButtonTheme }:focus {
            background-color: ${ theme["primary-button-hover-color"] } !important;
            box-shadow: ${ theme["primary-button-hover-shadow"] } !important;
            border: 2px solid ${ theme["primary-button-focus-border-color"] } !important;
        }`;

        let primaryButtonDisabledStyle = <HTMLElement> document.getElementById('primaryButtonDisabledStyle');
        primaryButtonDisabledStyle.innerHTML = `.${ styles.primaryButtonTheme }:disabled {
            opacity: ${ theme["primary-button-disabled-opacity"] } !important;
            color: ${ theme["primary-button-disabled-text-color"] } !important;
            background-color: ${ theme["primary-button-disabled-color"] } !important;
            border: ${ theme["primary-button-disabled-border"] } !important;
        }`;
    }

    /**
     * Apply the theme to radio button
     * 
     * @param {ITheme} theme theme that will be applied to radio button
     */
    private static setRadioBtnStyle(theme: ITheme): void {
        let radioButtonStyle = <HTMLElement> document.getElementById('radioButtonStyle');
        radioButtonStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn } + span::before {
            border: 1px solid ${ theme["radio-button-border-color"] } !important;
            background-color: ${ theme["dialog-background-color"] } !important;
        }`;
        
        let radioButtonCheckedStyle = <HTMLElement> document.getElementById('radioButtonCheckedStyle');
        radioButtonCheckedStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn }:checked + span::after {
            background-color: ${ theme["radio-button-checked-background-color"] } !important;
        }`;
        
        let radioButtonHoverStyle = <HTMLElement> document.getElementById('radioButtonHoverStyle');
        radioButtonHoverStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn } + span:hover::before {
            border: 1px solid ${ theme["radio-button-hover-border-color"] } !important;
        }`;
        
        let radioButtonHoverAfterStyle = <HTMLElement> document.getElementById('radioButtonHoverAfterStyle');
        radioButtonHoverAfterStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn } + span:hover::after {
            background-color: ${ theme["radio-button-hover-background-color"] } !important;
        }`;
        
        let radioButtonFocusStyle = <HTMLElement> document.getElementById('radioButtonFocusStyle');
        radioButtonFocusStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn } + span:focus::before {
            border: 1px solid ${ theme["radio-button-hover-border-color"] } !important;
        }`;
        
        let radioButtonFocusAfterStyle = <HTMLElement> document.getElementById('radioButtonFocusAfterStyle');
        radioButtonFocusAfterStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn } + span:focus::after {
            background-color: ${ theme["radio-button-checked-background-color"] } !important;
        }`;
        
        let radioButtonDisabledStyle = <HTMLElement> document.getElementById('radioButtonDisabledStyle');
        radioButtonDisabledStyle.innerHTML = `input[type="radio"].${ styles.cookieItemRadioBtn }:disabled + span::before {
            border: 1px solid ${ theme["radio-button-disabled-border-color"] } !important;
            background-color: ${ theme["radio-button-disabled-color"] } !important;
        }`;
    }
}