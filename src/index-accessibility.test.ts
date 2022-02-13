import { ConsentControl } from "./index";
import * as styles from "./styles.scss";

describe("Test accessibility when closing event occurs", () => {
    let testId: string = "app";
    let testElementString = `
    <div>
        <a href="javascript:;" id="testElementString">Click me</a>
    </div>`;

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

    test("Focus should be on more info button after we click on close button", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);
        cc.showBanner({});

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo.focus();
        cookieInfo.click();

        let closeModalIcon = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();

        expect(document.activeElement?.innerHTML).toBe("More info");
    });

    test("Call showBanner() and showPreferences(). Focus should be on anchor element after we click on close button", () => {
        document.body.innerHTML += testElementString;

        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);

        cc.showBanner({});

        let testElement = document.getElementById("testElementString")!;
        testElement.addEventListener("click", () => {
            cc.showPreferences({});
        });

        testElement.focus();
        testElement.click();

        let closeModalIcon = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();

        expect(document.activeElement?.innerHTML).toBe("Click me");
    });
});

describe("Test accessibility when radio buttons are clicked", () => {
    let testId: string = "app";

    function testRadioBtnOutline(current: HTMLInputElement, previous?: HTMLInputElement): void {
        let currentParentElement = current.parentElement!;
        
        current.focus();
        current.click();
        
        expect(currentParentElement.className.indexOf(styles.cookieItemRadioBtnCtrlOutline) !== -1).toBeTruthy();
        
        if (previous) {
            let previousParentElement = previous.parentElement!;
            expect(previousParentElement.className.indexOf(styles.cookieItemRadioBtnCtrlOutline) === -1).toBeTruthy();
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

    test("The outline of radio button appears when radio button is clicked", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);
        cc.showBanner({});

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo.click();

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));

        testRadioBtnOutline(cookieItemRadioBtn[0]);
        testRadioBtnOutline(cookieItemRadioBtn[1]);
        testRadioBtnOutline(cookieItemRadioBtn[2]);
        testRadioBtnOutline(cookieItemRadioBtn[3]);
        testRadioBtnOutline(cookieItemRadioBtn[4]);
        testRadioBtnOutline(cookieItemRadioBtn[5]);
    });

    test("The outline of previous clicked radio button is removed when another radio button is clicked", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);
        cc.showBanner({});

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo.click();

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));

        cookieItemRadioBtn[0].focus();
        cookieItemRadioBtn[0].click();

        testRadioBtnOutline(cookieItemRadioBtn[0], cookieItemRadioBtn[1]);
        testRadioBtnOutline(cookieItemRadioBtn[1], cookieItemRadioBtn[2]);
    });

    test("The outline of previous clicked radio button is removed when 'Reset all' button is clicked", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);
        cc.showBanner({});

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo.click();

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));

        cookieItemRadioBtn[0].focus();
        cookieItemRadioBtn[0].click();
        cookieItemRadioBtn[3].focus();
        cookieItemRadioBtn[3].click();

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.focus();
        resetAllBtn.click();

        expect(cookieItemRadioBtn[0].parentElement!.className.indexOf(styles.cookieItemRadioBtnCtrlOutline) === -1).toBeTruthy();
        expect(cookieItemRadioBtn[3].parentElement!.className.indexOf(styles.cookieItemRadioBtnCtrlOutline) === -1).toBeTruthy();
    });
});