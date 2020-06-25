import * as ind from "./index";
import * as styles from "./styles.scss";
import { PreferencesControl } from './preferencesControl';

import { ICookieCategoriesPreferences } from "./interfaces/CookieCategoriesPreferences";

describe("Test constructor", () => {
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

    test("CookieCategories and textResources full provided", () => {
        let cookieCategories = [
            {
                id: "cookie1",
                name: "Test cookie1",
                descHtml: "This is for test cookie1"
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                descHtml: "This is for test cookie2 with 4th property",
                isUnswitchable: true
            }
        ];

        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, cookieCategories, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test("No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here</a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here</a>."
            },
            {
                id: "c2",
                name: "3. Advertising/Marketing",
                descHtml: "Blah"
            },
            {
                id: "c3",
                name: "4. Targeting/personalization",
                descHtml: "Blah"
            }
        ]);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "Accept all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all"
        });
    });

    test("No cookieCategories, textResources full provided", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here</a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here</a>."
            },
            {
                id: "c2",
                name: "3. Advertising/Marketing",
                descHtml: "Blah"
            },
            {
                id: "c3",
                name: "4. Targeting/personalization",
                descHtml: "Blah"
            }
        ]);
        expect(cc.textResources).toEqual(textResources);
    });

    test("CookieCategories provided, no textResources", () => {
        let cookieCategories = [
            {
                id: "cookie1",
                name: "Test cookie1",
                descHtml: "This is for test cookie1"
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                descHtml: "This is for test cookie2 with 4th property",
                isUnswitchable: true
            }
        ];

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, cookieCategories);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "Accept all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all"
        });
    });

    test("No cookieCategories, textResources without bannerMessageHtml", () => {
        let textResources = {
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here</a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here</a>."
            },
            {
                id: "c2",
                name: "3. Advertising/Marketing",
                descHtml: "Blah"
            },
            {
                id: "c3",
                name: "4. Targeting/personalization",
                descHtml: "Blah"
            }
        ]);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without acceptAllLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "Accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without moreInfoLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogCloseLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogTitle", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogDescHtml", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without acceptLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "Accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without rejectLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without saveLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "Save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without resetLabel", () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "Reset all"
        });
    });

    test("No cookieCategories, textResources without bannerMessageHtml, acceptAllLabel", () => {
        let textResources = {
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here</a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here</a>."
            },
            {
                id: "c2",
                name: "3. Advertising/Marketing",
                descHtml: "Blah"
            },
            {
                id: "c3",
                name: "4. Targeting/personalization",
                descHtml: "Blah"
            }
        ]);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "Accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without bannerMessageHtml, rejectLabel", () => {
        let textResources = {
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack, undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });
});

describe("Test language direction", () => {
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

    test("Language is ms (ltr). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ms", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ms (ltr). Set direction to rtl. No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ms", callBack);
        cc.setDirection("rtl");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is he (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "he", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ps (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ps", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ur (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ur", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is fa (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "fa", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is pa (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "pa", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is sd (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "sd", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is tk (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "tk", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ug (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ug", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is yi (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "yi", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is syr (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "syr", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ks-arab (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ks-arab", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is en-US (ltr). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en-US", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ar-SA (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ar-SA", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });
});

describe("Test html and body direction", () => {
    let testId: string = "app";

    let htmlDir: string | null;
    let bodyDir: string | null;

    beforeAll(() => {
        htmlDir = document.getElementsByTagName("html")[0].getAttribute("dir");
        bodyDir = document.getElementsByTagName("body")[0].getAttribute("dir");
    });

    beforeEach(() => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", testId);
        document.body.appendChild(newDiv);
    });

    afterEach(() => {
        if (htmlDir) {
            document.getElementsByTagName("html")[0].setAttribute("dir", htmlDir);
        }
        else {
            document.getElementsByTagName("html")[0].removeAttribute("dir");
        }

        if (bodyDir) {
            document.getElementsByTagName("body")[0].setAttribute("dir", bodyDir);
        }
        else {
            document.getElementsByTagName("body")[0].removeAttribute("dir");
        }

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

    test("Language is en (ltr). Html dir is rtl. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Html dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is en (ltr). Body dir is rtl. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "rtl");

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Body dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "ltr");

        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });
});

function testShowingPreferences(cc: ind.ConsentControl, cookieCategoriePreferences: ICookieCategoriesPreferences, display: string): void {
    expect(document.getElementsByClassName(styles.cookieModal)).toBeTruthy();

    let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
    expect(cookieModal.getAttribute("dir")).toBe(cc.getDirection());
    expect(cookieModal.style.display).toBe(display);

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

    expect(document.getElementsByClassName(styles.cookieListItemGroup).length).toBe(i);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnGroup).length).toBe(i);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnCtrl).length).toBe(i * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtn).length).toBe(i * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnLabel).length).toBe(i * 2);

    expect(document.getElementsByClassName(styles.modalButtonGroup).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonSave).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonReset).length).toBe(1);
}

function testModalButton(functionName: string, testId: string, i: number): void {
    let callBack = function() { return; };
    let cc = new ind.ConsentControl(testId, "en", callBack);
    let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };

    if (functionName === "showBanner") {
        cc.showBanner(cookieCategoriePreferences);
    }
    else {   // showPreferences
        cc.showPreferences(cookieCategoriePreferences);
    }

    let cookieItemRadioBtn: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieItemRadioBtn)[i];
    cookieItemRadioBtn.click();

    expect(document.getElementsByClassName(styles.modalButtonSave)[0].getAttribute("disabled")).toBeFalsy();
    expect(document.getElementsByClassName(styles.modalButtonReset)[0].getAttribute("disabled")).toBeFalsy();
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
        let cc = new ind.ConsentControl(testId, "en", callBack);
        cc.showBanner({ "c1": true, "c2": false,"c3": undefined });
        
        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody).toBeTruthy();
        expect(bannerBody[0].getAttribute("dir")).toBe(cc.getDirection());

        expect(document.getElementsByClassName(styles.bannerInform).length).toBe(1);
        expect(document.getElementsByClassName(styles.infoIcon).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(1);

        expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerButton).length).toBe(2);
    });

    test("Pass HTMLElement in constructor, and banner will be inserted when showBanner(...) is called", () => {
        let callBack = function() { return; };
        let insert = document.getElementById(testId);
        
        if (insert) {
            let cc = new ind.ConsentControl(insert, "en", callBack);
            cc.showBanner({ "c1": true, "c2": false,"c3": undefined });
            
            let bannerBody = document.getElementsByClassName(styles.bannerBody);
            expect(bannerBody).toBeTruthy();
            expect(bannerBody[0].getAttribute("dir")).toBe(cc.getDirection());
    
            expect(document.getElementsByClassName(styles.bannerInform).length).toBe(1);
            expect(document.getElementsByClassName(styles.infoIcon).length).toBe(1);
            expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(1);
    
            expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(1);
            expect(document.getElementsByClassName(styles.bannerButton).length).toBe(2);
        }
    });

    test("Pass string in constructor, and preferences dialog will be inserted when showBanner(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
        cc.showBanner(cookieCategoriePreferences);

        testShowingPreferences(cc, cookieCategoriePreferences, "");
    });

    test("Pass HTMLElement in constructor, and preferences dialog will be inserted when showBanner(...) is called", () => {
        let callBack = function() { return; };
        let insert = document.getElementById(testId);

        if (insert) {
            let cc = new ind.ConsentControl(insert, "en", callBack);
            
            let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
            cc.showBanner(cookieCategoriePreferences);
    
            testShowingPreferences(cc, cookieCategoriePreferences, "");
        }
    });

    test("If switchable id is not in cookieCategoriePreferences, the category in preferences dialog will not be set", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c2": true, "c3": undefined };
        cc.showBanner(cookieCategoriePreferences);

        testShowingPreferences(cc, cookieCategoriePreferences, "");
    });

    test("Preferences dialog will appear when 'More info' button is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showBanner(cookieCategoriePreferences);

        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        testShowingPreferences(cc, cookieCategoriePreferences, "block");
    });

    test("'Reset all' and 'Save changes' will be enabled when any radio buttons are clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        cc.showBanner({ "c1": true, "c2": false,"c3": undefined });

        let cookieItemRadioBtnLength = document.getElementsByClassName(styles.cookieItemRadioBtn).length;
        for (let i = 0; i < cookieItemRadioBtnLength; i++) {
            let container = document.getElementById(testId);
            if (container) {
                container.innerHTML = "";
                testModalButton("showBanner", testId, i);
            }
            else {
                throw new Error("Container not found error");
            }
        }
    });

    test("Preferences dialog will be removed from DOM when 'X' button is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        cc.showBanner({ "c1": true, "c2": false,"c3": undefined });

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        testRemovingPreferences();
    });

    test("'X' button is clicked, and then click 'More info' button. Preferences dialog should appear", () => {
        let callBack = function() { return; };
        let cookieCategoriePreferences = { "c1": true, "c2": false,"c3": undefined };
        
        let cc = new ind.ConsentControl(testId, "en", callBack);
        cc.showBanner(cookieCategoriePreferences);

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[1];
        cookieInfo.click();

        testShowingPreferences(cc, cookieCategoriePreferences, "block");

        closeModalIcon.click();
        cookieInfo.click();
        testShowingPreferences(cc, cookieCategoriePreferences, "block");
    });

    test("Banner will be removed from DOM when hideBanner() is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        cc.hideBanner();

        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody.length).toBe(0);
        
        expect(document.getElementsByClassName(styles.bannerInform).length).toBe(0);
        expect(document.getElementsByClassName(styles.infoIcon).length).toBe(0);
        expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(0);

        expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(0);
        expect(document.getElementsByClassName(styles.bannerButton).length).toBe(0);
    });

    test("Preferences dialog will be removed from DOM when hideBanner() is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

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
                                                    () => {});

        cc.hideBanner();

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

    function testBannerState(): void {
        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody).toBeTruthy();
        expect(bannerBody[0].getAttribute("dir")).toBe("ltr");

        expect(document.getElementsByClassName(styles.bannerInform).length).toBe(1);
        expect(document.getElementsByClassName(styles.infoIcon).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(1);

        expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerButton).length).toBe(2);
    }

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
    
    test("Preferences dialog will be inserted when showPreferences(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": undefined, "c3": false };
        cc.showPreferences(cookieCategoriePreferences);

        testBannerState();
        testShowingPreferences(cc, cookieCategoriePreferences, "block");
    });

    test("If switchable id is not in cookieCategoriePreferences, the category in preferences dialog will not be set when showPreferences(...) is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
        let cookieCategoriePreferences = { "c1": true, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        testBannerState();
        testShowingPreferences(cc, cookieCategoriePreferences, "block");
    });

    test("'Reset all' and 'Save changes' will be enabled when any radio buttons are clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        let cookieItemRadioBtnLength = document.getElementsByClassName(styles.cookieItemRadioBtn).length;
        for (let i = 0; i < cookieItemRadioBtnLength; i++) {
            let container = document.getElementById(testId);
            if (container) {
                container.innerHTML = "";
                testModalButton("showPreferences", testId, i);
            }
            else {
                throw new Error("Container not found error");
            }
        }
    });

    test("Preferences dialog will be removed from DOM when 'X' button is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        testBannerState();
        testRemovingPreferences();
    });

    test("Preferences dialog will be removed from DOM when hidePreferences() is called", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

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
                                                    () => {});
        
        cc.hidePreferences();

        testBannerState();
        testRemovingPreferences();
    });
});

describe("Test radio buttons and 'Reset all' button", () => {
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
    
    test("Click 'More info' button and then click radio buttons. All cookieCategoriePreferences will be reset to initial state when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
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

        expect(cookieItemRadioBtn[0].checked).toBeFalsy();
        expect(cookieItemRadioBtn[1].checked).toBeTruthy();
        expect(cookieItemRadioBtn[2].checked).toBeTruthy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeTruthy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeTruthy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        expect(cookieItemRadioBtn[0].checked).toBeTruthy();
        expect(cookieItemRadioBtn[1].checked).toBeFalsy();
        expect(cookieItemRadioBtn[2].checked).toBeFalsy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeFalsy();
        expect(cookieItemRadioBtn[5].checked).toBeTruthy();
    });

    test("Call showPreferences(...) and then click radio buttons. All cookieCategoriePreferences will be reset to initial state when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        expect(cookieItemRadioBtn[0].checked).toBeFalsy();
        expect(cookieItemRadioBtn[1].checked).toBeTruthy();
        expect(cookieItemRadioBtn[2].checked).toBeTruthy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeTruthy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeTruthy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        expect(cookieItemRadioBtn[0].checked).toBeTruthy();
        expect(cookieItemRadioBtn[1].checked).toBeFalsy();
        expect(cookieItemRadioBtn[2].checked).toBeFalsy();
        expect(cookieItemRadioBtn[3].checked).toBeTruthy();
        expect(cookieItemRadioBtn[4].checked).toBeFalsy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();
    });

    test("Initialize cookieCategoriePreferences with unswitchable id, call showPreferences(...) and then click radio buttons. All cookieCategoriePreferences will be reset to initial state when 'Reset all' is clicked", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c0": true, "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        expect(cookieItemRadioBtn[0].checked).toBeFalsy();
        expect(cookieItemRadioBtn[1].checked).toBeTruthy();
        expect(cookieItemRadioBtn[2].checked).toBeTruthy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeTruthy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeTruthy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        let resetAllBtn = <HTMLElement> document.getElementsByClassName(styles.modalButtonReset)[0];
        resetAllBtn.click();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences).toEqual(cookieCategoriePreferences);
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        expect(cookieItemRadioBtn[0].checked).toBeTruthy();
        expect(cookieItemRadioBtn[1].checked).toBeFalsy();
        expect(cookieItemRadioBtn[2].checked).toBeFalsy();
        expect(cookieItemRadioBtn[3].checked).toBeTruthy();
        expect(cookieItemRadioBtn[4].checked).toBeFalsy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();
    });

    test("Click 'More info' button and then click radio buttons. cookieCategoriePreferences will be set", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
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

        expect(cookieItemRadioBtn[0].checked).toBeTruthy();
        expect(cookieItemRadioBtn[1].checked).toBeFalsy();
        expect(cookieItemRadioBtn[2].checked).toBeFalsy();
        expect(cookieItemRadioBtn[3].checked).toBeTruthy();
        expect(cookieItemRadioBtn[4].checked).toBeFalsy();
        expect(cookieItemRadioBtn[5].checked).toBeTruthy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeFalsy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }
        
        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        expect(cookieItemRadioBtn[0].checked).toBeFalsy();
        expect(cookieItemRadioBtn[1].checked).toBeTruthy();
        expect(cookieItemRadioBtn[2].checked).toBeTruthy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeTruthy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeTruthy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }
    });

    test("Call showPreferences(...) and then click radio buttons. cookieCategoriePreferences will be set", () => {
        let callBack = function() { return; };
        let cc = new ind.ConsentControl(testId, "en", callBack);

        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showPreferences(cookieCategoriePreferences);

        expect(cc.preferencesCtrl).toBeTruthy();
        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");

        let cookieItemRadioBtn: HTMLInputElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        cookieItemRadioBtn[0].click();
        cookieItemRadioBtn[3].click();
        cookieItemRadioBtn[5].click();

        expect(cookieItemRadioBtn[0].checked).toBeTruthy();
        expect(cookieItemRadioBtn[1].checked).toBeFalsy();
        expect(cookieItemRadioBtn[2].checked).toBeFalsy();
        expect(cookieItemRadioBtn[3].checked).toBeTruthy();
        expect(cookieItemRadioBtn[4].checked).toBeFalsy();
        expect(cookieItemRadioBtn[5].checked).toBeTruthy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeFalsy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }

        cookieItemRadioBtn[1].click();
        cookieItemRadioBtn[2].click();
        cookieItemRadioBtn[4].click();

        expect(cookieItemRadioBtn[0].checked).toBeFalsy();
        expect(cookieItemRadioBtn[1].checked).toBeTruthy();
        expect(cookieItemRadioBtn[2].checked).toBeTruthy();
        expect(cookieItemRadioBtn[3].checked).toBeFalsy();
        expect(cookieItemRadioBtn[4].checked).toBeTruthy();
        expect(cookieItemRadioBtn[5].checked).toBeFalsy();

        if (cc.preferencesCtrl) {
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c1"]).toBeFalsy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c2"]).toBeTruthy();
            expect(cc.preferencesCtrl.cookieCategoriesPreferences["c3"]).toBeTruthy();
        }
        else {
            throw new Error("Preference dialog not found error");
        }
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
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
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
        let cc = new ind.ConsentControl(testId, "en", callBack);
        
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