# Consent Banner

## Overview

Consent banner is the library which will generate a banner at the specified position for asking the cookie preferences. 

It contains three buttons, `accept all`, `reject all` and `more info`. If the user clicks `more info` button, A dialog will pop up so that the user can set the cookie categories that he/she wants to share with us.

## Building and running on localhost

First install dependencies:

```sh
npm i
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build
```

## Running

```sh
npm run start
```

## Testing

```sh
npm run test
```

## Example use

This is part of your `html` page.

```HTML
<body>
    ...
    <div id="app"></div>
    ...
</body>
```

If you want to insert a banner into the `<div id="app"></div>`, you can use the following example.

```TypeScript

let cookieCategories: ICookieCategory[] = 
[
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
];

let textResources: ITextResources = {
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
    resetLabel: "Reset all"
};

let callBack = function(obj: any) { console.log(obj); };

// If you want to set 'nonce: test1' in style tag, add "stylesNonce: 'test1'"
let options: IOptions = { 
    textResources: textResources, 
    initialTheme: "dark", 
    stylesNonce: "test1" 
};

let cc = new ConsentControl("app", "en", callBack, cookieCategories, options);
let cookieCategoriePreferences: ICookieCategoriesPreferences = { 
    "c1": undefined, 
    "c2": false, 
    "c3": true
};

// Show a banner with dark theme
cc.showBanner(cookieCategoriePreferences);

let theme: ITheme = {
    "close-button-color": "#000080",
    "secondary-button-disabled-opacity": "1",
    "secondary-button-hover-shadow": "none",
    "primary-button-disabled-opacity": "0.65",
    "primary-button-hover-border": "none",
    "primary-button-disabled-border": "1px double #3CB371",
    "primary-button-hover-shadow": "2px 5px 7px #A12A29",
    "banner-background-color": "#BA5583",
    "dialog-background-color": "#32CD32",
    "primary-button-color": "#4B30AE",
    "text-color": "#800000",
    "secondary-button-color": "#00FA9A",
    "secondary-button-disabled-color": "#7B68EE",
    "secondary-button-border": "1px dashed #969696",
}

// Create a new theme, named "medium"
cc.createTheme("medium", theme);

// Apply the "medium" theme
cc.applyTheme("medium");
```

## Developer Guide

`ConsentControl` consists of 2 main elements: **Banner** and **Preferences Dialog**. Use `containerElementOrId`, `culture`, `onPreferencesChanged`, `cookieCategories`, `options` to create an instance. `culture` will be used to determine the direction of the banner and preferences dialog.

```JavaScript
var cc = new ConsentControl(
    // here the banner will be inserted, can be HTMLElement or element id
    containerElementOrId: string | HTMLElement,

    // culture can be just language "en" or language-country "en-us". 
    // Based on language RTL should be applied (https://www.w3.org/International/questions/qa-scripts.en)
    culture: string,

    // callback function, called on preferences changes (via "Accept All", "Reject All" or "Save changes"), 
    // must pass cookieCategoriePreferences, see ICookieCategoriesPreferences in Data types
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void,

    // optional, see ICookieCategory in Data types
    cookieCategories?: ICookieCategory[],

    // optional, see IOptions in Data types
    options?: IOptions
);
```

+ `setTextResources(textResources: ITextResources)` can be used to set the texts.

+ `createTheme(name: string, theme: ITheme)` can be used to create the new theme. `name` is the name of this new theme, which can be used by `applyTheme(themeName: string)`. `theme` is the new theme object.
    
    `ConsentControl` consists of three built in themes, `light`, `dark`, and `high-contrast`. `dark` and `high-contrast` themes are from [Microsoft Docs](https://docs.microsoft.com/en-us/).

+ You can apply the theme manually by using `applyTheme(themeName: string)`. `themeName` is the name of the theme which you want to apply.

    If you want to apply a new theme, you need to call `createTheme(name: string, theme: ITheme)` first, and then call `applyTheme(themeName: string)`

    ```JavaScript
    let theme: ITheme = {
        "close-button-color": "#000080",
        "secondary-button-disabled-opacity": "1",
        "secondary-button-hover-shadow": "none",
        "primary-button-disabled-opacity": "0.65",
        "primary-button-hover-border": "none",
        "primary-button-disabled-border": "1px double #3CB371",
        "primary-button-hover-shadow": "2px 5px 7px #A12A29",
        "banner-background-color": "#BA5583",
        "dialog-background-color": "#32CD32",
        "primary-button-color": "#4B30AE",
        "text-color": "#800000",
        "secondary-button-color": "#00FA9A",
        "secondary-button-disabled-color": "#7B68EE",
        "secondary-button-border": "1px dashed #969696",
    }

    // Create a new theme, named "medium"
    cc.createTheme("medium", theme);

    // Apply the "medium" theme
    cc.applyTheme("medium");
    ```

    If the name of theme is not in the themes collections, it will throw an error. `new Error("Theme not found error")`

+ `setContainerElement(containerElementOrId: string | HTMLElement)` can be used to set the container element for the banner and preferences dialog. 

    If you pass `HTMLElement`, it will be used as the container. If you pass `string`, the method will use it as the `id` to find the container element.

    ```JavaScript
    cc.setContainerElement("app");
    ```

    or

    ```JavaScript
    let container = document.getElementById('app');
    cc.setContainerElement(container);
    ```
    
    If the container can not be found, it will throw an error. `new Error("Container not found error")`
    
+ `getContainerElement()` will return the current container element.

+ You can set the direction manually by using `setDirection(dir?: string)`. `dir` can be `"ltr"` or `"rtl"`. If `dir` is not passed, it will determine the direction by `dir` attribute in `html`, `body` or `culture`.
    
    ```JavaScript
    // There are 3 cases. dir="rtl", dir="ltr", empty

    // Set direction to rtl (right-to-left)
    cc.setDirection("rtl");

    // Set direction to ltr (left-to-right)
    cc.setDirection("ltr");

    // It will use "dir" attribute in "html" or "body"
    // If the "dir" attribute is not specified, it will apply the direction based on "culture"
    cc.setDirection();
    ```
    
+ `getDirection()` will return the current direction.

### Data types

There are six data types: `ICookieCategory`, `ITextResources`, `ICookieCategoriesPreferences`, `IOptions`, `IThemes`, and `ITheme`.

+ `ICookieCategory` is used to create cookie categories that will be showed in the preferences dialog.

+ `ITextResources` is the texts that will be used in the banner and preferences dialog.

+ `ICookieCategoriesPreferences` is used to store the preferences in each cookie categories.

+ `IOptions` is the options for the banner. It contains four parts, `textResources`, `themes`, `initialTheme`, and `stylesNonce`.

    + `textResources` is the initial text resources for texts.

    + `themes` is a collections of themes that can be applied to the banner and preferences dialog.

    + `initialTheme` is the initial theme that you want to applied before you call `applyTheme(themeName: string)`.

    + `stylesNonce` is the `nonce` attribute for `<style>` tag.
    
    The `nonce` attribute enables you to **whitelist** certain inline script and style elements, while avoiding use of the Content Security Policy ([CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)) unsafe-inline directive (which would allow all inline script/style), so that you still retain the key CSP feature of disallowing inline script/style in general. Also see [CSP: style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) for more information. If `stylesNonce` is undefined, the `nonce` attribute will not be added to `<style>` tag.

+ `IThemes` is a collections of themes. The properties names are the names of each themes, and the values are the theme objects.

+ `ITheme` is the theme object. It contains required properties and optional properties. Optional properties can be calculated by a built in method with required ones.

```TypeScript
// All categories should be replaced with the passed ones in the control
interface ICookieCategory {
    id: string;
    name: string;
    descHtml: string;

    // optional, prevents toggling the category. 
    // True only for categories like Essential cookies.
    isUnswitchable?: boolean;
}

// only the passed text resources should be replaced in the control. 
// If any string is not passed the control should keep the default value
interface ITextResources {
    bannerMessageHtml?: string;
    acceptAllLabel?: string;
    rejectAllLabel?: string;
    moreInfoLabel?: string;
    preferencesDialogCloseLabel?: string;
    preferencesDialogTitle?: string;
    preferencesDialogDescHtml?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    saveLabel?: string;
    resetLabel?: string;
}

interface ICookieCategoriesPreferences {
    [key: string]: boolean | undefined;
}

interface IOptions {
    textResources?: ITextResources;
    themes?: IThemes;
    initialTheme?: string;
    stylesNonce?: string;
}

interface IThemes {
    [key: string]: ITheme | undefined;
    light?: ITheme;
    dark?: ITheme;
    "high-contrast"?: ITheme;
}

interface ITheme {
    // All required properties
    "close-button-color": string;
    "secondary-button-disabled-opacity": string;
    "secondary-button-hover-shadow": string;
    "primary-button-disabled-opacity": string;
    "primary-button-hover-border": string;
    "primary-button-disabled-border": string;
    "primary-button-hover-shadow": string;
    "banner-background-color": string;
    "dialog-background-color": string;
    "primary-button-color": string;
    "text-color": string;
    "secondary-button-color": string;
    "secondary-button-disabled-color": string;
    "secondary-button-border": string;

    // All optional properties
    "background-color-between-page-and-dialog"?: string;
    "dialog-border-color"?: string;
    "hyperlink-font-color"?: string;
    "secondary-button-hover-color"?: string;
    "secondary-button-hover-border"?: string;
    "secondary-button-disabled-border"?: string;
    "secondary-button-focus-border-color"?: string;
    "secondary-button-text-color"?: string;
    "secondary-button-disabled-text-color"?: string;
    "primary-button-hover-color"?: string;
    "primary-button-disabled-color"?: string;
    "primary-button-border"?: string;
    "primary-button-focus-border-color"?: string;
    "primary-button-text-color"?: string;
    "primary-button-disabled-text-color"?: string;
    "radio-button-border-color"?: string;
    "radio-button-checked-background-color"?: string;
    "radio-button-hover-border-color"?: string;
    "radio-button-hover-background-color"?: string;
    "radio-button-disabled-color"?: string;
    "radio-button-disabled-border-color"?: string;
}
```

### Provided methods

+ Methods related to **banner**: `showBanner(cookieCategoriesPreferences: ICookieCategoriesPreferences)` and `hideBanner()`
+ Methods related to **Preferences Dialog**: `showPreferences(cookieCategoriesPreferences: ICookieCategoriesPreferences)` and `hidePreferences()`

Also see `ICookieCategoriesPreferences` in [Data types](#data-types)

```JavaScript
// Insert all necessary HTML code and shows the banner. 
// Until this method is called there should be no HTML elements of the Consent Control anywhere in the DOM. 
// Only one banner will be created. 
// If call it many times, it will only display the last one and remove all previous banners.
cc.showBanner(
    cookieCategoriesPreferences: ICookieCategoriesPreferences
);

// Hides the banner and the Preferences Dialog. 
// Removes all HTML elements of the Consent Control from the DOM
cc.hideBanner();

// Shows Preferences Dialog. Leaves banner state unchanged. 
// It is used to insert HTML code for the preferences dialog.
cc.showPreferences(
    cookieCategoriesPreferences: ICookieCategoriesPreferences
);

// Hides Preferences Dialog. Removes all HTML elements of the Preferences Dialog from the DOM. 
// Leaves banner state unchanged
cc.hidePreferences();
```

### Custom settings

1. Change the width of buttons in banner: Change `$bannerBtnWidth` in `styles.scss`

2. `webpack.dev.js` file is for development purpose, and `webpack.prod.js` is for production. `webpack.common.js` is the common parts in both `webpack.dev.js` and `webpack.prod.js`. Both `webpack.dev.js` and `webpack.prod.js` require `webpack.common.js`. There are two differences between `webpack.dev.js` and `webpack.prod.js`. `localIdentName` in `use/options/modules` under `module/rules` only uses hash in production mode. Only development mode contains `devServer`. The `headers` in `devServer` can be used to set `CSP`. The default `nonce` is `test1`.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
