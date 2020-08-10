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
                    <h2 class="${styles.modalTitle}">${ HtmlTools.escapeHtml(this.textResources.preferencesDialogTitle) }</h2>
                </div>
                
                <form class="${ styles.modalContent }">
                    <p class="${ styles.cookieStatement }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <ol class="${ styles.cookieOrderedList }">
                    </ol>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="${ HtmlTools.escapeHtml(this.textResources.saveLabel) }" class="${ styles.modalButtonSave }" disabled>${ HtmlTools.escapeHtml(this.textResources.saveLabel) }</button>
                    <button type="button" aria-label="${ HtmlTools.escapeHtml(this.textResources.resetLabel) }" class="${ styles.modalButtonReset }" disabled>${ HtmlTools.escapeHtml(this.textResources.resetLabel) }</button>
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
                <li class="${ styles.cookieListItem }">
                    <h3 class="${ styles.cookieListItemTitle }">${ HtmlTools.escapeHtml(cookieCategory.name) }</h3>
                    <p class="${ styles.cookieListItemDescription }">${ cookieCategory.descHtml }</p>
                </li>
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

                let acceptRadio = `<input type="radio" aria-label="${ HtmlTools.escapeHtml(this.textResources.acceptLabel) }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="accept" ${acceptValue}>`;
                let rejectRadio = `<input type="radio" aria-label="${ HtmlTools.escapeHtml(this.textResources.rejectLabel) }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="reject" ${rejectValue}>`;

                let item = `
                <li class="${ styles.cookieListItem }">
                    <div class="${ styles.cookieListItemGroup}" role="radiogroup" aria-label="${ HtmlTools.escapeHtml(cookieCategory.name) }">
                        <h3 class="${ styles.cookieListItemTitle }">${ HtmlTools.escapeHtml(cookieCategory.name) }</h3>
                        <p class="${ styles.cookieListItemDescription}">${cookieCategory.descHtml}</p>
                        <div class="${ styles.cookieItemRadioBtnGroup}">
                            <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                ${ acceptRadio}
                                <span class="${ styles.cookieItemRadioBtnLabel}">${ HtmlTools.escapeHtml(this.textResources.acceptLabel) }</span>
                            </label>
                            <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                ${ rejectRadio}
                                <span class="${ styles.cookieItemRadioBtnLabel}">${ HtmlTools.escapeHtml(this.textResources.rejectLabel) }</span>
                            </label>
                        </div>
                    </div>
                </li>
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
            modal.style.display = 'block';
        }
    }

    /**
     * Hides Preferences Dialog. Removes all HTML elements of the Preferences Dialog from the DOM.
     */
    public hidePreferencesDialog(): void {
        let cookieModal = document.getElementsByClassName(styles.cookieModal)[0];
        this.containerElement.removeChild(cookieModal);
        this.onPreferencesClosed();
    }

    /**
     * Add event handlers for handling button events
     * 1. Click "X" button, preference dialog will be removed from the DOM
     * 2. Click any "accept/reject" button, "Save changes" and "Reset all" button will be enabled
     * 3. Click any "accept/reject" button, cookieCategoriesPreferences will be set
     * 4. Click "Reset all" button, cookieCategoriesPreferences will be reset
     */
    private addPreferencesButtonsEvent(): void {
        let closeModalIcon = document.getElementsByClassName(styles.closeModalIcon)[0];

        let cookieItemRadioBtn: Element[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        let modalButtonSave: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(styles.modalButtonSave)[0];
        let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];

        closeModalIcon?.addEventListener('click', () => this.hidePreferencesDialog());
        
        if (cookieItemRadioBtn && cookieItemRadioBtn.length) {
            for (let radio of cookieItemRadioBtn) {
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
    
                        // Enable "Save changes" and "Reset all" buttons
                        if (oldCategValue !== this.cookieCategoriesPreferences[categId]) {
                            if (modalButtonSave) {
                                modalButtonSave.disabled = false;
                            }
                        }
                        if (modalButtonReset) {
                            modalButtonReset.disabled = false;
                        }
                    }
                });
            }
        }

        modalButtonReset?.addEventListener('click', () => {
            if (modalButtonSave) {
                modalButtonSave.disabled = false;
            }

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