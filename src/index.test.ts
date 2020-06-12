import * as ind from "./index";
import * as styles from "./styles.scss";

import { ICookieCategoriesPreferences } from "./interfaces/CookieCategoriesPreferences";

describe("Test constructor", () => {
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", cookieCategories, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test("No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("en");

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here<a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here<a>."
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
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here<a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here<a>."
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

        let cc = new ind.ConsentControl("en", cookieCategories);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here<a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here<a>."
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
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "This is reject all",
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

    test("No cookieCategories, textResources without rejectAllLabel", () => {
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

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "Reject all",
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
            rejectAllLabel: "This is reject all",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual([
            {
                id: "c0",
                name: "1. Essential cookies",
                descHtml: "We use this cookie, read more <a href='link'>here<a>.",
                isUnswitchable: true
            },
            {
                id: "c1",
                name: "2. Performance & analytics",
                descHtml: "We use this cookie, read more <a href='link'>here<a>."
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
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "This is reject all",
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

    test("No cookieCategories, textResources without bannerMessageHtml, rejectAllLabel", () => {
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

        let cc = new ind.ConsentControl("en", undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "Reject all",
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
});

describe("Test language direction", () => {
    test("Language is ms (ltr). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ms");
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ms (ltr). Set direction to rtl. No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ms");
        cc.setDirection("rtl");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ar");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is he (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("he");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ps (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ps");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ur (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ur");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is fa (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("fa");
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is pa (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("pa");
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is sd (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("sd");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is tk (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("tk");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ug (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ug");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is yi (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("yi");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is syr (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("syr");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ks-arab (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ks-arab");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is en-US (ltr). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("en-US");
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ar-SA (rtl). No cookieCategories, no textResources", () => {
        let cc = new ind.ConsentControl("ar-SA");
        expect(cc.getDirection()).toBe("rtl");
    });
});

describe("Test html and body direction", () => {
    let htmlDir: string | null;
    let bodyDir: string | null;

    beforeAll(() => {
        htmlDir = document.getElementsByTagName("html")[0].getAttribute("dir");
        bodyDir = document.getElementsByTagName("body")[0].getAttribute("dir");
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
    });

    test("Language is en (ltr). Html dir is rtl. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
        let cc = new ind.ConsentControl("en");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Html dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
        let cc = new ind.ConsentControl("ar");
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is en (ltr). Body dir is rtl. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "rtl");
        let cc = new ind.ConsentControl("en");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Body dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "ltr");
        let cc = new ind.ConsentControl("ar");
        expect(cc.getDirection()).toBe("ltr");
    });
});

function testShowingPreferences(cc: ind.ConsentControl, cookieCategoriePreferences: ICookieCategoriesPreferences, display: string): void {
    expect(document.getElementsByClassName(styles.cookieModal)).toBeTruthy;

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

    let countSwitchable = 0;
    for (let cookieCategory of cc.cookieCategories) {
        if (!cookieCategory.isUnswitchable) {
            countSwitchable++;
        }
    }

    expect(document.getElementsByClassName(styles.cookieListItemGroup).length).toBe(countSwitchable);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnGroup).length).toBe(countSwitchable);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnCtrl).length).toBe(countSwitchable * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtn).length).toBe(countSwitchable * 2);
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnLabel).length).toBe(countSwitchable * 2);

    // test: 
    // c1: true => accept radio button should be checked
    // c2: false => reject radio button should be checked
    let i = 0;
    for (let cookieCategory of cc.cookieCategories) {
        if (cookieCategoriePreferences.hasOwnProperty(cookieCategory.id)) {
            if (cookieCategoriePreferences[cookieCategory.id]) {
                let acceptRadio = document.getElementsByClassName(styles.cookieItemRadioBtn)[i * 2];
                expect(acceptRadio.getAttribute("checked")).toBeTruthy;
            }
            else if (cookieCategoriePreferences[cookieCategory.id] === false) {
                let rejectRadio = document.getElementsByClassName(styles.cookieItemRadioBtn)[i * 2 + 1];
                expect(rejectRadio.getAttribute("checked")).toBeTruthy;
            }
        }
        i++;
    }

    expect(document.getElementsByClassName(styles.modalButtonGroup).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonSave).length).toBe(1);
    expect(document.getElementsByClassName(styles.modalButtonReset).length).toBe(1);
}

function testModalButton(testId: string, i: number): void {
    let cc = new ind.ConsentControl("en");
    cc.showBanner(testId, { "c1": true, "c2": false,"c3": undefined });

    let cookieItemRadioBtn: HTMLElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
    cookieItemRadioBtn[i].click();

    expect(document.getElementsByClassName(styles.modalButtonSave)[0].getAttribute("disabled")).toBeFalsy;
    expect(document.getElementsByClassName(styles.modalButtonReset)[0].getAttribute("disabled")).toBeFalsy;
}

function testRemovingPreferences(): void {
    let cookieModal = document.getElementsByClassName(styles.cookieModal);
    expect(cookieModal).toBeNull;

    expect(document.getElementsByClassName(styles.modalContainer)).toBeNull;
    expect(document.getElementsByClassName(styles.closeModalIcon)).toBeNull;
    expect(document.getElementsByClassName(styles.modalBody)).toBeNull;

    expect(document.getElementsByClassName(styles.modalTitle)).toBeNull;
    expect(document.getElementsByClassName(styles.modalContent)).toBeNull;

    expect(document.getElementsByClassName(styles.cookieStatement)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieOrderedList)).toBeNull;

    expect(document.getElementsByClassName(styles.cookieListItem)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieListItemTitle)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieListItemDescription)).toBeNull;

    expect(document.getElementsByClassName(styles.cookieListItemGroup)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnGroup)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnCtrl)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieItemRadioBtn)).toBeNull;
    expect(document.getElementsByClassName(styles.cookieItemRadioBtnLabel)).toBeNull;

    expect(document.getElementsByClassName(styles.modalButtonGroup)).toBeNull;
    expect(document.getElementsByClassName(styles.modalButtonSave)).toBeNull;
    expect(document.getElementsByClassName(styles.modalButtonReset)).toBeNull;
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
                <button type="button" class="${styles.bannerButton}">Reject all</button>
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
    
    test("Banner will be inserted when showBanner(...) is called", () => {
        let cc = new ind.ConsentControl("en");
        cc.showBanner(testId, { "c1": true, "c2": false,"c3": undefined });
        
        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody).toBeTruthy;
        expect(bannerBody[0].getAttribute("dir")).toBe(cc.getDirection());

        expect(document.getElementsByClassName(styles.bannerInform).length).toBe(1);
        expect(document.getElementsByClassName(styles.infoIcon).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerInformBody).length).toBe(1);

        expect(document.getElementsByClassName(styles.buttonGroup).length).toBe(1);
        expect(document.getElementsByClassName(styles.bannerButton).length).toBe(3);
    });

    test("Preferences dialog will be inserted when showBanner(...) is called", () => {
        let cc = new ind.ConsentControl("en");
        let cookieCategoriePreferences = { "c1": true, "c2": false, "c3": undefined };
        cc.showBanner(testId, cookieCategoriePreferences);

        testShowingPreferences(cc, cookieCategoriePreferences, "");
    });

    test("If switchable id is not in cookieCategoriePreferences, the category in preferences dialog will not be set", () => {
        let cc = new ind.ConsentControl("en");
        let cookieCategoriePreferences = { "c1": true, "c3": undefined };
        cc.showBanner(testId, cookieCategoriePreferences);

        testShowingPreferences(cc, cookieCategoriePreferences, "");
    });

    test("Preferences dialog will appear when 'More info' button is clicked", () => {
        let cc = new ind.ConsentControl("en");
        cc.showBanner(testId, { "c1": true, "c2": false,"c3": undefined });

        let cookieInfo: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.bannerButton)[2];
        cookieInfo.click();

        let cookieModal: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.cookieModal)[0];
        expect(cookieModal.style.display).toBe("block");
    });

    test("'Reset all' and 'Save changes' will be enabled when any radio buttons are clicked", () => {
        let cc = new ind.ConsentControl("en");
        cc.showBanner(testId, { "c1": true, "c2": false,"c3": undefined });

        let cookieItemRadioBtn: HTMLElement[] = [].slice.call(document.getElementsByClassName(styles.cookieItemRadioBtn));
        for (let i = 0; i < cookieItemRadioBtn.length; i++) {
            testModalButton(testId, i);
        }
    });

    test("Preferences dialog will be removed from DOM when 'X' button is clicked", () => {
        let cc = new ind.ConsentControl("en");
        cc.showBanner(testId, { "c1": true, "c2": false,"c3": undefined });

        let closeModalIcon: HTMLElement = <HTMLElement> document.getElementsByClassName(styles.closeModalIcon)[0];
        closeModalIcon.click();
        
        testRemovingPreferences();
    });

    test("Banner will be removed from DOM when hideBanner() is called", () => {
        let cc = new ind.ConsentControl("en");
        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        cc.setContainerElementId(testId);
        cc.hideBanner();

        let bannerBody = document.getElementsByClassName(styles.bannerBody);
        expect(bannerBody).toBeNull;
        
        expect(document.getElementsByClassName(styles.bannerInform)).toBeNull;
        expect(document.getElementsByClassName(styles.infoIcon)).toBeNull;
        expect(document.getElementsByClassName(styles.bannerInformBody)).toBeNull;

        expect(document.getElementsByClassName(styles.buttonGroup)).toBeNull;
        expect(document.getElementsByClassName(styles.bannerButton)).toBeNull;
    });

    test("Preferences dialog will be removed from DOM when hideBanner() is called", () => {
        let cc = new ind.ConsentControl("en");
        let insert = document.getElementById(testId);
        if (insert) {
            insert.innerHTML = testElementString;
        }
        else {
            throw new Error("Insert point not found error");
        }

        cc.setContainerElementId(testId);
        cc.hideBanner();

        testRemovingPreferences();
    });
});