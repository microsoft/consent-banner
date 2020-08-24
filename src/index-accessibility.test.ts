import { ConsentControl } from "./index";
import * as styles from "./styles.scss";

describe("Test accessibility when closing event occurs", () => {
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

    test("Focus should be on more info button after we click on close button", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);
        cc.showBanner({});

        let cookieInfo = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        let closeModalIcon = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();

        expect(document.activeElement?.innerHTML).toBe("More info");
    });

    test("Call showBanner() and showPreferences(). Focus should be on more info button after we click on close button", () => {
        let callBack = function () { return; };
        let cc = new ConsentControl("app", "en", callBack);

        cc.showBanner({});
        cc.showPreferences({});

        let closeModalIcon = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();

        expect(document.activeElement?.innerHTML).toBe("More info");
    });
});