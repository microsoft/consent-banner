import { ConsentControl } from "./index";
import * as styles from "./styles.scss";

describe("Test radio buttons and 'Reset all' button", () => {
    let testId: string = "app";

    function testRadioBtnState(radioButtons: String[]): void {
        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i] === "checked") {
                expect(cookieItemRadioBtn[i].checked).toBeTruthy();
            }
            else {
                expect(cookieItemRadioBtn[i].checked).toBeFalsy();
            }
        }
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
    
    test("Click 'More info' button and then click radio buttons. All cookieCategoriePreferences will be reset to undefined when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        testRadioBtnState(["unchecked", "checked", "checked", "unchecked", "checked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": false, "c2": true, "c3": true });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();
        
        testRadioBtnState(["unchecked", "unchecked", "unchecked", "unchecked", "unchecked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": undefined, "c2": undefined, "c3": undefined });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });

    test("Call showPreferences(...) and then click radio buttons. All cookieCategoriePreferences will be reset to undefined when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        testRadioBtnState(["unchecked", "checked", "checked", "unchecked", "checked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": false, "c2": true, "c3": true });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();
        
        testRadioBtnState(["unchecked", "unchecked", "unchecked", "unchecked", "unchecked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": undefined, "c2": undefined, "c3": undefined });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });

    test("Call showPreferences(...) with unswitchable id and click radio buttons. All cookiePreferences will be reset to undefined when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c0": true, "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        testRadioBtnState(["unchecked", "checked", "checked", "unchecked", "checked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c0": true, "c1": false, "c2": true, "c3": true });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();
        
        testRadioBtnState(["unchecked", "unchecked", "unchecked", "unchecked", "unchecked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c0": true, "c1": undefined, "c2": undefined, "c3": undefined });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });

    test("Click 'More info' button and then click radio buttons. cookieCategoriePreferences will be set", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[0].click();
        cookieItemRadioBtn[3].click();
        cookieItemRadioBtn[5].click();

        testRadioBtnState(["checked", "unchecked", "unchecked", "checked", "unchecked", "checked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": true, "c2": false, "c3": false });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
        
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        testRadioBtnState(["unchecked", "checked", "checked", "unchecked", "checked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": false, "c2": true, "c3": true });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });

    test("Call showPreferences(...) and then click radio buttons. cookieCategoriePreferences will be set", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[0].click();
        cookieItemRadioBtn[3].click();
        cookieItemRadioBtn[5].click();

        testRadioBtnState(["checked", "unchecked", "unchecked", "checked", "unchecked", "checked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": true, "c2": false, "c3": false });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        testRadioBtnState(["unchecked", "checked", "checked", "unchecked", "checked", "unchecked"]);

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual({ "c1": false, "c2": true, "c3": true });
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });
});

describe("Test 'Save changes' button", () => {
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

    test("Click 'More info' button, click any unchecked radio buttons, and close the dialog. Open dialog and 'Save changes' button will be enabled", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c2": true };
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[4].click();

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();

        cookieInfo.click();
        expect(cookieCategoriePreferences).toEqual({ "c1": false, "c2": true, "c3": true });
        
        let saveChangesBtn = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0];
        expect(saveChangesBtn.disabled).toBeFalsy();
    });
    
    test("Call showPreferences(...), click any unchecked radio buttons, and close the dialog. Open dialog and 'Save changes' button will be enabled", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c2": undefined, "c3": false };
        cc.showPreferences(cookieCategoriePreferences);

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[0].click();
        cookieItemRadioBtn[3].click();

        cc.hidePreferences();

        cc.showPreferences(cookieCategoriePreferences);
        expect(cookieCategoriePreferences).toEqual({ "c1": true, "c2": false, "c3": false });

        let saveChangesBtn = <HTMLInputElement> document.getElementsByClassName(styles.modalButtonSave)[0];
        expect(saveChangesBtn.disabled).toBeFalsy();
    });
});

describe("Test 'Accept all' button", () => {
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
    
    test("Click 'Accept all' button and all cookieCategoriePreferences will be set to 'true'", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c2": undefined, "c3": false };
        cc.showBanner(cookieCategoriePreferences);

        let acceptAllBtn = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[0];
        acceptAllBtn.click();

        for (let cookieCategory of cc.cookieCategories) {
            if (!cookieCategory.isUnswitchable) {
                if (cc.preferencesCtrl) {
                    let id = cookieCategory.id;
                    expect(cc.preferencesCtrl.cookieCategoriesPreferences[id]).toBeTruthy();
                }
                else {
                    throw new Error("Preference dialog not found error");
                }
            }
        }
    });

    test("Initialize cookieCategoriesPreferences with unswitchable id and click 'Accept all' button. All cookieCategoriePreferences will be set to 'true'", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c0": true, "c2": undefined, "c3": false };
        cc.showBanner(cookieCategoriePreferences);

        let acceptAllBtn = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[0];
        acceptAllBtn.click();

        for (let cookieCategory of cc.cookieCategories) {
            if (!cookieCategory.isUnswitchable) {
                if (cc.preferencesCtrl) {
                    let id = cookieCategory.id;
                    expect(cc.preferencesCtrl.cookieCategoriesPreferences[id]).toBeTruthy();
                }
                else {
                    throw new Error("Preference dialog not found error");
                }
            }
        }
    });
});