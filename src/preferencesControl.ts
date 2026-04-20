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
        const cookieModal = document.createElement('div');
        cookieModal.id = 'wcpCookiePreferenceCtrl';
        cookieModal.className = styles.cookieModal;
        cookieModal.setAttribute('dir', this.direction);

        // Backdrop
        const backdrop = document.createElement('div');
        backdrop.setAttribute('role', 'presentation');
        backdrop.tabIndex = -1;
        cookieModal.appendChild(backdrop);

        // Dialog container
        const dialog = document.createElement('div');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', this.textResources.preferencesDialogTitle ?? '');
        dialog.className = styles.modalContainer;
        dialog.tabIndex = -1;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('aria-label', this.textResources.preferencesDialogCloseLabel ?? '');
        closeBtn.className = styles.closeModalIcon;
        closeBtn.tabIndex = 0;
        closeBtn.textContent = '\u2715';
        dialog.appendChild(closeBtn);

        // Document body
        const modalBody = document.createElement('div');
        modalBody.setAttribute('role', 'document');
        modalBody.className = styles.modalBody;

        // Title
        const titleWrapper = document.createElement('div');
        const h1 = document.createElement('h1');
        h1.className = `${ styles.modalTitle } ${ styles.textColorTheme }`;
        h1.textContent = this.textResources.preferencesDialogTitle ?? '';
        titleWrapper.appendChild(h1);
        modalBody.appendChild(titleWrapper);

        // Form
        const form = document.createElement('form');
        form.className = `${ styles.modalContent } ${ styles.hyperLinkTheme }`;

        // Description paragraph — {0},{1},... placeholders are replaced by preferencesDialogDescLinks entries
        const descP = document.createElement('p');
        descP.className = `${ styles.cookieStatement } ${ styles.textColorTheme }`;
        HtmlTools.appendTextWithLinks(
            descP,
            this.textResources.preferencesDialogDesc ?? '',
            this.textResources.preferencesDialogDescLinks
        );
        form.appendChild(descP);

        // Cookie list
        const cookieList = document.createElement('dl');
        cookieList.className = styles.cookieOrderedList;
        form.appendChild(cookieList);
        modalBody.appendChild(form);

        // Button group
        const buttonGroup = document.createElement('div');
        buttonGroup.className = styles.modalButtonGroup;

        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.setAttribute('aria-label', this.textResources.saveLabel ?? '');
        saveBtn.className = `${ styles.modalButtonSave } ${ styles.primaryButtonTheme }`;
        saveBtn.disabled = true;
        saveBtn.textContent = this.textResources.saveLabel ?? '';
        buttonGroup.appendChild(saveBtn);

        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.setAttribute('aria-label', this.textResources.resetLabel ?? '');
        resetBtn.className = `${ styles.modalButtonReset } ${ styles.secondaryButtonTheme }`;
        resetBtn.disabled = true;
        resetBtn.textContent = this.textResources.resetLabel ?? '';
        buttonGroup.appendChild(resetBtn);

        modalBody.appendChild(buttonGroup);
        dialog.appendChild(modalBody);
        cookieModal.appendChild(dialog);
        this.containerElement.appendChild(cookieModal);

        let enabledResetAll = false;

        // Insert cookie categories
        for (let cookieCategory of this.cookieCategories) {
            const dt = document.createElement('dt');
            dt.className = `${ styles.cookieListItem } ${ styles.textColorTheme }`;
            dt.setAttribute('aria-label', cookieCategory.name);

            if (cookieCategory.isUnswitchable) {
                const catH2 = document.createElement('h2');
                catH2.className = `${ styles.cookieListItemTitle } ${ styles.textColorTheme }`;
                catH2.textContent = cookieCategory.name;
                dt.appendChild(catH2);

                const catP = document.createElement('p');
                catP.className = `${ styles.cookieListItemDescription } ${ styles.textColorTheme }`;
                catP.appendChild(HtmlTools.createText(cookieCategory.desc));
                if (cookieCategory.descLink) {
                    catP.appendChild(HtmlTools.createLink(cookieCategory.descLink.text, cookieCategory.descLink.href));
                }
                dt.appendChild(catP);
            }
            else {
                if (this.cookieCategoriesPreferences[cookieCategory.id] !== undefined) {
                    enabledResetAll = true;
                }

                const nameAttribute = cookieCategory.id;
                const acceptChecked = this.cookieCategoriesPreferences[cookieCategory.id] === true;
                const rejectChecked = this.cookieCategoriesPreferences[cookieCategory.id] === false;

                const acceptRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_accept`;
                const rejectRadioId = `${ styles.cookieItemRadioBtn }_${ nameAttribute }_reject`;
                const titleId = `${ styles.cookieListItemTitle }_${ nameAttribute }_title`;

                const group = document.createElement('div');
                group.className = styles.cookieListItemGroup;
                group.setAttribute('role', 'radiogroup');
                group.setAttribute('aria-labelledby', titleId);

                const catH2 = document.createElement('h2');
                catH2.className = `${ styles.cookieListItemTitle } ${ styles.textColorTheme }`;
                catH2.id = titleId;
                catH2.textContent = cookieCategory.name;
                group.appendChild(catH2);

                const catP = document.createElement('p');
                catP.className = `${ styles.cookieListItemDescription } ${ styles.textColorTheme }`;
                catP.appendChild(HtmlTools.createText(cookieCategory.desc));
                if (cookieCategory.descLink) {
                    catP.appendChild(HtmlTools.createLink(cookieCategory.descLink.text, cookieCategory.descLink.href));
                }
                group.appendChild(catP);

                const radioBtnGroup = document.createElement('div');
                radioBtnGroup.className = styles.cookieItemRadioBtnGroup;

                // Accept radio
                const acceptCtrl = document.createElement('div');
                acceptCtrl.className = styles.cookieItemRadioBtnCtrl;
                const acceptRadio = document.createElement('input');
                acceptRadio.type = 'radio';
                acceptRadio.className = styles.cookieItemRadioBtn;
                acceptRadio.name = nameAttribute;
                acceptRadio.id = acceptRadioId;
                acceptRadio.value = 'accept';
                acceptRadio.checked = acceptChecked;
                const acceptLabel = document.createElement('label');
                acceptLabel.className = `${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }`;
                acceptLabel.htmlFor = acceptRadioId;
                acceptLabel.textContent = this.textResources.acceptLabel ?? '';
                acceptCtrl.appendChild(acceptRadio);
                acceptCtrl.appendChild(acceptLabel);

                // Reject radio
                const rejectCtrl = document.createElement('div');
                rejectCtrl.className = styles.cookieItemRadioBtnCtrl;
                const rejectRadio = document.createElement('input');
                rejectRadio.type = 'radio';
                rejectRadio.className = styles.cookieItemRadioBtn;
                rejectRadio.name = nameAttribute;
                rejectRadio.id = rejectRadioId;
                rejectRadio.value = 'reject';
                rejectRadio.checked = rejectChecked;
                const rejectLabel = document.createElement('label');
                rejectLabel.className = `${ styles.cookieItemRadioBtnLabel } ${ styles.textColorTheme }`;
                rejectLabel.htmlFor = rejectRadioId;
                rejectLabel.textContent = this.textResources.rejectLabel ?? '';
                rejectCtrl.appendChild(rejectRadio);
                rejectCtrl.appendChild(rejectLabel);

                radioBtnGroup.appendChild(acceptCtrl);
                radioBtnGroup.appendChild(rejectCtrl);
                group.appendChild(radioBtnGroup);
                dt.appendChild(group);
            }

            cookieList.appendChild(dt);
        }

        if (enabledResetAll) {
            const modalButtonReset = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];
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