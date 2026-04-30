import { ConsentControl } from './index';
import { IOptions, ITextResources } from './interfaces/Options';
import { ICookieCategory } from './interfaces/CookieCategories';

const cookieCategories: ICookieCategory[] = [
    {
        id: "c0",
        name: "1. Essential cookies",
        description: {
            message: "We use this cookie, read more {0}",
            links: [{ text: "here", href: "unknown" }]
        },
        isUnswitchable: true
    },
    {
        id: "c1",
        name: "2. Performance & analytics",
        description: {
            message: "We use this cookie, read more {0}",
            links: [{ text: "here", href: "unknown" }]
        }
    },
    {
        id: "c2",
        name: "3. Advertising/Marketing",
        description: { message: "Blah" }
    },
    {
        id: "c3",
        name: "4. Targeting/personalization",
        description: { message: "Blah" }
    }
];

const defaultTextResources: ITextResources = {
    banner: {
        message: "We use optional cookies to provide... read {0}.",
        links: [{ text: "here", href: "unknown" }]
    },
    acceptAllLabel: "Accept all",
    rejectAllLabel: "Reject all",
    moreInfoLabel: "More info",
    preferencesDialog: {
        message: "Most Microsoft sites use cookies. For more info see {0}.",
        links: [{ text: "here", href: "unknown" }]
    },
    preferencesDialogTitle: "Manage cookie preferences",
    preferencesDialogCloseLabel: "Close",
    acceptLabel: "Accept",
    rejectLabel: "Reject",
    saveLabel: "Save changes",
    resetLabel: "Reset all"
};

const testResources: ITextResources = {
    banner: {
        message: "Test banner message {0}",
        links: [{ text: "link", href: "https://example.com" }]
    },
    acceptAllLabel: "OK",
    rejectAllLabel: "No",
    moreInfoLabel: "Info",
    preferencesDialog: {
        message: "Test dialog desc {0}",
        links: [{ text: "more", href: "https://example.com/more" }]
    },
    preferencesDialogTitle: "Title",
    preferencesDialogCloseLabel: "X",
    acceptLabel: "Yes",
    rejectLabel: "No",
    saveLabel: "Save",
    resetLabel: "Reset"
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

    test("CookieCategories and textResources fully provided", () => {
        const cookieCategories: ICookieCategory[] = [
            {
                id: "cookie1",
                name: "Test cookie1",
                description: { message: "This is for test cookie1" }
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                description: { message: "This is for test cookie2 with 4th property" },
                isUnswitchable: true
            }
        ];

        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const options: IOptions = { textResources };
        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, cookieCategories, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test("No cookieCategories, no textResources", () => {
        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(defaultTextResources);
    });

    test("No cookieCategories, textResources over-provided (extra keys are ignored)", () => {
        const textResources = {
            market: "en-us",
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            middle: 6,
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all",
            add: "additional",
            complex: { id: "c", name: "1. Essential" }
        } as unknown as ITextResources;

        const callBack = () => { return; };
        const options: IOptions = { textResources };
        const cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual({
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("No cookieCategories, textResources fully provided", () => {
        const callBack = () => { return; };
        const options: IOptions = { textResources: testResources };
        const cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(testResources);
    });

    test("CookieCategories provided, no textResources", () => {
        const cookieCategories: ICookieCategory[] = [
            {
                id: "cookie1",
                name: "Test cookie1",
                description: { message: "This is for test cookie1" }
            },
            {
                id: "cookie2",
                name: "Test cookie2",
                description: { message: "This is for test cookie2 with 4th property" },
                isUnswitchable: true
            }
        ];

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, cookieCategories);

        expect(cc.culture).toBe("en");
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(defaultTextResources);
    });

    test("textResources without 'banner' → falls back to default banner", () => {
        const textResources: ITextResources = {
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const options: IOptions = { textResources };
        const cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources).toEqual({
            banner: defaultTextResources.banner,
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test("textResources without acceptAllLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const options: IOptions = { textResources };
        const cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.textResources.acceptAllLabel).toBe("Accept all");
        expect(cc.textResources.rejectAllLabel).toBe("This is reject all");
    });

    test("textResources without moreInfoLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.moreInfoLabel).toBe("More info");
    });

    test("textResources without preferencesDialogCloseLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.preferencesDialogCloseLabel).toBe("Close");
    });

    test("textResources without preferencesDialogTitle → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.preferencesDialogTitle).toBe("Manage cookie preferences");
    });

    test("textResources without 'preferencesDialog' → falls back to default preferencesDialog", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.preferencesDialog).toEqual(defaultTextResources.preferencesDialog);
    });

    test("textResources without acceptLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.acceptLabel).toBe("Accept");
    });

    test("textResources without rejectLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.rejectLabel).toBe("Reject");
    });

    test("textResources without saveLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.saveLabel).toBe("Save changes");
    });

    test("textResources without resetLabel → falls back to default", () => {
        const textResources: ITextResources = {
            banner: { message: "This is banner message.", links: [] },
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });
        expect(cc.textResources.resetLabel).toBe("Reset all");
    });

    test("textResources without 'banner' and 'acceptAllLabel' → both fall back to default", () => {
        const textResources: ITextResources = {
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            rejectAllLabel: "This is reject all",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });

        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources.banner).toEqual(defaultTextResources.banner);
        expect(cc.textResources.acceptAllLabel).toBe("Accept all");
    });

    test("textResources without 'banner' and 'rejectLabel' → both fall back to default", () => {
        const textResources: ITextResources = {
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialog: { message: "This is preferences dialog text", links: [] },
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogCloseLabel: "This is Close",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        const callBack = () => { return; };
        const cc = new ConsentControl(testId, "en", callBack, undefined, { textResources });

        expect(cc.textResources.banner).toEqual(defaultTextResources.banner);
        expect(cc.textResources.rejectLabel).toBe("Reject");
    });
});