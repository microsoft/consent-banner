import { ConsentControl } from "./index";
import { IOptions, IThemes } from './interfaces/Options';

describe("Test themes in constructor", () => {
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
    
    test("Light, dark and high-contrast are fully provided", () => {
        let lightTheme = {
            "close-button-color": "#000000",
            "secondary-button-disabled-opacity": "0.7",
            "secondary-button-hover-shadow": "5px 4px 10px red",
            "primary-button-disabled-opacity": "0.7",
            "primary-button-hover-border": "1px double red",
            "primary-button-disabled-border": "1px double white",
            "primary-button-hover-shadow": "5px 4px 10px #171717",
            "banner-background-color": "#00FFFF",
            "dialog-background-color": "#FAEBD7",
            "primary-button-color": "#008B8B",
            "text-color": "#191970",
            "secondary-button-color": "#9370DB",
            "secondary-button-disabled-color": "#FF00FF",
            "secondary-button-border": "1px dashed black",
            "background-color-between-page-and-dialog": "rgba(250, 235, 215, 0.6)",
            "dialog-border-color": "#A52A2A",
            "hyperlink-font-color": "#FF00FF",
            "secondary-button-hover-color": "#BA55D3",
            "secondary-button-hover-border": "1px dashed red",
            "secondary-button-disabled-border": "1px dashed white",
            "secondary-button-focus-border-color": "#C71585",
            "secondary-button-text-color": "#FF4500",
            "secondary-button-disabled-text-color": "#FF5411",
            "primary-button-hover-color": "#00FFFF",
            "primary-button-disabled-color": "#6495ED",
            "primary-button-border": "1px double black",
            "primary-button-focus-border-color": "#6B8E23",
            "primary-button-text-color": "#D2691E",
            "primary-button-disabled-text-color": "#D26718",
            "radio-button-border-color": "#101010",
            "radio-button-checked-background-color": "#010101",
            "radio-button-hover-border-color": "#131313",
            "radio-button-hover-background-color": "rgba(1, 1, 1, 0.6)",
            "radio-button-disabled-color": "rgba(16, 16, 16, 0.3)",
            "radio-button-disabled-border-color": "rgba(15, 15, 15, 0.3)"
        };

        let darkTheme = {
            "close-button-color": "#808080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "1px 4px 10px black",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "1px double rgba(40, 40, 40, 0.5)",
            "primary-button-disabled-border": "1px double rgba(215, 215, 215, 0.5)",
            "primary-button-hover-shadow": "1px 4px 10px green",
            "banner-background-color": "#F0F8FF",
            "dialog-background-color": "#7FFFD4",
            "primary-button-color": "#FFD700",
            "text-color": "#2F4F4F",
            "secondary-button-color": "#DCDCDC",
            "secondary-button-disabled-color": "#FFFAF0",
            "secondary-button-border": "1px dashed #696969",
            "background-color-between-page-and-dialog": "rgba(240, 237, 255, 0.5)",
            "dialog-border-color": "#0000FF",
            "hyperlink-font-color": "#8A2BE2",
            "secondary-button-hover-color": "#DADADA",
            "secondary-button-hover-border": "1px dashed #FF00FF",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#B22222",
            "secondary-button-text-color": "#4B0082",
            "secondary-button-disabled-text-color": "#0000CD",
            "primary-button-hover-color": "#ADFF2F",
            "primary-button-disabled-color": "#DAA520",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#BC8F8F",
            "primary-button-text-color": "#001FFF",
            "primary-button-disabled-text-color": "#6B8E23",
            "radio-button-border-color": "#212121",
            "radio-button-checked-background-color": "#100011",
            "radio-button-hover-border-color": "#200011",
            "radio-button-hover-background-color": "rgba(16, 0, 17, 0.7)",
            "radio-button-disabled-color": "rgba(130, 250, 221, 0.4)",
            "radio-button-disabled-border-color": "rgba(157, 237, 220, 0.4)"
        };

        let highContrastTheme = {
            "close-button-color": "#000080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.65",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "1px double #3CB371",
            "primary-button-hover-shadow": "2px 5px 7px #A12A29",
            "banner-background-color": "#BA55D3",
            "dialog-background-color": "#32CD32",
            "primary-button-color": "#7B68EE",
            "text-color": "#800000",
            "secondary-button-color": "#00FA9A",
            "secondary-button-disabled-color": "#7B68EE",
            "secondary-button-border": "1px dashed #969696",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "#ADD8E6",
            "hyperlink-font-color": "#B0E0E6",
            "secondary-button-hover-color": "#3CB371",
            "secondary-button-hover-border": "1px dashed #B7610B",
            "secondary-button-disabled-border": "1px dashed black",
            "secondary-button-focus-border-color": "#FF8C00",
            "secondary-button-text-color": "#FF1493",
            "secondary-button-disabled-text-color": "#00BFFF",
            "primary-button-hover-color": "#C71585",
            "primary-button-disabled-color": "#9400D3",
            "primary-button-border": "1px double #FFFD00",
            "primary-button-focus-border-color": "#7CFC00",
            "primary-button-text-color": "#800080",
            "primary-button-disabled-text-color": "#00FFFF",
            "radio-button-border-color": "#663399",
            "radio-button-checked-background-color": "#A0522D",
            "radio-button-hover-border-color": "#D2B48C",
            "radio-button-hover-background-color": "rgba(150, 95, 125, 1)",
            "radio-button-disabled-color": "rgba(145, 85, 105, 0.73)",
            "radio-button-disabled-border-color": "rgba(148, 77, 255, 0.73)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes.light = lightTheme;
        themes.dark = darkTheme;
        themes["high-contrast"] = highContrastTheme;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual(lightTheme);
        expect(cc.themes.dark).toEqual(darkTheme);
        expect(cc.themes["high-contrast"]).toEqual(highContrastTheme);
    });

    test("Only miss light theme", () => {
        let darkTheme = {
            "close-button-color": "#808080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "1px 4px 10px black",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "1px double rgba(40, 40, 40, 0.5)",
            "primary-button-disabled-border": "1px double rgba(215, 215, 215, 0.5)",
            "primary-button-hover-shadow": "1px 4px 10px green",
            "banner-background-color": "#F0F8FF",
            "dialog-background-color": "#7FFFD4",
            "primary-button-color": "#FFD700",
            "text-color": "#2F4F4F",
            "secondary-button-color": "#DCDCDC",
            "secondary-button-disabled-color": "#FFFAF0",
            "secondary-button-border": "1px dashed #696969",
            "background-color-between-page-and-dialog": "rgba(240, 237, 255, 0.5)",
            "dialog-border-color": "#0000FF",
            "hyperlink-font-color": "#8A2BE2",
            "secondary-button-hover-color": "#DADADA",
            "secondary-button-hover-border": "1px dashed #FF00FF",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#B22222",
            "secondary-button-text-color": "#4B0082",
            "secondary-button-disabled-text-color": "#0000CD",
            "primary-button-hover-color": "#ADFF2F",
            "primary-button-disabled-color": "#DAA520",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#BC8F8F",
            "primary-button-text-color": "#001FFF",
            "primary-button-disabled-text-color": "#6B8E23",
            "radio-button-border-color": "#212121",
            "radio-button-checked-background-color": "#100011",
            "radio-button-hover-border-color": "#200011",
            "radio-button-hover-background-color": "rgba(16, 0, 17, 0.7)",
            "radio-button-disabled-color": "rgba(130, 250, 221, 0.4)",
            "radio-button-disabled-border-color": "rgba(157, 237, 220, 0.4)"
        };

        let highContrastTheme = {
            "close-button-color": "#000080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.65",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "1px double #3CB371",
            "primary-button-hover-shadow": "2px 5px 7px #A12A29",
            "banner-background-color": "#BA55D3",
            "dialog-background-color": "#32CD32",
            "primary-button-color": "#7B68EE",
            "text-color": "#800000",
            "secondary-button-color": "#00FA9A",
            "secondary-button-disabled-color": "#7B68EE",
            "secondary-button-border": "1px dashed #969696",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "#ADD8E6",
            "hyperlink-font-color": "#B0E0E6",
            "secondary-button-hover-color": "#3CB371",
            "secondary-button-hover-border": "1px dashed #B7610B",
            "secondary-button-disabled-border": "1px dashed black",
            "secondary-button-focus-border-color": "#FF8C00",
            "secondary-button-text-color": "#FF1493",
            "secondary-button-disabled-text-color": "#00BFFF",
            "primary-button-hover-color": "#C71585",
            "primary-button-disabled-color": "#9400D3",
            "primary-button-border": "1px double #FFFD00",
            "primary-button-focus-border-color": "#7CFC00",
            "primary-button-text-color": "#800080",
            "primary-button-disabled-text-color": "#00FFFF",
            "radio-button-border-color": "#663399",
            "radio-button-checked-background-color": "#A0522D",
            "radio-button-hover-border-color": "#D2B48C",
            "radio-button-hover-background-color": "rgba(150, 95, 125, 1)",
            "radio-button-disabled-color": "rgba(145, 85, 105, 0.73)",
            "radio-button-disabled-border-color": "rgba(148, 77, 255, 0.73)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes.dark = darkTheme;
        themes["high-contrast"] = highContrastTheme;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual({
            "close-button-color": "#666666",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "none",
            "primary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "banner-background-color": "#F2F2F2",
            "dialog-background-color": "#FFFFFF",
            "primary-button-color": "#0067B8",
            "text-color": "#000000",
            "secondary-button-color": "#EBEBEB",
            "secondary-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "secondary-button-border": "none",
            "background-color-between-page-and-dialog": "rgba(255, 255, 255, 0.6)",
            "dialog-border-color": "#0067B8",
            "hyperlink-font-color": "#0067B8",
            "secondary-button-hover-color": "#DBDBDB",
            "secondary-button-hover-border": "none",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#000000",
            "secondary-button-text-color": "#000000",
            "secondary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "primary-button-hover-color": "#0067B8",
            "primary-button-disabled-color": "rgba(0, 120, 215, 0.2)",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#000000",
            "primary-button-text-color": "#FFFFFF",
            "primary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-border-color": "#000000",
            "radio-button-checked-background-color": "#000000",
            "radio-button-hover-border-color": "#0067B8",
            "radio-button-hover-background-color": "rgba(0, 0, 0, 0.8)",
            "radio-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-disabled-border-color": "rgba(0, 0, 0, 0.2)"
        });

        expect(cc.themes.dark).toEqual(darkTheme);
        expect(cc.themes["high-contrast"]).toEqual(highContrastTheme);
    });

    test("Only miss dark theme", () => {
        let lightTheme = {
            "close-button-color": "#000000",
            "secondary-button-disabled-opacity": "0.7",
            "secondary-button-hover-shadow": "5px 4px 10px red",
            "primary-button-disabled-opacity": "0.7",
            "primary-button-hover-border": "1px double red",
            "primary-button-disabled-border": "1px double white",
            "primary-button-hover-shadow": "5px 4px 10px #171717",
            "banner-background-color": "#00FFFF",
            "dialog-background-color": "#FAEBD7",
            "primary-button-color": "#008B8B",
            "text-color": "#191970",
            "secondary-button-color": "#9370DB",
            "secondary-button-disabled-color": "#FF00FF",
            "secondary-button-border": "1px dashed black",
            "background-color-between-page-and-dialog": "rgba(250, 235, 215, 0.6)",
            "dialog-border-color": "#A52A2A",
            "hyperlink-font-color": "#FF00FF",
            "secondary-button-hover-color": "#BA55D3",
            "secondary-button-hover-border": "1px dashed red",
            "secondary-button-disabled-border": "1px dashed white",
            "secondary-button-focus-border-color": "#C71585",
            "secondary-button-text-color": "#FF4500",
            "secondary-button-disabled-text-color": "#FF5411",
            "primary-button-hover-color": "#00FFFF",
            "primary-button-disabled-color": "#6495ED",
            "primary-button-border": "1px double black",
            "primary-button-focus-border-color": "#6B8E23",
            "primary-button-text-color": "#D2691E",
            "primary-button-disabled-text-color": "#D26718",
            "radio-button-border-color": "#101010",
            "radio-button-checked-background-color": "#010101",
            "radio-button-hover-border-color": "#131313",
            "radio-button-hover-background-color": "rgba(1, 1, 1, 0.6)",
            "radio-button-disabled-color": "rgba(16, 16, 16, 0.3)",
            "radio-button-disabled-border-color": "rgba(15, 15, 15, 0.3)"
        };

        let highContrastTheme = {
            "close-button-color": "#000080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.65",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "1px double #3CB371",
            "primary-button-hover-shadow": "2px 5px 7px #A12A29",
            "banner-background-color": "#BA55D3",
            "dialog-background-color": "#32CD32",
            "primary-button-color": "#7B68EE",
            "text-color": "#800000",
            "secondary-button-color": "#00FA9A",
            "secondary-button-disabled-color": "#7B68EE",
            "secondary-button-border": "1px dashed #969696",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "#ADD8E6",
            "hyperlink-font-color": "#B0E0E6",
            "secondary-button-hover-color": "#3CB371",
            "secondary-button-hover-border": "1px dashed #B7610B",
            "secondary-button-disabled-border": "1px dashed black",
            "secondary-button-focus-border-color": "#FF8C00",
            "secondary-button-text-color": "#FF1493",
            "secondary-button-disabled-text-color": "#00BFFF",
            "primary-button-hover-color": "#C71585",
            "primary-button-disabled-color": "#9400D3",
            "primary-button-border": "1px double #FFFD00",
            "primary-button-focus-border-color": "#7CFC00",
            "primary-button-text-color": "#800080",
            "primary-button-disabled-text-color": "#00FFFF",
            "radio-button-border-color": "#663399",
            "radio-button-checked-background-color": "#A0522D",
            "radio-button-hover-border-color": "#D2B48C",
            "radio-button-hover-background-color": "rgba(150, 95, 125, 1)",
            "radio-button-disabled-color": "rgba(145, 85, 105, 0.73)",
            "radio-button-disabled-border-color": "rgba(148, 77, 255, 0.73)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes.light = lightTheme;
        themes["high-contrast"] = highContrastTheme;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual(lightTheme);

        expect(cc.themes.dark).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid rgba(0, 0, 0, 0)",
            "primary-button-disabled-border": "1px solid rgba(255, 255, 255, 0)",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "#242424",
            "dialog-background-color": "#171717",
            "primary-button-color": "#4DB2FF",
            "text-color": "#E3E3E3",
            "secondary-button-color": "#171717",
            "secondary-button-disabled-color": "#2E2E2E",
            "secondary-button-border": "1px solid #C7C7C7",
            "background-color-between-page-and-dialog": "rgba(23, 23, 23, 0.6)",
            "dialog-border-color": "#4DB2FF",
            "hyperlink-font-color": "#4DB2FF",
            "secondary-button-hover-color": "#2E2E2E",
            "secondary-button-hover-border": "1px solid #C7C7C7",
            "secondary-button-disabled-border": "1px solid #242424",
            "secondary-button-focus-border-color": "#C7C7C7",
            "secondary-button-text-color": "#E3E3E3",
            "secondary-button-disabled-text-color": "#E3E3E3",
            "primary-button-hover-color": "#0091FF",
            "primary-button-disabled-color": "#4DB2FF",
            "primary-button-border": "1px solid #4DB2FF",
            "primary-button-focus-border-color": "#4DB2FF",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "#E3E3E3",
            "radio-button-checked-background-color": "#E3E3E3",
            "radio-button-hover-border-color": "#4DB2FF",
            "radio-button-hover-background-color": "rgba(227, 227, 227, 0.8)",
            "radio-button-disabled-color": "rgba(227, 227, 227, 0.2)",
            "radio-button-disabled-border-color": "rgba(227, 227, 227, 0.2)"
        });

        expect(cc.themes["high-contrast"]).toEqual(highContrastTheme);
    });

    test("Only miss high-contrast theme", () => {
        let lightTheme = {
            "close-button-color": "#000000",
            "secondary-button-disabled-opacity": "0.7",
            "secondary-button-hover-shadow": "5px 4px 10px red",
            "primary-button-disabled-opacity": "0.7",
            "primary-button-hover-border": "1px double red",
            "primary-button-disabled-border": "1px double white",
            "primary-button-hover-shadow": "5px 4px 10px #171717",
            "banner-background-color": "#00FFFF",
            "dialog-background-color": "#FAEBD7",
            "primary-button-color": "#008B8B",
            "text-color": "#191970",
            "secondary-button-color": "#9370DB",
            "secondary-button-disabled-color": "#FF00FF",
            "secondary-button-border": "1px dashed black",
            "background-color-between-page-and-dialog": "rgba(250, 235, 215, 0.6)",
            "dialog-border-color": "#A52A2A",
            "hyperlink-font-color": "#FF00FF",
            "secondary-button-hover-color": "#BA55D3",
            "secondary-button-hover-border": "1px dashed red",
            "secondary-button-disabled-border": "1px dashed white",
            "secondary-button-focus-border-color": "#C71585",
            "secondary-button-text-color": "#FF4500",
            "secondary-button-disabled-text-color": "#FF5411",
            "primary-button-hover-color": "#00FFFF",
            "primary-button-disabled-color": "#6495ED",
            "primary-button-border": "1px double black",
            "primary-button-focus-border-color": "#6B8E23",
            "primary-button-text-color": "#D2691E",
            "primary-button-disabled-text-color": "#D26718",
            "radio-button-border-color": "#101010",
            "radio-button-checked-background-color": "#010101",
            "radio-button-hover-border-color": "#131313",
            "radio-button-hover-background-color": "rgba(1, 1, 1, 0.6)",
            "radio-button-disabled-color": "rgba(16, 16, 16, 0.3)",
            "radio-button-disabled-border-color": "rgba(15, 15, 15, 0.3)"
        };

        let darkTheme = {
            "close-button-color": "#808080",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "1px 4px 10px black",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "1px double rgba(40, 40, 40, 0.5)",
            "primary-button-disabled-border": "1px double rgba(215, 215, 215, 0.5)",
            "primary-button-hover-shadow": "1px 4px 10px green",
            "banner-background-color": "#F0F8FF",
            "dialog-background-color": "#7FFFD4",
            "primary-button-color": "#FFD700",
            "text-color": "#2F4F4F",
            "secondary-button-color": "#DCDCDC",
            "secondary-button-disabled-color": "#FFFAF0",
            "secondary-button-border": "1px dashed #696969",
            "background-color-between-page-and-dialog": "rgba(240, 237, 255, 0.5)",
            "dialog-border-color": "#0000FF",
            "hyperlink-font-color": "#8A2BE2",
            "secondary-button-hover-color": "#DADADA",
            "secondary-button-hover-border": "1px dashed #FF00FF",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#B22222",
            "secondary-button-text-color": "#4B0082",
            "secondary-button-disabled-text-color": "#0000CD",
            "primary-button-hover-color": "#ADFF2F",
            "primary-button-disabled-color": "#DAA520",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#BC8F8F",
            "primary-button-text-color": "#001FFF",
            "primary-button-disabled-text-color": "#6B8E23",
            "radio-button-border-color": "#212121",
            "radio-button-checked-background-color": "#100011",
            "radio-button-hover-border-color": "#200011",
            "radio-button-hover-background-color": "rgba(16, 0, 17, 0.7)",
            "radio-button-disabled-color": "rgba(130, 250, 221, 0.4)",
            "radio-button-disabled-border-color": "rgba(157, 237, 220, 0.4)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes.light = lightTheme;
        themes.dark = darkTheme;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual(lightTheme);
        expect(cc.themes.dark).toEqual(darkTheme);

        expect(cc.themes["high-contrast"]).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid yellow",
            "primary-button-disabled-border": "1px solid white",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "black",
            "dialog-background-color": "black",
            "primary-button-color": "yellow",
            "text-color": "white",
            "secondary-button-color": "black",
            "secondary-button-disabled-color": "black",
            "secondary-button-border": "1px solid white",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "yellow",
            "hyperlink-font-color": "yellow",
            "secondary-button-hover-color": "black",
            "secondary-button-hover-border": "1px solid yellow",
            "secondary-button-disabled-border": "1px solid black",
            "secondary-button-focus-border-color": "white",
            "secondary-button-text-color": "white",
            "secondary-button-disabled-text-color": "white",
            "primary-button-hover-color": "#FFFF33",
            "primary-button-disabled-color": "yellow",
            "primary-button-border": "1px solid yellow",
            "primary-button-focus-border-color": "yellow",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "white",
            "radio-button-checked-background-color": "white",
            "radio-button-hover-border-color": "yellow",
            "radio-button-hover-background-color": "rgba(255, 255, 255, 0.8)",
            "radio-button-disabled-color": "rgba(255, 255, 255, 0.2)",
            "radio-button-disabled-border-color": "rgba(255, 255, 255, 0.2)"
        });
    });

    test("No themes are passed", () => {
        let callBack = function() { return; };
        let options: IOptions = { };

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual({
            "close-button-color": "#666666",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "none",
            "primary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "banner-background-color": "#F2F2F2",
            "dialog-background-color": "#FFFFFF",
            "primary-button-color": "#0067B8",
            "text-color": "#000000",
            "secondary-button-color": "#EBEBEB",
            "secondary-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "secondary-button-border": "none",
            "background-color-between-page-and-dialog": "rgba(255, 255, 255, 0.6)",
            "dialog-border-color": "#0067B8",
            "hyperlink-font-color": "#0067B8",
            "secondary-button-hover-color": "#DBDBDB",
            "secondary-button-hover-border": "none",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#000000",
            "secondary-button-text-color": "#000000",
            "secondary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "primary-button-hover-color": "#0067B8",
            "primary-button-disabled-color": "rgba(0, 120, 215, 0.2)",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#000000",
            "primary-button-text-color": "#FFFFFF",
            "primary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-border-color": "#000000",
            "radio-button-checked-background-color": "#000000",
            "radio-button-hover-border-color": "#0067B8",
            "radio-button-hover-background-color": "rgba(0, 0, 0, 0.8)",
            "radio-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-disabled-border-color": "rgba(0, 0, 0, 0.2)"
        });

        expect(cc.themes.dark).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid rgba(0, 0, 0, 0)",
            "primary-button-disabled-border": "1px solid rgba(255, 255, 255, 0)",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "#242424",
            "dialog-background-color": "#171717",
            "primary-button-color": "#4DB2FF",
            "text-color": "#E3E3E3",
            "secondary-button-color": "#171717",
            "secondary-button-disabled-color": "#2E2E2E",
            "secondary-button-border": "1px solid #C7C7C7",
            "background-color-between-page-and-dialog": "rgba(23, 23, 23, 0.6)",
            "dialog-border-color": "#4DB2FF",
            "hyperlink-font-color": "#4DB2FF",
            "secondary-button-hover-color": "#2E2E2E",
            "secondary-button-hover-border": "1px solid #C7C7C7",
            "secondary-button-disabled-border": "1px solid #242424",
            "secondary-button-focus-border-color": "#C7C7C7",
            "secondary-button-text-color": "#E3E3E3",
            "secondary-button-disabled-text-color": "#E3E3E3",
            "primary-button-hover-color": "#0091FF",
            "primary-button-disabled-color": "#4DB2FF",
            "primary-button-border": "1px solid #4DB2FF",
            "primary-button-focus-border-color": "#4DB2FF",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "#E3E3E3",
            "radio-button-checked-background-color": "#E3E3E3",
            "radio-button-hover-border-color": "#4DB2FF",
            "radio-button-hover-background-color": "rgba(227, 227, 227, 0.8)",
            "radio-button-disabled-color": "rgba(227, 227, 227, 0.2)",
            "radio-button-disabled-border-color": "rgba(227, 227, 227, 0.2)"
        });

        expect(cc.themes["high-contrast"]).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid yellow",
            "primary-button-disabled-border": "1px solid white",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "black",
            "dialog-background-color": "black",
            "primary-button-color": "yellow",
            "text-color": "white",
            "secondary-button-color": "black",
            "secondary-button-disabled-color": "black",
            "secondary-button-border": "1px solid white",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "yellow",
            "hyperlink-font-color": "yellow",
            "secondary-button-hover-color": "black",
            "secondary-button-hover-border": "1px solid yellow",
            "secondary-button-disabled-border": "1px solid black",
            "secondary-button-focus-border-color": "white",
            "secondary-button-text-color": "white",
            "secondary-button-disabled-text-color": "white",
            "primary-button-hover-color": "#FFFF33",
            "primary-button-disabled-color": "yellow",
            "primary-button-border": "1px solid yellow",
            "primary-button-focus-border-color": "yellow",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "white",
            "radio-button-checked-background-color": "white",
            "radio-button-hover-border-color": "yellow",
            "radio-button-hover-background-color": "rgba(255, 255, 255, 0.8)",
            "radio-button-disabled-color": "rgba(255, 255, 255, 0.2)",
            "radio-button-disabled-border-color": "rgba(255, 255, 255, 0.2)"
        });
    });

    test("Light theme is over provided", () => {
        let lightTheme = {
            "page-color": "#123456",
            "close-button-color": "#000000",
            "secondary-button-disabled-opacity": "0.7",
            "secondary-button-hover-shadow": "5px 4px 10px red",
            "primary-button-disabled-opacity": "0.7",
            "primary-button-hover-border": "1px double red",
            "primary-button-disabled-border": "1px double white",
            "primary-button-hover-shadow": "5px 4px 10px #171717",
            "banner-background-color": "#00FFFF",
            "dialog-background-color": "#FAEBD7",
            "primary-button-color": "#008B8B",
            "text-color": "#191970",
            "secondary-button-color": "#9370DB",
            "secondary-button-disabled-color": "#FF00FF",
            "secondary-button-border": "1px dashed black",
            "thirdButtonColor": "#ABCD55",
            "background-color-between-page-and-dialog": "rgba(250, 235, 215, 0.6)",
            "dialog-border-color": "#A52A2A",
            "hyperlink-font-color": "#FF00FF",
            "secondary-button-hover-color": "#BA55D3",
            "secondary-button-hover-border": "1px dashed red",
            "secondary-button-disabled-border": "1px dashed white",
            "secondary-button-focus-border-color": "#C71585",
            "secondary-button-text-color": "#FF4500",
            "third-button-border": "2px solid rgba(120, 110, 5, 0.8)",
            "secondary-button-disabled-text-color": "#FF5411",
            "primary-button-hover-color": "#00FFFF",
            "primary-button-disabled-color": "#6495ED",
            "primary-button-border": "1px double black",
            "primary-button-focus-border-color": "#6B8E23",
            "primary-button-text-color": "#D2691E",
            "primary-button-disabled-text-color": "#D26718",
            "radio-button-border-color": "#101010",
            "radio-button-checked-background-color": "#010101",
            "radio-button-hover-border-color": "#131313",
            "radio-button-hover-background-color": "rgba(1, 1, 1, 0.6)",
            "radio-button-disabled-color": "rgba(16, 16, 16, 0.3)",
            "radio-button-disabled-border-color": "rgba(15, 15, 15, 0.3)",
            "third-button-hover-color": "rgba(100, 200, 50, 0.7)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes.light = lightTheme;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes.light).toEqual(lightTheme);
    });

    test("New theme is passed", () => {
        let ultraDark = {
            "close-button-color": "#F0FFFF",
            "secondary-button-disabled-opacity": "0.81",
            "secondary-button-hover-shadow": "2px 5px 5px #7FFF00",
            "primary-button-disabled-opacity": "0.75",
            "primary-button-hover-border": "1px inset #008080",
            "primary-button-disabled-border": "1px inset #608070",
            "primary-button-hover-shadow": "2px 2px 5px #A0522D",
            "banner-background-color": "#8B4513",
            "dialog-background-color": "#660066",
            "primary-button-color": "#98FB98",
            "text-color": "#AFEEEE",
            "secondary-button-color": "#FF5299",
            "secondary-button-disabled-color": "#FFC2E0",
            "secondary-button-border": "1px dotted #FFC9B6",
            "background-color-between-page-and-dialog": "rgba(102, 102, 153, 0.62)",
            "dialog-border-color": "#D4FF7D",
            "hyperlink-font-color": "#D175A3",
            "secondary-button-hover-color": "#FFB8FF",
            "secondary-button-hover-border": "1px dotted rgba(240, 199, 128, 0.43)",
            "secondary-button-disabled-border": "1px dotted rgba(220, 109, 8, 0.43)",
            "secondary-button-focus-border-color": "rgba(255, 75, 162, 0.71)",
            "secondary-button-text-color": "#33CCCC",
            "secondary-button-disabled-text-color": "#5252A8",
            "primary-button-hover-color": "#00FF00",
            "primary-button-disabled-color": "#0099BB",
            "primary-button-border": "1px inset #C0C0C0",
            "primary-button-focus-border-color": "#828183",
            "primary-button-text-color": "#FF3300",
            "primary-button-disabled-text-color": "#FF9900",
            "radio-button-border-color": "#9ACD32",
            "radio-button-checked-background-color": "#DC143C",
            "radio-button-hover-border-color": "#DB7093",
            "radio-button-hover-background-color": "rgba(160, 2, 205, 0.91)",
            "radio-button-disabled-color": "rgba(175, 95, 95, 0.43)",
            "radio-button-disabled-border-color": "rgba(118, 97, 155, 0.43)"
        };

        let callBack = function() { return; };
        let options: IOptions = { };
        let themes: IThemes = { };

        themes["ultra-dark"] = ultraDark;
        options.themes = themes;

        let cc = new ConsentControl(testId, "en", callBack, undefined, options);

        expect(cc.themes["ultra-dark"]).toEqual(ultraDark);

        expect(cc.themes.light).toEqual({
            "close-button-color": "#666666",
            "secondary-button-disabled-opacity": "1",
            "secondary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "primary-button-disabled-opacity": "1",
            "primary-button-hover-border": "none",
            "primary-button-disabled-border": "none",
            "primary-button-hover-shadow": "0px 4px 10px rgba(0, 0, 0, 0.25)",
            "banner-background-color": "#F2F2F2",
            "dialog-background-color": "#FFFFFF",
            "primary-button-color": "#0067B8",
            "text-color": "#000000",
            "secondary-button-color": "#EBEBEB",
            "secondary-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "secondary-button-border": "none",
            "background-color-between-page-and-dialog": "rgba(255, 255, 255, 0.6)",
            "dialog-border-color": "#0067B8",
            "hyperlink-font-color": "#0067B8",
            "secondary-button-hover-color": "#DBDBDB",
            "secondary-button-hover-border": "none",
            "secondary-button-disabled-border": "none",
            "secondary-button-focus-border-color": "#000000",
            "secondary-button-text-color": "#000000",
            "secondary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "primary-button-hover-color": "#0067B8",
            "primary-button-disabled-color": "rgba(0, 120, 215, 0.2)",
            "primary-button-border": "none",
            "primary-button-focus-border-color": "#000000",
            "primary-button-text-color": "#FFFFFF",
            "primary-button-disabled-text-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-border-color": "#000000",
            "radio-button-checked-background-color": "#000000",
            "radio-button-hover-border-color": "#0067B8",
            "radio-button-hover-background-color": "rgba(0, 0, 0, 0.8)",
            "radio-button-disabled-color": "rgba(0, 0, 0, 0.2)",
            "radio-button-disabled-border-color": "rgba(0, 0, 0, 0.2)"
        });

        expect(cc.themes.dark).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid rgba(0, 0, 0, 0)",
            "primary-button-disabled-border": "1px solid rgba(255, 255, 255, 0)",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "#242424",
            "dialog-background-color": "#171717",
            "primary-button-color": "#4DB2FF",
            "text-color": "#E3E3E3",
            "secondary-button-color": "#171717",
            "secondary-button-disabled-color": "#2E2E2E",
            "secondary-button-border": "1px solid #C7C7C7",
            "background-color-between-page-and-dialog": "rgba(23, 23, 23, 0.6)",
            "dialog-border-color": "#4DB2FF",
            "hyperlink-font-color": "#4DB2FF",
            "secondary-button-hover-color": "#2E2E2E",
            "secondary-button-hover-border": "1px solid #C7C7C7",
            "secondary-button-disabled-border": "1px solid #242424",
            "secondary-button-focus-border-color": "#C7C7C7",
            "secondary-button-text-color": "#E3E3E3",
            "secondary-button-disabled-text-color": "#E3E3E3",
            "primary-button-hover-color": "#0091FF",
            "primary-button-disabled-color": "#4DB2FF",
            "primary-button-border": "1px solid #4DB2FF",
            "primary-button-focus-border-color": "#4DB2FF",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "#E3E3E3",
            "radio-button-checked-background-color": "#E3E3E3",
            "radio-button-hover-border-color": "#4DB2FF",
            "radio-button-hover-background-color": "rgba(227, 227, 227, 0.8)",
            "radio-button-disabled-color": "rgba(227, 227, 227, 0.2)",
            "radio-button-disabled-border-color": "rgba(227, 227, 227, 0.2)"
        });

        expect(cc.themes["high-contrast"]).toEqual({
            "close-button-color": "#E3E3E3",
            "secondary-button-disabled-opacity": "0.5",
            "secondary-button-hover-shadow": "none",
            "primary-button-disabled-opacity": "0.5",
            "primary-button-hover-border": "1px solid yellow",
            "primary-button-disabled-border": "1px solid white",
            "primary-button-hover-shadow": "none",
            "banner-background-color": "black",
            "dialog-background-color": "black",
            "primary-button-color": "yellow",
            "text-color": "white",
            "secondary-button-color": "black",
            "secondary-button-disabled-color": "black",
            "secondary-button-border": "1px solid white",
            "background-color-between-page-and-dialog": "rgba(0, 0, 0, 0.6)",
            "dialog-border-color": "yellow",
            "hyperlink-font-color": "yellow",
            "secondary-button-hover-color": "black",
            "secondary-button-hover-border": "1px solid yellow",
            "secondary-button-disabled-border": "1px solid black",
            "secondary-button-focus-border-color": "white",
            "secondary-button-text-color": "white",
            "secondary-button-disabled-text-color": "white",
            "primary-button-hover-color": "#FFFF33",
            "primary-button-disabled-color": "yellow",
            "primary-button-border": "1px solid yellow",
            "primary-button-focus-border-color": "yellow",
            "primary-button-text-color": "black",
            "primary-button-disabled-text-color": "black",
            "radio-button-border-color": "white",
            "radio-button-checked-background-color": "white",
            "radio-button-hover-border-color": "yellow",
            "radio-button-hover-background-color": "rgba(255, 255, 255, 0.8)",
            "radio-button-disabled-color": "rgba(255, 255, 255, 0.2)",
            "radio-button-disabled-border-color": "rgba(255, 255, 255, 0.2)"
        });
    });
});