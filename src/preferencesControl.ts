import * as rawStyles from './styles.scss';
import { HtmlTools } from './htmlTools';

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/Options';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

const styles = rawStyles.locals;

export class PreferencesControl {
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    cookieCategoriesPreferences: ICookieCategoriesPreferences;

    private containerElement: HTMLElement;
    private direction: string = 'ltr';
    private isDirty: { changed: boolean };
    private onPreferencesClosed: () => void;
    private previousFocusElementBeforePopup: HTMLElement | null = null;

    constructor(cookieCategories: ICookieCategory[], 
                textResources: ITextResources, 
                cookieCategoriesPreferences: ICookieCategoriesPreferences, 
                containerElement: HTMLElement, 
                direction: string,
                isDirty: { changed: boolean },
                onPreferencesClosed: () => void) {

        this.cookieCategories = cookieCategories;
        this.textResources = textResources;
        this.cookieCategoriesPreferences = cookieCategoriesPreferences;
        this.containerElement = containerElement;
        this.direction = direction;
        this.isDirty = isDirty;
        this.onPreferencesClosed = onPreferencesClosed;
    }

    /**
     * Create a hidden Preferences Dialog and insert in the bottom of the container.
     * 
     * @param {boolean} banner true for banner, false for preferences dialog. 
     */
    public createPreferencesDialog(): void {
        // Build modal using DOM APIs to avoid innerHTML (Trusted Types safe)
        const cookieModal = document.createElement('div');
        cookieModal.setAttribute('id', 'wcpCookiePreferenceCtrl');
        cookieModal.setAttribute('class', styles.cookieModal);
        cookieModal.setAttribute('dir', this.direction);

        let presentationDiv = document.createElement('div');
        presentationDiv.setAttribute('role', 'presentation');
        presentationDiv.setAttribute('tabindex', '-1');
        cookieModal.appendChild(presentationDiv);

        let dialogDiv = document.createElement('div');
        dialogDiv.setAttribute('role', 'dialog');
        dialogDiv.setAttribute('aria-modal', 'true');
        dialogDiv.setAttribute('aria-label', this.textResources.preferencesDialogTitle || '');
        dialogDiv.setAttribute('class', styles.modalContainer);
        dialogDiv.setAttribute('tabindex', '-1');

        let closeBtn = document.createElement('button');
        closeBtn.setAttribute('aria-label', this.textResources.preferencesDialogCloseLabel || '');
        closeBtn.setAttribute('class', styles.closeModalIcon);
        closeBtn.setAttribute('tabindex', '0');
        closeBtn.textContent = '\u2715';
        dialogDiv.appendChild(closeBtn);

        let modalBody = document.createElement('div');
        modalBody.setAttribute('role', 'document');
        modalBody.setAttribute('class', styles.modalBody);

        let titleDiv = document.createElement('div');
        let h1 = document.createElement('h1');
        h1.setAttribute('class', `${ styles.modalTitle } ${ styles.textColorTheme }`);
        h1.textContent = this.textResources.preferencesDialogTitle || '';
        titleDiv.appendChild(h1);
        modalBody.appendChild(titleDiv);

        let form = document.createElement('form');
        form.setAttribute('class', `${ styles.modalContent } ${ styles.hyperLinkTheme }`);

        let cookieStatement = document.createElement('p');
        cookieStatement.setAttribute('class', `${ styles.cookieStatement } ${ styles.textColorTheme }`);
        HtmlTools.setHtmlContent(cookieStatement, this.textResources.preferencesDialogDescHtml);
        form.appendChild(cookieStatement);

        let cookieOrderedList = document.createElement('dl');
        cookieOrderedList.setAttribute('class', styles.cookieOrderedList);
        form.appendChild(cookieOrderedList);

        modalBody.appendChild(form);

        let modalButtonGroup = document.createElement('div');
        modalButtonGroup.setAttribute('class', styles.modalButtonGroup);

        let saveBtn = document.createElement('button');
        saveBtn.setAttribute('type', 'button');
        saveBtn.setAttribute('aria-label', this.textResources.saveLabel || '');
        saveBtn.setAttribute('class', `${ styles.modalButtonSave } ${ styles.primaryButtonTheme }`);
        saveBtn.disabled = true;
        saveBtn.textContent = this.textResources.saveLabel || '';

        let resetBtn = document.createElement('button');
        resetBtn.setAttribute('type', 'button');
        resetBtn.setAttribute('aria-label', this.textResources.resetLabel || '');
        resetBtn.setAttribute('class', `${ styles.modalButtonReset } ${ styles.secondaryButtonTheme }`);
        resetBtn.disabled = true;
        resetBtn.textContent = this.textResources.resetLabel || '';

        modalButtonGroup.appendChild(saveBtn);
        modalButtonGroup.appendChild(resetBtn);
        modalBody.appendChild(modalButtonGroup);

        dialogDiv.appendChild(modalBody);
        cookieModal.appendChild(dialogDiv);

        this.containerElement.appendChild(cookieModal);
        
        let enabledResetAll = false;

        // Insert cookie category 
        for (let cookieCategory of this.cookieCategories) {
            if (cookieCategory.isUnswitchable) {
                let dt = document.createElement('dt');
                dt.setAttribute('class', `${ styles.cookieListItem } ${ styles.textColorTheme }`);
                dt.setAttribute('aria-label', cookieCategory.name);

                let h2 = document.createElement('h2');
                h2.setAttribute('class', `${ styles.cookieListItemTitle } ${ styles.textColorTheme }`);
                h2.textContent = cookieCategory.name;
                dt.appendChild(h2);

                let p = document.createElement('p');
                p.setAttribute('class', `${ styles.cookieListItemDescription } ${ styles.textColorTheme }`);
                HtmlTools.setHtmlContent(p, cookieCategory.descHtml);
                dt.appendChild(p);

                cookieOrderedList.appendChild(dt);
            }
            else {
                if (this.cookieCategoriesPreferences[cookieCategory.id] !== undefined) {
                    enabledResetAll = true;
                }

                let nameAttribute: string = cookieCategory.id;
                let acceptRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_accept`;
                let rejectRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_reject`;
                let cookieListItemTitleId = `${ styles.cookieListItemTitle }_${ nameAttribute }_title`;

                let dt = document.createElement('dt');
                dt.setAttribute('class', `${ styles.cookieListItem } ${ styles.textColorTheme }`);
                dt.setAttribute('aria-label', cookieCategory.name);

                let groupDiv = document.createElement('div');
                groupDiv.setAttribute('class', styles.cookieListItemGroup);
                groupDiv.setAttribute('role', 'radiogroup');
                groupDiv.setAttribute('aria-labelledby', cookieListItemTitleId);

                let h2 = document.createElement('h2');
                h2.setAttribute('class', `${ styles.cookieListItemTitle } ${ styles.textColorTheme }`);
                h2.setAttribute('id', cookieListItemTitleId);
                h2.textContent = cookieCategory.name;
                groupDiv.appendChild(h2);

                let descP = document.createElement('p');
                descP.setAttribute('class', `${ styles.cookieListItemDescription } ${ styles.textColorTheme }`);
                HtmlTools.setHtmlContent(descP, cookieCategory.descHtml);
                groupDiv.appendChild(descP);

                let radioBtnGroup = document.createElement('div');
                radioBtnGroup.setAttribute('class', styles.cookieItemRadioBtnGroup);

                // Accept radio
                let acceptCtrl = document.createElement('div');
                acceptCtrl.setAttribute('class', styles.cookieItemRadioBtnCtrl);

                let acceptRadio = document.createElement('input');
                acceptRadio.setAttribute('type', 'radio');
                acceptRadio.setAttribute('class', styles.cookieItemRadioBtn);
                acceptRadio.setAttribute('name', nameAttribute);
                acceptRadio.setAttribute('id', acceptRadioId);
                acceptRadio.setAttribute('value', 'accept');
                if (this.cookieCategoriesPreferences[cookieCategory.id] === true) {
                    acceptRadio.checked = true;
                }
                acceptCtrl.appendChild(acceptRadio);

                let acceptLabel = document.createElement('label');
                acceptLabel.setAttribute('class', `${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }`);
                acceptLabel.setAttribute('for', acceptRadioId);
                acceptLabel.textContent = this.textResources.acceptLabel || '';
                acceptCtrl.appendChild(acceptLabel);

                radioBtnGroup.appendChild(acceptCtrl);

                // Reject radio
                let rejectCtrl = document.createElement('div');
                rejectCtrl.setAttribute('class', styles.cookieItemRadioBtnCtrl);

                let rejectRadio = document.createElement('input');
                rejectRadio.setAttribute('type', 'radio');
                rejectRadio.setAttribute('class', styles.cookieItemRadioBtn);
                rejectRadio.setAttribute('name', nameAttribute);
                rejectRadio.setAttribute('id', rejectRadioId);
                rejectRadio.setAttribute('value', 'reject');
                if (this.cookieCategoriesPreferences[cookieCategory.id] === false) {
                    rejectRadio.checked = true;
                }
                rejectCtrl.appendChild(rejectRadio);

                let rejectLabel = document.createElement('label');
                rejectLabel.setAttribute('class', `${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }`);
                rejectLabel.setAttribute('for', rejectRadioId);
                rejectLabel.textContent = this.textResources.rejectLabel || '';
                rejectCtrl.appendChild(rejectLabel);

                radioBtnGroup.appendChild(rejectCtrl);

                groupDiv.appendChild(radioBtnGroup);
                dt.appendChild(groupDiv);
                cookieOrderedList.appendChild(dt);
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
     * Handle event when preferences dialog is created.
     */
    public onPreferencesDialogShowing(): void {
        let dialogPresent = false;
        if (this.previousFocusElementBeforePopup) {
            dialogPresent = true;
        }

        this.previousFocusElementBeforePopup = <HTMLElement> document.activeElement;
        
        let dialog: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.modalContainer)[0];
        dialog.focus();

        if (!dialogPresent) {
            dialog.addEventListener('keydown', (event) => {
                if (event.key == 'Escape' || event.key == 'Esc') {
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
                        this.isDirty.changed = true;
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

            this.isDirty.changed = false;

            // Reset UI
            this.setRadioBtnState();
        });

        if (this.isDirty.changed) {
            modalButtonSave.disabled = false;
        }
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