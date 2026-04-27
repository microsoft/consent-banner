import { ConsentControl } from "./index";
import { IOptions, ITextResources } from './interfaces/Options';
import { ILink } from './interfaces/Link';
import { ICookieCategory } from './interfaces/CookieCategories';

const defaultCookieCategories: ICookieCategory[] = [
    {
        id: "c0",
        name: "1. Essential cookies",
        desc: "We use this cookie, read more ",
        descLink: { text: "here", href: "unknown" } as ILink,
        isUnswitchable: true
    },
    {
        id: "c1",
        name: "2. Performance & analytics",
        desc: "We use this cookie, read more ",
        descLink: { text: "here", href: "unknown" } as ILink
    },
    {
        id: "c2",
        name: "3. Advertising/Marketing",
        desc: "Blah"
    },
    {
        id: "c3",
        name: "4. Targeting/personalization",
        desc: "Blah"
    }
];

const defaultTextResources: ITextResources = {
    bannerMessage: "We use optional cookies to provide... read {0}.",
    bannerLinks: [{ text: "here", href: "unknown" } as ILink],
    acceptAllLabel: "Accept all",
    rejectAllLabel: "Reject all",
    moreInfoLabel: "More info",
    preferencesDialogCloseLabel: "Close",
    preferencesDialogTitle: "Manage cookie preferences",
    preferencesDialogDesc: "Most Microsoft sites use cookies. For more info see {0}.",
    preferencesDialogDescLinks: [{ text: "here", href: "unknown" } as ILink],
    acceptLabel: "Accept",
    rejectLabel: "Reject",
    saveLabel: "Save changes",
    resetLabel: "Reset all"
};

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
                desc: "This is for test cookie1"
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                desc: "This is for test cookie2 with 4th property",
                isUnswitchable: true
            }
        ];

        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
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
        expect(cc.cookieCategories).toEqual(defaultCookieCategories);
        expect(cc.textResources).toEqual(defaultTextResources);
    });

    test("No cookieCategories, textResources over provided", () => {
        let textResources = {
            market: "en-us",
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            middle: 6,
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            add: "additional",
            complex: { id: "c", name: "1. Essential" }
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(defaultCookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources full provided", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(defaultCookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test("CookieCategories provided, no textResources", () => {
        let cookieCategories = [
            {
                id: "cookie1",
                name: "Test cookie1",
                desc: "This is for test cookie1"
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                desc: "This is for test cookie2 with 4th property",
                isUnswitchable: true
            }
        ];

        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack, cookieCategories);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(defaultTextResources);
    });

    test("No cookieCategories, textResources without bannerMessage", () => {
        let textResources = {
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.textResources).toEqual({
            bannerMessage: "We use optional cookies to provide... read {0}.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without acceptAllLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without moreInfoLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "More info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogCloseLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogTitle", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without preferencesDialogDesc", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "Most Microsoft sites use cookies. For more info see {0}.",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without acceptLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "Accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without rejectLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without saveLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "Save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without resetLabel", () => {
        let textResources = {
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "This is banner message.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "Reset all"
        });
    });

    test("No cookieCategories, textResources without bannerMessage, acceptAllLabel", () => {
        let textResources = {
            bannerLinks: [],
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(defaultCookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessage: "We use optional cookies to provide... read {0}.",
            bannerLinks: [],
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources without bannerMessage, rejectLabel", () => {
        let textResources = {
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        options.textResources = textResources;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            bannerMessage: "We use optional cookies to provide... read {0}.",
            bannerLinks: [],
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogCloseLabel: "This is Close",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDesc: "This is preferences dialog text",
            preferencesDialogDescLinks: [],
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });
});