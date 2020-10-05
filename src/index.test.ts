import { ConsentControl } from "./index";
import * as rawStyles from "./styles.scss";
import { PreferencesControl } from "./preferencesControl";

import { ICookieCategoriesPreferences } from "./interfaces/CookieCategoriesPreferences";

const styles = rawStyles;

function testShowingBanner(dir: string): void {
    let bannerBody = document.getElementsByClassName(styles.bannerBody);
    expect(bannerBody).toBeTruthy();
    expect(bannerBody.length).toBe(1);
    expect(bannerBody[0].getAttribute("dir")).toBe(dir);

    expect(document.getElementsByClassName(styles.bannerInform).length).toBe(1);
    expect(document.getElementsByClassName(styles.infoIcon).length).toBe(1);
    expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(1);

    expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(1);
    expect(document.getElementsByClassName(styles.bannerButton).length).toBe(2);
}

function testRadioBtnState(cc: ConsentControl, cookieCategoriePreferences: ICookieCategoriesPreferences): number {
    // test: 
    // c1: true => accept radio button should be checked
    // c2: false => reject radio button should be checked
    let i = 0;
    for (let cookieCategory of cc.cookieCategories) {
        if (!cookieCategory.isUnswitchable) {
            if (cookieCategoriePreferences.hasOwnProperty(cookieCategory.id)) {
                if (cookieCategoriePreferences[cookieCategory.id]) {
                    let acceptRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i * 2];
                    expect(acceptRadio.checked).toBeTruthy();
                }
                else if (cookieCategoriePreferences[cookieCategory.id] === false) {
                    let rejectRadio: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i * 2 + 1];
                    expect(rejectRadio.checked).toBeTruthy();
                }
            }
            i++;
        }
    }

    return i;
}

function testShowingPreferences(cc: ConsentControl, cookieCategoriePreferences: ICookieCategoriesPreferences): void {
    expect(document.getElementsByClassName(styles.cookieModal)).toBeTruthy();

    let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
    expect(cookieModal.getAttribute("dir")).toBe(cc.getDirection());

    expect(document.getElementsByClassName(styles.modalContainer).length).toBe(1);
    expect(document.getElementsByClassName(styles.closeModalIcon).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalBody).length).toBe(1);

    expect(document.getElementsByClassName(styles.modalTitle).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalContent).length).toBe(1);

    expect(document.getElementsByClassName(styles.cookieStatement).length).toBe(1);
    expect(document.getElementsByClassName(styles.cookieOrderedList).length).toBe(1);

    expect(document.getElementsByClassName(styles.cookieListItem).length).toBe(cc.cookieCategories.length);
    expect(document.getElementsByClassName(styles.cookieListItemTitle).length).toBe(cc.cookieCategories.length);
    expect(document.getElementsByClassName(styles.cookieListItemDescription).length).toBe(cc.cookieCategories.length);

    let i = testRadioBtnState(cc, cookieCategoriePreferences);

    expect(document.getElementsByClassName(styles.cookieListItemGroup).length).toBe(i);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnGroup).length).toBe(i);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnCtrl).length).toBe(i * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtn).length).toBe(i * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnLabel).length).toBe(i * 2);

    expect(document.getElementsByClassName(styles.modalButtonGroup).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonSave).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonReset).length).toBe(1);
}

function testModalSaveButton(i: number, defined: number[]): void {
    let cookieItemRadioBtn: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
    cookieItemRadioBtn.click();

    if (defined.includes(i)) {
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0]).disabled).toBeTruthy();
    }
    else {
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0]).disabled).toBeFalsy();
    }
    expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();
}

function testRemovingPreferences(): void {
    let cookieModal = document.getElementsByClassName(styles.cookieModal);
    expect(cookieModal.length).toBe(0);

    expect(document.getElementsByClassName(styles.modalContainer).length).toBe(0);
    expect(document.getElementsByClassName(styles.closeModalIcon).length).toBe(0);
    expect(document.getElementsByClassName(styles.modalBody).length).toBe(0);

    expect(document.getElementsByClassName(styles.modalTitle).length).toBe(0);
    expect(document.getElementsByClassName(styles.modalContent).length).toBe(0);

    expect(document.getElementsByClassName(styles.cookieStatement).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieOrderedList).length).toBe(0);

    expect(document.getElementsByClassName(styles.cookieListItem).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieListItemTitle).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieListItemDescription).length).toBe(0);

    expect(document.getElementsByClassName(styles.cookieListItemGroup).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnGroup).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnCtrl).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtn).length).toBe(0);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnLabel).length).toBe(0);

    expect(document.getElementsByClassName(styles.modalButtonGroup).length).toBe(0);
    expect(document.getElementsByClassName(styles.modalButtonSave).length).toBe(0);
    expect(document.getElementsByClassName(styles.modalButtonReset).length).toBe(0);
}

describe("Test show and hide banner", () => {
    let testId: string = "app";
    let testElementString = `
        <div class="${styles.bannerBody}" dir=ltr role="alert">
            <div class="${styles.bannerInform}">
                <span class="${styles.infoIcon}" aria-label="Information message"></span> <!--  used for icon  -->
                <p class="${styles.bannerInformBody}">We use </p>
            </div>

            <div class="${styles.buttonGroup}">
                <button type="button" class="${styles.bannerButton}">Accept all</button>
                <button type="button" class="${styles.bannerButton}">More info</button>
            </div>
        </div>

        <!-- The Modal -->
        <div class="${styles.cookieModal}" dir=ltr>
            <div role="presentation" tabindex="-1"></div>
            <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${styles.modalContainer}" tabindex="-1">
                <button aria-label="Close dialog" class="${styles.closeModalIcon}" tabindex="0">&#x2715;</button>
                <div role="document" class="${styles.modalBody}">
                    <div>
                        <h2 class="${styles.modalTitle}">Manage cookie preferences</h2>
                    </div>
                
                    <form class="${styles.modalContent}">
                        <p class="${styles.cookieStatement}">Most Microsoft sites use cookies</p>

                        <ol class="${styles.cookieOrderedList}">
                            <li class="${styles.cookieListItem}">
                                <h3 class="${styles.cookieListItemTitle}">1. Essential cookies</h3>
                                <p class="${styles.cookieListItemDescription}">We use essential cookies</p>
                            </li>
                
                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Performance cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">2. Performance</h3>
                                    <p class="${styles.cookieListItemDescription}">We use performance</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="accept">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="reject">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>

                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Advertising cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">3. Advertising</h3>
                                    <p class="${styles.cookieListItemDescription}">We use advertising</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="accept" checked>
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="reject">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>

                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Targeting cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">4. Targeting</h3>
                                    <p class="${styles.cookieListItemDescription}">We use targeting</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="accept">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="reject" checked>
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </form>
                
                    <div class="${styles.modalButtonGroup}">
                        <button type="button" aria-label="Save changes" class="${styles.modalButtonSave}" disabled>Save changes</button>
                        <button type="button" aria-label="Reset all" class="${styles.modalButtonReset}" disabled>Reset all</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    function testRemovingBanner(): void {
        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody.length).toBe(0);
        
        expect(document.getElementsByClassName(styles.bannerInform).length).toBe(0);
        expect(document.getElementsByClassName(styles.infoIcon).length).toBe(0);
        expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(0);

        expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(0);
        expect(document.getElementsByClassName(styles.bannerButton).length).toBe(0);
    }

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        document.body.appendChild(newDiv);
    });

    afterEach(() => {
        let child = document.getElementById(testId);
        if (child) {
            let parent = child.parentNode;

            if (parent) {
                parent.removeChild(child);
            }
            else {
                throw new Error("Parent not found error");
            }
        }
    });
    
    test("Pass string in constructor, and banner will be inserted when showBanner(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        cc.showBanner({ "c1": true, "c2": false,"c3": undefined });

        testShowingBanner(cc.getDirection());
    });

    test("Pass HTMLElement in constructor, and banner will be inserted when showBanner(...) is called", () => {
        let insert = document.getElementById(testId);

        if (insert) {
            let callBack = function() { return; };
            let cc = new ConsentControl(insert, "en", callBack);
            cc.showBanner({ "c1": true, "c2": false,"c3": undefined });
            
            testShowingBanner(cc.getDirection());
        }
    });

    test("Call showBanner(...) many times, only keep last one", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        cc.showBanner({ "c1": true, "c2": false,"c3": undefined });
        cc.showBanner({ "c1": false, "c2": true,"c3": undefined });
        cc.showBanner({ "c1": true, "c2": false,"c3": false });

        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();
        
        testShowingBanner(cc.getDirection());
        testShowingPreferences(cc, { "c1": true, "c2": false,"c3": false });
    });

    test("Preferences dialog will appear when 'More info' button is clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        testShowingPreferences(cc, cookieCategoriePreferences);
    });

    test("'X' button is clicked, and then click 'More info' button. Preferences dialog should appear", () => {
        let callBack = function() { return; };
        let cookieCategoriePreferences = { "c1": true, "c2": false,"c3": undefined };
        
        let cc = new ConsentControl(testId, "en", callBack);
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();
        
        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        cookieInfo.click();

        testShowingPreferences(cc, cookieCategoriePreferences);

        closeModalIcon.click();
        cookieInfo.click();
        testShowingPreferences(cc, cookieCategoriePreferences);
    });

    test("Banner will be removed from DOM when hideBanner() is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        cc.hideBanner();
        
        testRemovingBanner()
    });

    test("Preferences dialog will be removed from DOM when hideBanner() is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        // We only want to test hideBanner() function, so we create HTML elements and preferencesCtrl.
        let cookieCategoriePreferences = { "c1": undefined, "c2": true, "c3": false };
        cc.preferencesCtrl = new PreferencesControl(cc.cookieCategories, 
                                                    cc.textResources, 
                                                    cookieCategoriePreferences, 
                                                    insert, 
                                                    "ltr", 
                                                    { changed: false }, 
                                                    () => { cc.preferencesCtrl = null; });

        cc.hideBanner();

        expect(cc.preferencesCtrl).toBeNull();
        testRemovingPreferences();
    });
});

describe("Test show and hide preferences dialog", () => {
    let testId: string = "app";
    let testElementBanner = `
        <div class="${styles.bannerBody}" dir=ltr role="alert">
            <div class="${styles.bannerInform}">
                <span class="${styles.infoIcon}" aria-label="Information message"></span> <!--  used for icon  -->
                <p class="${styles.bannerInformBody}">We use </p>
            </div>

            <div class="${styles.buttonGroup}">
                <button type="button" class="${styles.bannerButton}">Accept all</button>
                <button type="button" class="${styles.bannerButton}">More info</button>
            </div>
        </div>
    `;
    let testElementString = `
        <!-- The Modal -->
        <div class="${styles.cookieModal}" dir=ltr>
            <div role="presentation" tabindex="-1"></div>
            <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${styles.modalContainer}" tabindex="-1">
                <button aria-label="Close dialog" class="${styles.closeModalIcon}" tabindex="0">&#x2715;</button>
                <div role="document" class="${styles.modalBody}">
                    <div>
                        <h2 class="${styles.modalTitle}">Manage cookie preferences</h2>
                    </div>
                
                    <form class="${styles.modalContent}">
                        <p class="${styles.cookieStatement}">Most Microsoft sites use cookies</p>

                        <ol class="${styles.cookieOrderedList}">
                            <li class="${styles.cookieListItem}">
                                <h3 class="${styles.cookieListItemTitle}">1. Essential cookies</h3>
                                <p class="${styles.cookieListItemDescription}">We use essential cookies</p>
                            </li>
                
                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Performance cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">2. Performance</h3>
                                    <p class="${styles.cookieListItemDescription}">We use performance</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="accept">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="performanceCookies" value="reject">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>

                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Advertising cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">3. Advertising</h3>
                                    <p class="${styles.cookieListItemDescription}">We use advertising</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="accept" checked>
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="advertisingCookies" value="reject">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>

                            <li class="${styles.cookieListItem}">
                                <div class="${styles.cookieListItemGroup}" role="radiogroup" aria-label="Targeting cookies setting">
                                    <h3 class="${styles.cookieListItemTitle}">4. Targeting</h3>
                                    <p class="${styles.cookieListItemDescription}">We use targeting</p>
                                    <div class="${styles.cookieItemRadioBtnGroup}">
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Accept" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="accept">
                                            <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                                        </label>
                                        <label class="${styles.cookieItemRadioBtnCtrl}" role="radio">
                                            <input type="radio" aria-label="Reject" class="${styles.cookieItemRadioBtn}" name="targetingCookies" value="reject" checked>
                                            <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </form>
                
                    <div class="${styles.modalButtonGroup}">
                        <button type="button" aria-label="Save changes" class="${styles.modalButtonSave}" disabled>Save changes</button>
                        <button type="button" aria-label="Reset all" class="${styles.modalButtonReset}" disabled>Reset all</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        newDiv.innerHTML = testElementBanner;

        document.body.appendChild(newDiv);
    });

    afterEach(() => {
        let child = document.getElementById(testId);
        if (child) {
            let parent = child.parentNode;

            if (parent) {
                parent.removeChild(child);
            }
            else {
                throw new Error("Parent not found error");
            }
        }
    });
    
    test("Pass string in constructor, and preferences dialog will be inserted when showPreferences(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
        cc.showPreferences(cookieCategoriePreferences);

        testShowingBanner("ltr");
        testShowingPreferences(cc, cookieCategoriePreferences);
    });

    test("Pass HTMLElement in constructor, and preferences dialog will be inserted when showPreferences(...) is called", () => {
        let callBack = function() { return; };
        let insert = document.getElementById(testId);

        if (insert) {
            let cc = new ConsentControl(insert, "en", callBack);
    
            let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
            cc.showPreferences(cookieCategoriePreferences);
    
            testShowingBanner("ltr");
            testShowingPreferences(cc, cookieCategoriePreferences);
        }
    });

    test("If switchable id is not in cookieCategoriePreferences, the category in preferences dialog will not be set when showPreferences(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c1": true, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        testShowingBanner("ltr");
        testShowingPreferences(cc, cookieCategoriePreferences);
    });

    test("'Reset all' and 'Save changes' will be enabled when any radio buttons are clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        let cookieItemRadioBtnLength = document.getElementsByClassName(styles.cookieItemRadioBtn).length;
        for (let i = 0; i < cookieItemRadioBtnLength; i++) {
            let container = document.getElementById(testId);
            if (container) {
                container.innerHTML = "";

                let otherCallBack = function() { return; };
                let otherCc = new ConsentControl(testId, "en", otherCallBack);

                let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
                let cookiePreferencesBtnArray = [0, 3];
                
                otherCc.showPreferences(cookieCategoriePreferences);
                testModalSaveButton(i, cookiePreferencesBtnArray);
            }
            else {
                throw new Error("Container not found error");
            }
        }
    });

    test("'Reset all' will be enabled when any cookieCategoriesPreferences is defined", () => {
        let callBack = function() { return; };

        let cc = new ConsentControl(testId, "en", callBack);
        let cookieCategoriesPreferences: ICookieCategoriesPreferences = { };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeTruthy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c1": true };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c1": false };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c2": true };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c2": false };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c3": true };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();

        cc = new ConsentControl(testId, "en", callBack);
        cookieCategoriesPreferences = { "c3": false };
        cc.showPreferences(cookieCategoriesPreferences);
        expect((<HTMLInputElement> document.getElementsByClassName(styles.modalButtonReset)[0]).disabled).toBeFalsy();

        cc.hidePreferences();
    });

    test("Preferences dialog will be removed from DOM when 'X' button is clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        testShowingBanner("ltr");
        expect(cc.preferencesCtrl).toBeNull();
        testRemovingPreferences();
    });

    test("Preferences dialog will be removed from DOM when hidePreferences() is called", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementBanner + testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        // We only want to test hidePreferences() function, so we create HTML elements and preferencesCtrl.
        let cookieCategoriePreferences = { "c1": undefined, "c2": true, "c3": false };
        cc.preferencesCtrl = new PreferencesControl(cc.cookieCategories, 
                                                    cc.textResources, 
                                                    cookieCategoriePreferences, 
                                                    insert, 
                                                    "ltr", 
                                                    { changed: false }, 
                                                    () => { cc.preferencesCtrl = null; });
        
        cc.hidePreferences();

        testShowingBanner("ltr");
        expect(cc.preferencesCtrl).toBeNull();
        testRemovingPreferences();
    });
});

describe("Test containerElement", () => {
    let testId: string = "app";
    let testId2: string = "app2";

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        document.body.appendChild(newDiv);

        let newDiv2 = document.createElement("div");
        newDiv2.setAttribute("id", testId2);
        document.body.appendChild(newDiv2);
    });

    afterEach(() => {
        let child = document.getElementById(testId);
        if (child) {
            let parent = child.parentNode;

            if (parent) {
                parent.removeChild(child);
            }
            else {
                throw new Error("Parent 1 not found error");
            }
        }

        let child2 = document.getElementById(testId2);
        if (child2) {
            let parent2 = child2.parentNode;

            if (parent2) {
                parent2.removeChild(child2);
            }
            else {
                throw new Error("Parent 2 not found error");
            }
        }
    });

    test("Use setContainerElement(containerElement: string) to change container", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        cc.setContainerElement(testId2);

        expect(cc.getContainerElement()).toBeTruthy();
        expect(cc.getContainerElement()?.nodeName).toBe("DIV");
        expect(cc.getContainerElement()?.getAttribute("id")).toBe(testId2);
    });

    test("Use setContainerElement(containerElement: HTMLElement) to change container", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let container = document.getElementById(testId2);
        if (container) {
            cc.setContainerElement(container);
    
            expect(cc.getContainerElement()).toBeTruthy();
            expect(cc.getContainerElement()?.nodeName).toBe("DIV");
            expect(cc.getContainerElement()?.getAttribute("id")).toBe(testId2);
        }
        else {
            throw new Error("Container not found error");
        }
    });

    test("Use invalid id in setContainerElement(containerElement: string) to change container", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        expect(() => cc.setContainerElement("testId")).toThrowError('Container not found error');
    });

    test("Use empty element in setContainerElement(containerElement) to change container", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        expect(() => cc.setContainerElement("")).toThrowError('Container not found error');
        expect(() => cc.setContainerElement(<HTMLElement> document.getElementById("test"))).toThrowError('Container not found error');
    });
});

describe("Test onPreferencesChanged(...)", () => {
    let testId: string = "app";

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        document.body.appendChild(newDiv);
    });

    afterEach(() => {
        let child = document.getElementById(testId);
        if (child) {
            let parent = child.parentNode;

            if (parent) {
                parent.removeChild(child);
            }
            else {
                throw new Error("Parent not found error");
            }
        }
    });

    test("Call showPreferences(...), click any unchecked radio buttons, and click 'Save changes' button. 'onPreferencesChanged(...)' should be called.", () => {
        let callBack = jest.fn();
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c2": undefined, "c3": false };
        cc.showPreferences(cookieCategoriePreferences);

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[4].click();
        
        let saveChangesBtn = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0];
        saveChangesBtn.click();

        expect(callBack).toHaveBeenCalled();
    });
});

describe("Test setRadioBtnState()", () => {
    let testId: string = "app";

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        document.body.appendChild(newDiv);
    });

    afterEach(() => {
        let child = document.getElementById(testId);
        if (child) {
            let parent = child.parentNode;

            if (parent) {
                parent.removeChild(child);
            }
            else {
                throw new Error("Parent not found error");
            }
        }
    });
    
    test("setRadioBtnState() will set radio buttons state according to cookieCategoriesPreferences.", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences: ICookieCategoriesPreferences = { "c2": undefined, "c3": false };
        cc.showPreferences(cookieCategoriePreferences);

        cc.preferencesCtrl!.cookieCategoriesPreferences["c1"] = false;
        cc.preferencesCtrl!.cookieCategoriesPreferences["c2"] = true;
        cc.preferencesCtrl!.cookieCategoriesPreferences["c3"] = undefined;

        cc.preferencesCtrl?.setRadioBtnState();

        testRadioBtnState(cc, cc.preferencesCtrl!.cookieCategoriesPreferences);
    });
});