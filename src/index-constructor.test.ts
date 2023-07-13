import { ConsentControl } from "./index";
import { IOptions } from './interfaces/Options';

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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let options: IOptions = {};
        options.textResources = textResources;

        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack, cookieCategories, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test("No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);

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
            rejectAllLabel: "Reject all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all",
            bannerCloseLabel: "Close banner"
        });
    });

    test("No cookieCategories, textResources over provided", () => {
        let textResources = {
            market: "en-us",
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            middle: 6,
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            add: "additional",
            complex: {
                id: "c",
                name: "1. Essential"
            },
            bannerCloseLabel: "This is close banner"
        };
    
        let callBack = function() { return; };
    
        let options: IOptions = { };
        options.textResources = textResources;
    
        let cc = new ConsentControl(testId, "en", callBack, undefined, options);
    
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
            
        };

        let callBack = function() { return; };

        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
        let cc = new ConsentControl(testId, "en", callBack, cookieCategories);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all",
            bannerCloseLabel: "Close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
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
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            resetLabel: "Reset all",
            bannerCloseLabel: "This is close banner"
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
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

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
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        });
    });

    test("No cookieCategories, textResources without bannerMessageHtml, rejectLabel", () => {
        let textResources = {
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "This is close banner"
        });
    });

    test("No close banner, textResources without bannerCloseLabel", () => {
        let textResources = {
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here</a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            bannerCloseLabel: "Close banner"
        });
    });
});