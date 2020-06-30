# consent-banner

Consent banner is the library which will generate a banner at the specified position for asking the cookie preferences. 

It contains two buttons, `accept all` and `more info`. If the user clicks `more info` button, A dialog will pop up so that the user can set the cookie categories that he/she wants to share with us.

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
import { ConsentControl } from './consent-banner.js';

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
    bannerMessageHtml = "We use optional cookies to provide... read <a href='link'>here</a>.",
    acceptAllLabel = "Accept all",
    moreInfoLabel = "More info",
    preferencesDialogCloseLabel = "Close",
    preferencesDialogTitle = "Manage cookie preferences",
    preferencesDialogDescHtml = "Most Microsoft sites...",
    acceptLabel = "Accept",
    rejectLabel = "Reject",
    saveLabel = "Save changes",
    resetLabel = "Reset all"
};

let callBack = function(obj: any) { console.log(obj); };

let cc = new ConsentControl("app", "en", callBack, cookieCategories, textResources);
let cookieCategoriePreferences: ICookieCategoriesPreferences = { "c1": undefined, "c2": false, "c3": true };

cc.showBanner(cookieCategoriePreferences);
```

## Developer Guide

`ConsentControl` consists of 2 main elements: **Banner** and **Preferences Dialog**. Use `containerElementOrId`, `culture`, `onPreferencesChanged`, `cookieCategories`, `textResources` to create an instance.

```JavaScript
var cc = new ConsentControl(
    containerElementOrId: string | HTMLElement,   // here the banner will be inserted, can be HTMLElement or element id
    culture: string,                // culture can be just language "en" or language-country "en-us". Based on language RTL should be applied (https://www.w3.org/International/questions/qa-scripts.en)
    onPreferencesChanged: (cookieCategoriesPreferences: ICookieCategoriesPreferences) => void,   // callback function, called on preferences changes (via "Accept All" or "Save changes"), must pass cookieCategoriePreferences, see ICookieCategoriesPreferences in Data types
    cookieCategories?: ICookieCategory[],       // optional, see ICookieCategory in Data types
    textResources?: ITextResources          // optional, see ITextResources in Data types
);
```

### Data types

There are three data types: `ICookieCategory`, `ITextResources` and `ICookieCategoriesPreferences`.

`ICookieCategory` is used to create cookie categories that will be showed in the preferences dialog.

`ITextResources` is the texts that will be used in the banner and preferences dialog.

`ICookieCategoriesPreferences` is used to store the preferences in each cookie categories.

```TypeScript
// All categories should be replaced with the passed ones in the control
interface ICookieCategory {
    id: string;
    name: string;
    descHtml: string;
    isUnswitchable?: boolean;       // optional, prevents toggling the category. True only for categories like Essential cookies.
}

// only the passed text resources should be replaced in the control. If any string is not passed the control should keep the default value
interface ITextResources {
    bannerMessageHtml?: string;
    acceptAllLabel?: string;
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
```

### Provided methods

Methods related to **banner**: `showBanner(cookieCategoriesPreferences: ICookieCategoriesPreferences)` and `hideBanner()`

Methods related to **Preferences Dialog**: `showPreferences(cookieCategoriesPreferences: ICookieCategoriesPreferences)` and `hidePreferences()`

```JavaScript
// Insert all necessary HTML code and shows the banner. Until this method is called there should be no HTML elements of the Consent Control anywhere in the DOM
cc.showBanner(
    cookieCategoriesPreferences: ICookieCategoriesPreferences      // see ICookieCategoriesPreferences in Data types
);

// Hides the banner and the Preferences Dialog. Removes all HTML elements of the Consent Control from the DOM
cc.hideBanner();

// Shows Preferences Dialog. Leaves banner state unchanged
cc.showPreferences(
    cookieCategoriesPreferences: ICookieCategoriesPreferences      // see ICookieCategoriesPreferences in Data types
);

// Hides Preferences Dialog. Removes all HTML elements of the Preferences Dialog from the DOM. Leaves banner state unchanged
cc.hidePreferences();
```

### Custom settings

1. Change the width of buttons in banner: Change `$bannerBtnWidth` in `styles.scss`

