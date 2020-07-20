import { ConsentControl } from "./index";

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
        let cc = new ConsentControl(testId, "ms", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ms (ltr). Set direction to rtl. No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ms", callBack);
        cc.setDirection("rtl");
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is he (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "he", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ps (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ps", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ur (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ur", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is fa (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "fa", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is pa (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "pa", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });
    
    test("Language is sd (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "sd", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is tk (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "tk", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ug (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ug", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is yi (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "yi", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is syr (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "syr", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ks-arab (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ks-arab", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is en-US (ltr). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en-US", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is ar-SA (rtl). No cookieCategories, no textResources", () => {
        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ar-SA", callBack);
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
        let cc = new ConsentControl(testId, "en", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Html dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");

        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });

    test("Language is en (ltr). Body dir is rtl. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "rtl");

        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "en", callBack);
        expect(cc.getDirection()).toBe("rtl");
    });

    test("Language is ar (rtl). Body dir is ltr. No cookieCategories, no textResources", () => {
        document.getElementsByTagName("body")[0].setAttribute("dir", "ltr");

        let callBack = function() { return; };
        let cc = new ConsentControl(testId, "ar", callBack);
        expect(cc.getDirection()).toBe("ltr");
    });
});