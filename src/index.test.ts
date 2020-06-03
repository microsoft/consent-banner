import * as ind from "./index";

describe("Test constructor", () => {
    test('CookieCategories and textResources full provided', () => {
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
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', cookieCategories, textResources);

        expect(cc.culture).toBe('en');
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual(textResources);
    });

    test('No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('en');

        expect(cc.culture).toBe('en');
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
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all"
        });
    });

    test('No cookieCategories, textResources full provided', () => {
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

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.culture).toBe('en');
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

    test('CookieCategories provided, no textResources', () => {
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

        let cc = new ind.ConsentControl('en', cookieCategories);

        expect(cc.culture).toBe('en');
        expect(cc.cookieCategories).toEqual(cookieCategories);
        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "More info",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "Accept",
            rejectLabel: "Reject",
            saveLabel: "Save changes",
            resetLabel: "Reset all"
        });
    });

    test('No cookieCategories, textResources without bannerMessageHtml', () => {
        let textResources = {
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

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.culture).toBe('en');
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
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without acceptAllLabel', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "Accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without rejectAllLabel', () => {
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

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without moreInfoLabel', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "More info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without preferencesDialogTitle', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "Manage cookie preferences",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without preferencesDialogDescHtml', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "Most Microsoft sites...",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without acceptLabel', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "Accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without rejectLabel', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "Reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without saveLabel', () => {
        let textResources = {
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "Save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without resetLabel', () => {
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
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "This is banner message.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "Reset all"
        });
    });

    test('No cookieCategories, textResources without bannerMessageHtml, acceptAllLabel', () => {
        let textResources = {
            rejectAllLabel: "This is reject all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.culture).toBe('en');
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
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        });
    });

    test('No cookieCategories, textResources without bannerMessageHtml, rejectAllLabel', () => {
        let textResources = {
            acceptAllLabel: "This is accept all",
            moreInfoLabel: "This is more info",
            preferencesDialogTitle: "This is preferences dialog title",
            preferencesDialogDescHtml: "This is preferences dialog text",
            acceptLabel: "This is accept",
            rejectLabel: "This is reject",
            saveLabel: "This is save changes",
            resetLabel: "This is reset all"
        };

        let cc = new ind.ConsentControl('en', undefined, textResources);

        expect(cc.textResources).toEqual({
            bannerMessageHtml: "We use optional cookies to provide... read <a href='link'>here<a>.",
            acceptAllLabel: "This is accept all",
            rejectAllLabel: "Reject all",
            moreInfoLabel: "This is more info",
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
    test('Language is ms (ltr). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ms');
        expect(cc.getDirection()).toBe('ltr');
    });

    test('Language is ms (ltr). Set direction to rtl. No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ms');
        cc.setDirection('rtl');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ar (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ar');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is he (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('he');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ps (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ps');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ur (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ur');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is fa (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('fa');
        expect(cc.getDirection()).toBe('rtl');
    });
    
    test('Language is pa (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('pa');
        expect(cc.getDirection()).toBe('rtl');
    });
    
    test('Language is sd (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('sd');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is tk (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('tk');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ug (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ug');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is yi (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('yi');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is syr (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('syr');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ks-arab (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ks-arab');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is en-US (ltr). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('en-US');
        expect(cc.getDirection()).toBe('ltr');
    });

    test('Language is ar-SA (rtl). No cookieCategories, no textResources', () => {
        let cc = new ind.ConsentControl('ar-SA');
        expect(cc.getDirection()).toBe('rtl');
    });
});

describe("Test html and body direction", () => {
    let htmlDir: string | null;
    let bodyDir: string | null;

    beforeAll(() => {
        htmlDir = document.getElementsByTagName("html")[0].getAttribute('dir');
        bodyDir = document.getElementsByTagName("body")[0].getAttribute('dir');
    });

    afterEach(() => {
        if (htmlDir) {
            document.getElementsByTagName("html")[0].setAttribute('dir', htmlDir);
        }
        else {
            document.getElementsByTagName("html")[0].removeAttribute('dir');
        }

        if (bodyDir) {
            document.getElementsByTagName("body")[0].setAttribute('dir', bodyDir);
        }
        else {
            document.getElementsByTagName("body")[0].removeAttribute('dir');
        }
    });

    test('Language is en (ltr). Html dir is rtl. No cookieCategories, no textResources', () => {
        document.getElementsByTagName("html")[0].setAttribute('dir', 'rtl');
        let cc = new ind.ConsentControl('en');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ar (rtl). Html dir is ltr. No cookieCategories, no textResources', () => {
        document.getElementsByTagName("html")[0].setAttribute('dir', 'ltr');
        let cc = new ind.ConsentControl('ar');
        expect(cc.getDirection()).toBe('ltr');
    });

    test('Language is en (ltr). Body dir is rtl. No cookieCategories, no textResources', () => {
        document.getElementsByTagName("body")[0].setAttribute('dir', 'rtl');
        let cc = new ind.ConsentControl('en');
        expect(cc.getDirection()).toBe('rtl');
    });

    test('Language is ar (rtl). Body dir is ltr. No cookieCategories, no textResources', () => {
        document.getElementsByTagName("body")[0].setAttribute('dir', 'ltr');
        let cc = new ind.ConsentControl('ar');
        expect(cc.getDirection()).toBe('ltr');
    });
});