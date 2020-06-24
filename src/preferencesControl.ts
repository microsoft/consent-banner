import * as styles from "./styles.scss";
import { HtmlTools } from './htmlTools';

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/TextResources';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class PreferencesControl {
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;
    cookieCategoriesPreferences: ICookieCategoriesPreferences;

    private oldCookieCategoriesPreferences: ICookieCategoriesPreferences;
    private containerElementOrId: string = '';
    private direction: string = 'ltr';
    private nullItself: () => void;

    constructor(cookieCategories: ICookieCategory[], 
                textResources: ITextResources, 
                cookieCategoriesPreferences: ICookieCategoriesPreferences, 
                containerElement: string, 
                direction: string,
                nullItself: () => void) {

        this.cookieCategories = cookieCategories;
        this.textResources = textResources;
        this.cookieCategoriesPreferences = cookieCategoriesPreferences;
        this.oldCookieCategoriesPreferences = { ...cookieCategoriesPreferences };
        this.containerElementOrId = containerElement;
        this.direction = direction;
        this.nullItself = nullItself;
    }

    /**
     * Create a hidden Preferences Dialog and insert in the bottom of the container.
     * 
     * @param {boolean} banner true for banner, false for preferences dialog. 
     */
    public createPreferencesDialog(): void {
        let htmlTools = new HtmlTools();
        let insert = document.querySelector('#' + this.containerElementOrId);

        let cookieModalInnerHtml = `
        <div role="presentation" tabindex="-1"></div>
        <div role="dialog" aria-modal="true" aria-label="${ htmlTools.escapeHtml(this.textResources.preferencesDialogTitle) }" class="${ styles.modalContainer }" tabindex="-1">
            <button aria-label="${ htmlTools.escapeHtml(this.textResources.preferencesDialogCloseLabel) }" class="${ styles.closeModalIcon }" tabindex="0">&#x2715;</button>
            <div role="document" class="${ styles.modalBody }">
                <div>
                    <h2 class="${styles.modalTitle}">${ htmlTools.escapeHtml(this.textResources.preferencesDialogTitle) }</h2>
                </div>
                
                <form class="${ styles.modalContent }">
                    <p class="${ styles.cookieStatement }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <ol class="${ styles.cookieOrderedList }">
                    </ol>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="${ htmlTools.escapeHtml(this.textResources.saveLabel) }" class="${ styles.modalButtonSave }" disabled>${ htmlTools.escapeHtml(this.textResources.saveLabel) }</button>
                    <button type="button" aria-label="${ htmlTools.escapeHtml(this.textResources.resetLabel) }" class="${ styles.modalButtonReset }" disabled>${ htmlTools.escapeHtml(this.textResources.resetLabel) }</button>
                </div>
            </div>
        </div>
        `;

        const cookieModal = document.createElement('div');
        cookieModal.setAttribute('class', styles.cookieModal);
        cookieModal.setAttribute('dir', this.direction);
        cookieModal.innerHTML = cookieModalInnerHtml;

        if (insert) {
            insert.appendChild(cookieModal);
            
            // Insert cookie category 
            for (let cookieCategory of this.cookieCategories) {
                if (cookieCategory.isUnswitchable) {
                    let item = `
                    <li class="${ styles.cookieListItem }">
                        <h3 class="${ styles.cookieListItemTitle }">${ htmlTools.escapeHtml(cookieCategory.name) }</h3>
                        <p class="${ styles.cookieListItemDescription }">${ cookieCategory.descHtml }</p>
                    </li>
                    `;

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.innerHTML += item;
                }
                else {
                    let nameAttribute: string = cookieCategory.id;
                    let acceptValue = this.cookieCategoriesPreferences[cookieCategory.id] === true ? "checked" : "";
                    let rejectValue = this.cookieCategoriesPreferences[cookieCategory.id] === false ? "checked" : "";

                    let acceptRadio = `<input type="radio" aria-label="${ htmlTools.escapeHtml(this.textResources.acceptLabel) }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="accept" ${acceptValue}>`;
                    let rejectRadio = `<input type="radio" aria-label="${ htmlTools.escapeHtml(this.textResources.rejectLabel) }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="reject" ${rejectValue}>`;

                    let item = `
                    <li class="${ styles.cookieListItem }">
                        <div class="${ styles.cookieListItemGroup}" role="radiogroup" aria-label="${ htmlTools.escapeHtml(cookieCategory.name) }">
                            <h3 class="${ styles.cookieListItemTitle }">${ htmlTools.escapeHtml(cookieCategory.name) }</h3>
                            <p class="${ styles.cookieListItemDescription}">${cookieCategory.descHtml}</p>
                            <div class="${ styles.cookieItemRadioBtnGroup}">
                                <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                    ${ acceptRadio}
                                    <span class="${ styles.cookieItemRadioBtnLabel}">${ htmlTools.escapeHtml(this.textResources.acceptLabel) }</span>
                                </label>
                                <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                    ${ rejectRadio}
                                    <span class="${ styles.cookieItemRadioBtnLabel}">${ htmlTools.escapeHtml(this.textResources.rejectLabel) }</span>
                                </label>
                            </div>
                        </div>
                    </li>
                    `;

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.innerHTML += item;
                }
            }
            
            // Add those event handler
            this.addPreferencesButtonsEvent();
        }
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
        let parent = document.querySelector('#' + this.containerElementOrId);
        if (parent) {
            parent.removeChild(cookieModal);
            this.nullItself();
        }
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

        if (closeModalIcon) {
            closeModalIcon.addEventListener('click', () => this.hidePreferencesDialog());
        }
        
        if (cookieItemRadioBtn && cookieItemRadioBtn.length) {
            for (let radio of cookieItemRadioBtn) {
                radio.addEventListener('click', () => {
                    // Enable "Save changes" and "Reset all" buttons
                    if (modalButtonSave) {
                        modalButtonSave.disabled = false;
                    }
                    if (modalButtonReset) {
                        modalButtonReset.disabled = false;
                    }

                    // Change cookieCategoriesPreferences
                    let categId = radio.getAttribute('name');
                    if (categId) {
                        let categValue = radio.getAttribute('value');

                        if (categValue === 'accept') {
                            this.cookieCategoriesPreferences[categId] = true;
                        }
                        else {   // categValue === 'reject'
                            this.cookieCategoriesPreferences[categId] = false;
                        }
                    }
                });
            }
        }

        if (modalButtonReset) {
            modalButtonReset.addEventListener('click', () => {
                for (let cookieCategory of this.cookieCategories) {
                    if (!cookieCategory.isUnswitchable) {
                        this.cookieCategoriesPreferences[cookieCategory.id] = this.oldCookieCategoriesPreferences[cookieCategory.id];
                    }
                }
    
                // Reset UI
                this.setRadioBtnState();
            });
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
        if (modalButtonSave) {
            modalButtonSave.addEventListener('click', () => fn());
        }
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