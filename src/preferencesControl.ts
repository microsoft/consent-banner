import * as styles from "./styles.scss";

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/TextResources';
import { ICookieCategoriesPreferences } from './interfaces/CookieCategoriesPreferences';

export class PreferencesControl {
    cookieCategoriesPreferences: ICookieCategoriesPreferences;
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;

    private containerElement: string = '';
    private direction: string = 'ltr';

    constructor(cookieCategories: ICookieCategory[], 
                textResources: ITextResources, 
                cookieCategoriesPreferences: ICookieCategoriesPreferences, 
                containerElement: string, 
                banner: boolean,
                direction: string) {

        this.cookieCategories = cookieCategories;
        this.textResources = textResources;
        this.cookieCategoriesPreferences = cookieCategoriesPreferences;
        this.containerElement = containerElement;
        this.direction = direction;

        this.createPreferencesDialog(banner);
    }

    /**
     * Create a hidden Preferences Dialog and insert in the bottom of the container.
     * 
     * @param {boolean} banner true for banner, false for preferences dialog. 
     */
    private createPreferencesDialog(banner: boolean): void {
        let insert = document.querySelector('#' + this.containerElement);

        let cookieModalInnerHtml = `
        <div role="presentation" tabindex="-1"></div>
        <div role="dialog" aria-modal="true" aria-label="${ this.textResources.preferencesDialogTitle }" class="${ styles.modalContainer }" tabindex="-1">
            <button aria-label="${ this.textResources.preferencesDialogCloseLabel }" class="${ styles.closeModalIcon }" tabindex="0">&#x2715;</button>
            <div role="document" class="${ styles.modalBody }">
                <div>
                    <h2 class="${styles.modalTitle}"></h2>
                </div>
                
                <form class="${ styles.modalContent }">
                    <p class="${ styles.cookieStatement }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <ol class="${ styles.cookieOrderedList }">
                    </ol>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="${ this.textResources.saveLabel }" class="${ styles.modalButtonSave }" disabled></button>
                    <button type="button" aria-label="${ this.textResources.resetLabel }" class="${ styles.modalButtonReset }" disabled></button>
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
            
            // Insert preferencesDialogTitle to the first position
            if (this.textResources.preferencesDialogTitle) {
                let modalDialogTitle = document.createTextNode(this.textResources.preferencesDialogTitle);
                
                let modalTitle = document.getElementsByClassName(styles.modalTitle)[0];
                modalTitle.appendChild(modalDialogTitle);
            }

            // Insert cookie category 
            let i = 0;
            let j = 0;
            for (let cookieCategory of this.cookieCategories) {
                if (cookieCategory.isUnswitchable) {
                    let item = `
                    <li class="${ styles.cookieListItem }">
                        <h3 class="${ styles.cookieListItemTitle }"></h3>
                        <p class="${ styles.cookieListItemDescription }">${ cookieCategory.descHtml }</p>
                    </li>
                    `;

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.innerHTML += item;
                    
                    // Insert cookie category name
                    let cookieListItemTitle = document.getElementsByClassName(styles.cookieListItemTitle)[i];
                    let cookieCategoryTitle = document.createTextNode(cookieCategory.name);
                    cookieListItemTitle.appendChild(cookieCategoryTitle);
                    
                    i++;
                }
                else {
                    let nameAttribute: string = cookieCategory.id + 'Cookies';
                    let acceptValue = this.cookieCategoriesPreferences[cookieCategory.id] === true ? "checked" : "";
                    let rejectValue = this.cookieCategoriesPreferences[cookieCategory.id] === false ? "checked" : "";

                    let acceptRadio = `<input type="radio" aria-label="${ this.textResources.acceptLabel }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="accept" ${acceptValue}>`;
                    let rejectRadio = `<input type="radio" aria-label="${ this.textResources.rejectLabel }" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="reject" ${rejectValue}>`;

                    let item = `
                    <li class="${ styles.cookieListItem }">
                        <div class="${ styles.cookieListItemGroup}" role="radiogroup" aria-label="${cookieCategory.name}">
                            <h3 class="${ styles.cookieListItemTitle }"></h3>
                            <p class="${ styles.cookieListItemDescription}">${cookieCategory.descHtml}</p>
                            <div class="${ styles.cookieItemRadioBtnGroup}">
                                <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                    ${ acceptRadio}
                                    <span class="${ styles.cookieItemRadioBtnLabel}"></span>
                                </label>
                                <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                    ${ rejectRadio}
                                    <span class="${ styles.cookieItemRadioBtnLabel}"></span>
                                </label>
                            </div>
                        </div>
                    </li>
                    `;

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.innerHTML += item;
                    
                    // Insert cookie category name
                    let cookieListItemTitle = document.getElementsByClassName(styles.cookieListItemTitle)[i];
                    let cookieCategoryTitle = document.createTextNode(cookieCategory.name);
                    cookieListItemTitle.appendChild(cookieCategoryTitle);

                    i++;

                    // Insert accept label
                    if (this.textResources.acceptLabel) {
                        let acceptBtnLabelText = document.createTextNode(this.textResources.acceptLabel);

                        let acceptBtnLabel = document.getElementsByClassName(styles.cookieItemRadioBtnLabel)[j];
                        acceptBtnLabel.appendChild(acceptBtnLabelText);
                    }
                    j++;

                    // Insert reject label
                    if (this.textResources.rejectLabel) {
                        let rejectBtnLabelText = document.createTextNode(this.textResources.rejectLabel);

                        let rejectBtnLabel = document.getElementsByClassName(styles.cookieItemRadioBtnLabel)[j];
                        rejectBtnLabel.appendChild(rejectBtnLabelText);
                    }
                    j++;
                }
            }

            // Insert save changes label
            if (this.textResources.saveLabel) {
                let modalButtonSaveText = document.createTextNode(this.textResources.saveLabel);

                let modalButtonSave = document.getElementsByClassName(styles.modalButtonSave)[0];
                modalButtonSave.appendChild(modalButtonSaveText);
            }

            // Insert reset all label
            if (this.textResources.resetLabel) {
                let modalButtonResetText = document.createTextNode(this.textResources.resetLabel);
                
                let modalButtonReset = document.getElementsByClassName(styles.modalButtonReset)[0];
                modalButtonReset.appendChild(modalButtonResetText);
            }
            
            if (banner) {
                // Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
                this.addMoreInfoButtonEvent();
            }
    
            // Add those event handler
            this.addPreferencesButtonsEvent();
        }
    }

    /**
     * Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
     */
    private addMoreInfoButtonEvent(): void {
        let cookieInfo = document.getElementsByClassName(styles.bannerButton)[2];
        let modal: HTMLElement = <HTMLElement>document.getElementsByClassName(styles.cookieModal)[0];

        function popup() {
            if (modal) {
                modal.style.display = 'block';
            }
        }

        if (cookieInfo) {
            cookieInfo.addEventListener('click', popup);
        
            // Add this line in case some browsers in mobile do not like click event
            // cookieInfo.addEventListener('touchstart', popup);
        }
    }

    /**
     * Add event handlers for handling button events
     * 1. Click "X" button, preference dialog will be removed from the DOM
     * 2. Click any "accept/reject" button, "Save changes" and "Reset all" button will be enabled
     */
    private addPreferencesButtonsEvent(): void {
        let cookieModal = document.getElementsByClassName(styles.cookieModal)[0];
        let closeModalIcon = document.getElementsByClassName(styles.closeModalIcon)[0];

        let cookieItemRadioBtn: Element[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        let modalButtonSave: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(styles.modalButtonSave)[0];
        let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0];

        function close() {
            let parent = cookieModal.parentNode;
            if (parent) {
                parent.removeChild(cookieModal);
            }
        }
        
        function enableModalButtons() {
            if (modalButtonSave) {
                modalButtonSave.disabled = false;
            }
        
            if (modalButtonReset) {
                modalButtonReset.disabled = false;
            }
        }
        
        if (closeModalIcon) {
            closeModalIcon.addEventListener('click', close);
        }
        
        if (cookieItemRadioBtn && cookieItemRadioBtn.length) {
            for (let radio of cookieItemRadioBtn) {
                radio.addEventListener('click', enableModalButtons);
            }
        }
    }
}