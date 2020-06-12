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
        <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${ styles.modalContainer }" tabindex="-1">
            <button aria-label="Close dialog" class="${ styles.closeModalIcon }" tabindex="0">&#x2715;</button>
            <div role="document" class="${ styles.modalBody }">
                <form class="${ styles.modalContent }">
                    <p class="${ styles.cookieStatement }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <ol class="${ styles.cookieOrderedList }">
                    </ol>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="Save changes" class="${ styles.modalButtonSave }" disabled>${ this.textResources.saveLabel }</button>
                    <button type="button" aria-label="Reset all" class="${ styles.modalButtonReset }" disabled>${ this.textResources.resetLabel }</button>
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
            
            // insert preferencesDialogTitle to the first position
            if (this.textResources.preferencesDialogTitle) {
                let modalTitleDiv = document.createElement('div');

                let modalTitle = document.createElement('h2');
                let modalDialogTitle = document.createTextNode(this.textResources.preferencesDialogTitle);
                modalTitle.setAttribute('class', styles.modalTitle);
                modalTitle.appendChild(modalDialogTitle);

                modalTitleDiv.appendChild(modalTitle);

                let modalBody = document.getElementsByClassName(styles.modalBody)[0];
                modalBody.insertBefore(modalTitleDiv, modalBody.firstChild);
            }

            // insert cookie category 
            let i = 0;
            for (let cookieCategory of this.cookieCategories) {
                if (cookieCategory.isUnswitchable) {
                    let cookieListItem = document.createElement('li');
                    cookieListItem.setAttribute('class', styles.cookieListItem);

                    let cookieListItemTitle = document.createElement('h3');
                    let cookieCategoryTitle = document.createTextNode(cookieCategory.name);
                    cookieListItemTitle.setAttribute('class', styles.cookieListItemTitle);
                    cookieListItemTitle.appendChild(cookieCategoryTitle);

                    let cookieListItemDescription = document.createElement('p');
                    cookieListItemDescription.setAttribute('class', styles.cookieListItemDescription);
                    cookieListItemDescription.innerHTML = cookieCategory.descHtml;

                    cookieListItem.appendChild(cookieListItemTitle);
                    cookieListItem.appendChild(cookieListItemDescription);

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.appendChild(cookieListItem);
                }
                else {
                    let nameAttribute: string = cookieCategory.id + 'Cookies';
                    let acceptValue = this.cookieCategoriesPreferences[cookieCategory.id] === true ? "checked" : "";
                    let rejectValue = this.cookieCategoriesPreferences[cookieCategory.id] === false ? "checked" : "";

                    let acceptRadio = `<input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="accept" ${acceptValue}>`;
                    let rejectRadio = `<input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="${nameAttribute}" value="reject" ${rejectValue}>`;

                    let item = `
                    <div class="${ styles.cookieListItemGroup}" role="radiogroup" aria-label="${cookieCategory.name}">
                        <p class="${ styles.cookieListItemDescription}">${cookieCategory.descHtml}</p>
                        <div class="${ styles.cookieItemRadioBtnGroup}">
                            <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                ${ acceptRadio}
                                <span class="${ styles.cookieItemRadioBtnLabel}">${this.textResources.acceptLabel}</span>
                            </label>
                            <label class="${ styles.cookieItemRadioBtnCtrl}" role="radio">
                                ${ rejectRadio}
                                <span class="${ styles.cookieItemRadioBtnLabel}">${this.textResources.rejectLabel}</span>
                            </label>
                        </div>
                    </div>
                    `;

                    let cookieListItem = document.createElement('li');
                    cookieListItem.setAttribute('class', styles.cookieListItem);
                    cookieListItem.innerHTML = item;

                    let cookieOrderedList = document.getElementsByClassName(styles.cookieOrderedList)[0];
                    cookieOrderedList.appendChild(cookieListItem);

                    // Insert cookie category name
                    let cookieListItemTitle = document.createElement('h3');
                    let cookieCategoryTitle = document.createTextNode(cookieCategory.name);
                    cookieListItemTitle.setAttribute('class', styles.cookieListItemTitle);
                    cookieListItemTitle.appendChild(cookieCategoryTitle);

                    let cookieListItemGroup = document.getElementsByClassName(styles.cookieListItemGroup)[i];
                    cookieListItemGroup.insertBefore(cookieListItemTitle, cookieListItemGroup.firstChild);
                    i++;
                }
            }
        }
        
        if (banner) {
            // Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
            this.addMoreInfoButtonEvent();
        }

        // Add those event handler
        this.addPreferencesButtonsEvent();
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