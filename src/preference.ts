import * as styles from "./styles.scss";

import { ICookieCategory } from './interfaces/CookieCategories';
import { ITextResources } from './interfaces/TextResources';

export class PreferenceControl {
    cookieCategoriePreferences: any;
    cookieCategories: ICookieCategory[];
    textResources: ITextResources;

    constructor(cookieCategories: ICookieCategory[], textResources: ITextResources, cookieCategoriePreferences?: any) {
        this.cookieCategories = cookieCategories;
        this.textResources = textResources;
        this.cookieCategoriePreferences = cookieCategoriePreferences;
    }

    /**
     * Create and return HTML inner string for preference dialog
     */
    public preferenceHTMLString(): string {
        let cookieModalHead = `
        <div role="presentation" tabindex="-1"></div>
        <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${ styles.modalContainer }" tabindex="-1">
            <button aria-label="Close dialog" class="${ styles.closeModalIcon }" tabindex="0">&#x2715;</button>
            <div role="document" class="${ styles.modalBody }">
                <div>
                    <h2 class="${ styles.modalTitle }">${ this.textResources.preferencesDialogTitle }</h2>
                </div>
                
                <form class="${ styles.modalContent }">
                    <p class="${ styles.cookieStatement }">
                        ${ this.textResources.preferencesDialogDescHtml }
                    </p>

                    <ol class="${ styles.cookieOrderedList }">
        `;

        let cookieModalBody = '';
        for (let cookieCategory of this.cookieCategories) {
            if (cookieCategory.isUnswitchable) {
                let item = `
                    <li class="${ styles.cookieListItem }">
                        <h3 class="${ styles.cookieListItemTitle }">${ cookieCategory.name }</h3>
                        <p class="${ styles.cookieListItemDescription }">${ cookieCategory.descHtml }</p>
                    </li>
                `;
                cookieModalBody = cookieModalBody + item;
            }
            else {
                let nameArray: string[] = cookieCategory.name.split(' ');
                let nameAttribute: string = nameArray[0] + 'Cookies';

                let acceptRadio = `<input type="radio" aria-label="Accept" class="${ styles.cookieItemRadioBtn }" name="${ nameAttribute }" value="accept"`;
                let rejectRadio = `<input type="radio" aria-label="Reject" class="${ styles.cookieItemRadioBtn }" name="${ nameAttribute }" value="reject"`;
                if (this.cookieCategoriePreferences.hasOwnProperty(cookieCategory.id)) {
                    if (this.cookieCategoriePreferences[cookieCategory.id]) {
                        acceptRadio = acceptRadio + ' checked' + '>';
                        rejectRadio = rejectRadio + '>';
                    }
                    else if (this.cookieCategoriePreferences[cookieCategory.id] === false) {
                        acceptRadio = acceptRadio + '>';
                        rejectRadio = rejectRadio + ' checked' + '>';
                    }
                    else {
                        acceptRadio = acceptRadio + '>';
                        rejectRadio = rejectRadio + '>';
                    }
                }
                else {
                    acceptRadio = acceptRadio + '>';
                    rejectRadio = rejectRadio + '>';
                }

                let item = `
                    <li class="${ styles.cookieListItem }">
                        <div class="${ styles.cookieListItemGroup }" role="radiogroup" aria-label="${ cookieCategory.name } cookies setting">
                            <h3 class="${ styles.cookieListItemTitle }">${ cookieCategory.name }</h3>
                            <p class="${ styles.cookieListItemDescription }">${ cookieCategory.descHtml }</p>
                            <div class="${ styles.cookieItemRadioBtnGroup }">
                                <label class="${ styles.cookieItemRadioBtnCtrl }" role="radio">
                                    ${ acceptRadio }
                                    <span class="${ styles.cookieItemRadioBtnLabel }">${ this.textResources.acceptLabel }</span>
                                </label>
                                <label class="${ styles.cookieItemRadioBtnCtrl }" role="radio">
                                    ${ rejectRadio }
                                    <span class="${ styles.cookieItemRadioBtnLabel }">${ this.textResources.rejectLabel }</span>
                                </label>
                            </div>
                        </div>
                    </li>
                `;
                cookieModalBody = cookieModalBody + item;
            }
        }
        
        let cookieModalFoot = `
                    </ol>
                </form>
                
                <div class="${ styles.modalButtonGroup }">
                    <button type="button" aria-label="Save changes" class="${ styles.modalButtonSave }" disabled>${ this.textResources.saveLabel }</button>
                    <button type="button" aria-label="Reset all" class="${ styles.modalButtonReset }" disabled>${ this.textResources.resetLabel }</button>
                </div>
            </div>
        </div>
        `;

        let cookieModalInnerHtml = cookieModalHead + cookieModalBody + cookieModalFoot;
        return cookieModalInnerHtml;
    }

    /**
     * Add event handler to show preferences dialog (from hidden state) when "More info" button is clicked
     */
    public moreInfoButtonEvent(): void {
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
    public preferenceButtonEvent(): void {
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