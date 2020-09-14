import * as styles from "./styles.scss";
import { HtmlTools } from './htmlTools';

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/Options';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class PreferencesControl {
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    cookieCategoriesPreferences: ICookieCategoriesPreferences;

    private containerElement: HTMLElement;
    private direction: string = 'ltr';
    private onPreferencesClosed: () => void;
    private previousFocusElementBeforePopup: HTMLElement | null = null;

    constructor(cookieCategories: ICookieCategory[], 
                textResources: ITextResources, 
                cookieCategoriesPreferences: ICookieCategoriesPreferences, 
                containerElement: HTMLElement, 
                direction: string,
                onPreferencesClosed: () => void) {

        this.cookieCategories = cookieCategories;
        this.textResources = textResources;
        this.cookieCategoriesPreferences = cookieCategoriesPreferences;
        this.containerElement = containerElement;
        this.direction = direction;
        this.onPreferencesClosed = onPreferencesClosed;
    }

    /**
     * Create a hidden Preferences Dialog and insert in the bottom of the container.
     * 
     * @param {boolean} banner true for banner, false for preferences dialog. 
     */
    public createPreferencesDialog(): void {
        let cookieModalInnerHtml = `
        <div role="presentation" tabindex="-1"></div>
        <div role="dialog" aria-modal="true" aria-label="${ HtmlTools.escapeHtml(this.textResources.preferencesDialogTitle) }" class="${ styles.modalContainer }" tabindex="-1">
            <button aria-label="${ HtmlTools.escapeHtml(this.textResources.preferencesDialogCloseLabel) }" class="${ styles.closeModalIcon }" tabindex="0">&#x2715;</button>
            <div role="document" class="${ styles.modalBody }">
                <div>
                    <h1 class="${ styles.modalTitle } ${ styles.textColorTheme }">${ HtmlTools.escapeHtml(this.textResources.preferencesDialogTitle) }</h1>
                </div>
                
                <form class="${ styles.modalContent } ${ styles.hyperLinkTheme }">
                    <p class="${ styles.cookieStatement } ${ styles.textColorTheme }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <dl class="${ styles.cookieOrderedList }">
                    </dl>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="${ HtmlTools.escapeHtml(this.textResources.saveLabel) }" class="${ styles.modalButtonSave } ${ styles.primaryButtonTheme }" disabled>${ HtmlTools.escapeHtml(this.textResources.saveLabel) }</button>
                    <button type="button" aria-label="${ HtmlTools.escapeHtml(this.textResources.resetLabel) }" class="${ styles.modalButtonReset } ${ styles.secondaryButtonTheme }" disabled>${ HtmlTools.escapeHtml(this.textResources.resetLabel) }</button>
                </div>
            </div>
        </div>
        `;

        const cookieModal = document.createElement('div');
        cookieModal.setAttribute('id','wcpCookiePreferenceCtrl');
        cookieModal.setAttribute('class', styles.cookieModal);
        cookieModal.setAttribute('dir', this.direction);
        cookieModal.innerHTML = cookieModalInnerHtml;

        this.containerElement.appendChild(cookieModal);
        
        let enabledResetAll = false;

        // Insert cookie category 
        for (let cookieCategory of this.cookieCategories) {
            if (cookieCategory.isUnswitchable) {
                let item = `
                <dt class="${ styles.cookieListItem } ${ styles.textColorTheme }" aria-label="${ HtmlTools.escapeHtml(cookieCategory.name) }">
                    <h2 class="${ styles.cookieListItemTitle } ${ styles.textColorTheme }">${ HtmlTools.escapeHtml(cookieCategory.name) }</h2>
                    <p class="${ styles.cookieListItemDescription } ${ styles.textColorTheme }">${ cookieCategory.descHtml }</p>
                </dt>
                `;

                let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                cookieOrderedList.innerHTML += item;
            }
            else {
                if (this.cookieCategoriesPreferences[cookieCategory.id] !== undefined) {
                    enabledResetAll = true;
                }

                let nameAttribute: string = cookieCategory.id;
                let acceptValue = this.cookieCategoriesPreferences[cookieCategory.id] === true ? "checked" : "";
                let rejectValue = this.cookieCategoriesPreferences[cookieCategory.id] === false ? "checked" : "";

                let acceptRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_accept`;
                let rejectRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_reject`;

                let acceptRadio = `<input type="radio" class="${ styles.cookieItemRadioBtn }" name="${ nameAttribute }" id="${ acceptRadioId }" value="accept" ${ acceptValue }>`;
                let rejectRadio = `<input type="radio" class="${ styles.cookieItemRadioBtn }" name="${ nameAttribute }" id="${ rejectRadioId }" value="reject" ${ rejectValue }>`;

                let cookieListItemTitleId = `${ styles.cookieListItemTitle }_${ nameAttribute }_title`;

                let item = `
                <dt class="${ styles.cookieListItem } ${ styles.textColorTheme }" aria-label="${ HtmlTools.escapeHtml(cookieCategory.name) }">
                    <div class="${ styles.cookieListItemGroup }" role="radiogroup" aria-labelledby="${ cookieListItemTitleId }">
                        <h2 class="${ styles.cookieListItemTitle } ${ styles.textColorTheme }" id="${ cookieListItemTitleId }">${ HtmlTools.escapeHtml(cookieCategory.name) }</h2>
                        <p class="${ styles.cookieListItemDescription } ${ styles.textColorTheme }">${ cookieCategory.descHtml }</p>
                        <div class="${ styles.cookieItemRadioBtnGroup }">
                            <div class="${ styles.cookieItemRadioBtnCtrl }">
                                ${ acceptRadio }
                                <label class="${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }" for="${ acceptRadioId }">${ HtmlTools.escapeHtml(this.textResources.acceptLabel) }</label>
                            </div>
                            <div class="${ styles.cookieItemRadioBtnCtrl }">
                                ${ rejectRadio }
                                <label class="${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }" for="${ rejectRadioId }">${ HtmlTools.escapeHtml(this.textResources.rejectLabel) }</label>
                            </div>
                        </div>
                    </div>
                </dt>
                `;

                let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                cookieOrderedList.innerHTML += item;
            }
        }

        if (enabledResetAll) {
            let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];
            if (modalButtonReset) {
                modalButtonReset.disabled = false;
            }
        }
        
        // Add those event handler
        this.addPreferencesButtonsEvent();
    }

    /**
     * Show preferences dialog (from hidden state)
     */
    public showPreferencesDialog(): void {
        let modal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        if (modal) {
            this.previousFocusElementBeforePopup = <HTMLElement> document.activeElement;
            modal.style.display = 'block';

            let dialog: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.modalContainer)[0];
            dialog.focus();

            dialog.addEventListener('keydown', (event) => {
                if (event.key == 'Escape') {
                    event.preventDefault();
                    this.hidePreferencesDialog();
                }
            });
        }
    }

    /**
     * Hides Preferences Dialog. Removes all HTML elements of the Preferences Dialog from the DOM.
     */
    public hidePreferencesDialog(): void {
        let cookieModal = document.getElementsByClassName(styles.cookieModal)[0];
        this.containerElement.removeChild(cookieModal);

        this.previousFocusElementBeforePopup?.focus();
        this.previousFocusElementBeforePopup = null;

        this.onPreferencesClosed();
    }

    /**
     * Add event handlers for handling button events
     * 1. Click "X" button, preference dialog will be removed from the DOM
     * 2. Click any "accept/reject" button, "Save changes" and "Reset all" button will be enabled
     * 3. Click any "accept/reject" button, cookieCategoriesPreferences will be set
     * 4. Click "Reset all" button, cookieCategoriesPreferences will be reset
     * 5. Handle accessibility
     */
    private addPreferencesButtonsEvent(): void {
        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];

        let acceptRejectButtons: Element[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        let modalButtonSave: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0];
        let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];

        this.controlRadioBtnFocusStyle();
        this.controlNextActiveElement();

        closeModalIcon?.addEventListener('click', () => this.hidePreferencesDialog());

        for (let radio of acceptRejectButtons) {
            radio.addEventListener('click', () => {
                let categId = radio.getAttribute('name');
                if (categId) {
                    let oldCategValue = this.cookieCategoriesPreferences[categId];

                    // Change cookieCategoriesPreferences
                    let categValue = radio.getAttribute('value');
                    if (categValue === 'accept') {
                        this.cookieCategoriesPreferences[categId] = true;
                    }
                    else {   // categValue === 'reject'
                        this.cookieCategoriesPreferences[categId] = false;
                    }

                    // Enable "Save changes" button
                    if (oldCategValue !== this.cookieCategoriesPreferences[categId]) {
                        modalButtonSave.disabled = false;
                    }
                }
            });
        }

        modalButtonReset?.addEventListener('click', () => {
            modalButtonSave.disabled = false;

            for (let cookieCategory of this.cookieCategories) {
                if (!cookieCategory.isUnswitchable) {
                    this.cookieCategoriesPreferences[cookieCategory.id] = undefined;
                }
            }

            // Reset UI
            this.setRadioBtnState();
        });
    }

    /**
     * 1. When "X" button is focused, press Tab + Shift keys. Last element will be focused.
     * 2. When last element is focused, press Tab key. "X" button will be focused.
     */
    private controlNextActiveElement(): void {
        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        let modalButtonSave: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0];
        let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];

        let acceptRejectButtons: Element[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));

        let lastAcceptRadioBtn: HTMLElement | null = null;
        let lastRejectRadioBtn: HTMLElement | null = null;
        if (acceptRejectButtons.length) {
            lastAcceptRadioBtn = <HTMLElement> acceptRejectButtons[acceptRejectButtons.length - 2];
            lastRejectRadioBtn = <HTMLElement> acceptRejectButtons[acceptRejectButtons.length - 1];
        }

        let lastElementTab = function(event: KeyboardEvent): void {
            if (event.key == 'Tab' && !event.shiftKey) {
                event.preventDefault();
                closeModalIcon.focus();
            }
        };
        let firstElementShiftTab = function(event: KeyboardEvent): void {
            if (event.key == 'Tab' && event.shiftKey) {
                event.preventDefault();
                lastRejectRadioBtn?.focus();
            }
        };
        let closeIconShiftTab2Reset = function(event: KeyboardEvent): void {
            if (event.key == 'Tab' && event.shiftKey) {
                event.preventDefault();
                modalButtonReset.focus();
            }
        }

        modalButtonReset.addEventListener('keydown', (event) => {
            if (event.key == 'Tab' && !event.shiftKey) {
                event.preventDefault();
                closeModalIcon.focus();
            }
        });

        if (modalButtonReset.disabled && modalButtonSave.disabled) {
            if (acceptRejectButtons.length) {
                lastAcceptRadioBtn?.addEventListener('keydown', lastElementTab);
                lastRejectRadioBtn?.addEventListener('keydown', lastElementTab);

                closeModalIcon.addEventListener('keydown', firstElementShiftTab);
            }
        }
        else {
            closeModalIcon.addEventListener('keydown', closeIconShiftTab2Reset);
        }

        for (let radio of acceptRejectButtons) {
            radio.addEventListener('click', () => {
                // Enable "Reset all" button
                // Update event listener function in "X" and remove event listener in last accept/reject radio buttons
                if (modalButtonReset.disabled) {
                    modalButtonReset.disabled = false;

                    lastAcceptRadioBtn?.removeEventListener('keydown', lastElementTab);
                    lastRejectRadioBtn?.removeEventListener('keydown', lastElementTab);
                    
                    closeModalIcon.removeEventListener('keydown', firstElementShiftTab);
                    closeModalIcon.addEventListener('keydown', closeIconShiftTab2Reset);
                }
            });
        }
    }

    /**
     * 1. If the radio button is focused, add the outline styles.
     * 2. If the radio button is blurred (not focused), remove the outline styles.
     */
    private controlRadioBtnFocusStyle(): void {
        let acceptRejectButtons: Element[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));

        for (let radio of acceptRejectButtons) {
            radio.addEventListener('blur', (event) => {
                let currentFocusRadtioBtn = <HTMLInputElement> event.target;
                this.removeBlurRadioBtnOutline(currentFocusRadtioBtn);
            });

            radio.addEventListener('focus', (event) => {
                let currentFocusRadtioBtn = <HTMLInputElement> event.target;

                let currentFocusRadioBtnParent = currentFocusRadtioBtn.parentElement;
                currentFocusRadioBtnParent!.className += ' ' + styles.cookieItemRadioBtnCtrlOutline;
            });
        }
    }

    /**
     * Remove outline class in radio button which is not focused
     */
    private removeBlurRadioBtnOutline(target: HTMLElement): void {
        if (target) {
            let radioBtnOutline = target.parentElement!;
            let radioBtnOutlineClass = radioBtnOutline.className;

            let newRadioBtnClass = radioBtnOutlineClass.replace(` ${ styles.cookieItemRadioBtnCtrlOutline }`, '');
            radioBtnOutline.className = newRadioBtnClass;
        }
    }
    
    /**
     * Add event handlers for handling "Save changes" button event.
     * When "Save changes" button is clicked, "fn" will be executed.
     * 
     * @param fn function that needs to be executed
     */
    public addSaveButtonEvent(fn: () => void): void {
        let modalButtonSave: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(styles.modalButtonSave)[0];
        modalButtonSave?.addEventListener('click', () => fn());
    }

    /**
     * Set radio buttons checked/unchecked in Preferences Dialog
     */
    public setRadioBtnState(): void {
        let i = 0;
        for (let cookieCategory of this.cookieCategories) {
            if (cookieCategory.isUnswitchable) {
                continue;
            }

            let categId = cookieCategory.id;
            if (this.cookieCategoriesPreferences[categId] === true) {
                let acceptRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                acceptRadio.checked = true;
                i++;

                let rejectRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                rejectRadio.checked = false;
                i++;
            }
            else if (this.cookieCategoriesPreferences[categId] === false) {
                let acceptRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                acceptRadio.checked = false;
                i++;

                let rejectRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                rejectRadio.checked = true;
                i++;
            }
            else {   // cookieCategoriesPreferences[categId] === undefined
                let acceptRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                acceptRadio.checked = false;
                i++;

                let rejectRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
                rejectRadio.checked = false;
                i++;
            }
        }
    }
}