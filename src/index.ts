import styles from "./styles.scss";

console.log("aabcd");

// Add <meta name="viewport" content="width=device-width, initial-scale=1.0">
// for responsive web design
if (!document.querySelector('meta[name="viewport"]')) {
    let meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    document.getElementsByTagName('head')[0].appendChild(meta);
}

// Insert point for banner
let insert = document.querySelector('#app');

let infoIcon = `
<svg xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' viewBox='0 0 44 44' height='24px' fill='none' stroke='currentColor'>
  <circle cx='22' cy='22' r='20' stroke-width='2'></circle>
  <line x1='22' x2='22' y1='18' y2='33' stroke-width='3'></line>
  <line x1='22' x2='22' y1='12' y2='15' stroke-width='3'></line>
</svg>
`;

const banner = 
`
    <div class="${styles.bannerBody}" role="alert">
        <div class="${styles.bannerInform}">
            <span class="${styles.infoIcon}" aria-label="Information message">${infoIcon}</span> <!--  used for icon  -->
            <p class="${styles.bannerInformBody}">
                We use optional cookies to provide a better experience, read more about them 
                <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank">here</a>.
            </p>
        </div>

        <div class="${styles.buttonGroup}">
            <button type="button" class="${styles.bannerButton}">Accept all</button>
            <button type="button" class="${styles.bannerButton}">Reject all</button>
            <button type="button" class="${styles.bannerButton}">More info</button>
        </div>
    </div>

    <!-- The Modal -->
    <div class="${styles.cookieModal}">
        <div role="dialog" aria-modal="true" aria-label="Flow scroll" class="${styles.modalContainer}">
            <span role="button" aria-label="Close dialog" class="${styles.closeModalIcon}">&#x2715;</span>
            <div role="setting" class="${styles.modalBody}">
                <div class="${styles.modalTitle}">Manage cookie preferences</div>
                
                <form class="${styles.modalContent}">
                    <p class="${styles.cookieStatement}">
                        Most Microsoft sites use cookies, small text files placed on your device which web servers in 
                        the domain that placed the cookie can retrieve later. We use cookies to store your preferences 
                        and settings, help with sign-in, provide targeted ads, and analyze site operations. 
                        For more information, see the 
                        <a href="https://privacy.microsoft.com/en-us/privacystatement#maincookiessimilartechnologiesmodule" target="_blank">
                            Cookies and similar technologies section of the Privacy Statement
                        </a>.
                    </p>

                    <ol class="${styles.cookieOrderedList}">
                        <li class="${styles.cookieListItem}">Essential cookies</li>
                        <span class="${styles.cookieListItemDescription}">
                            We use essential cookies to do things.
                        </span>
                
                        <li class="${styles.cookieListItem}">Performance & analytics</li>
                        <span class="${styles.cookieListItemDescription}">
                            We use performance & analytics cookies to track how things are working. Message text. This 
                            is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                        </span>
                        <div class="${styles.cookieItemRadioBtnGroup}">
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="performanceCookies" class="${styles.cookieItemRadioBtn}" value="accept">
                                <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                            </label>
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="performanceCookies" class="${styles.cookieItemRadioBtn}" value="reject">
                                <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                            </label>
                        </div>

                        <li class="${styles.cookieListItem}">Advertising/Marketing</li>
                        <span class="${styles.cookieListItemDescription}">
                            We use advertising/marketing cookies to provide our partners with data. Message text. This 
                            is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                        </span>
                        <div class="${styles.cookieItemRadioBtnGroup}">
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="advertisingCookies" class="${styles.cookieItemRadioBtn}" value="accept">
                                <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                            </label>
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="advertisingCookies" class="${styles.cookieItemRadioBtn}" value="reject">
                                <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                            </label>
                        </div>

                        <li class="${styles.cookieListItem}">Targeting/personalization</li>
                        <span class="${styles.cookieListItemDescription}">
                            We use targeting/personalization cookies to enhance the quality of ads you see. Message text. 
                            This is where the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                        </span>
                        <div class="${styles.cookieItemRadioBtnGroup}">
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="targetingCookies" class="${styles.cookieItemRadioBtn}" value="accept">
                                <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                            </label>
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="targetingCookies" class="${styles.cookieItemRadioBtn}" value="reject">
                                <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                            </label>
                        </div>

                        <li class="${styles.cookieListItem}">Social media</li>
                        <span class="${styles.cookieListItemDescription}">
                            We use social media cookies to improve the experience you see. Message text. This is where 
                            the message dialog text goes. The text can wrap and wrap and wrap and wrap.
                        </span>
                        <div class="${styles.cookieItemRadioBtnGroup}">
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="socialMediaCookies" class="${styles.cookieItemRadioBtn}" value="accept">
                                <span class="${styles.cookieItemRadioBtnLabel}">Accept</span>
                            </label>
                            <label class="${styles.cookieItemRadioBtnCtrl}">
                                <input type="radio" name="socialMediaCookies" class="${styles.cookieItemRadioBtn}" value="reject">
                                <span class="${styles.cookieItemRadioBtnLabel}">Reject</span>
                            </label>
                        </div>
                    </ol>
                </form>
                
                <div class="${styles.modalButtonGroup}">
                    <button type="button" class="${styles.modalButtonSave}" disabled>Save changes</button>
                    <button type="button" class="${styles.modalButtonReset}" disabled>Reset all</button>
                </div>
            </div>
        </div>
    </div>
`;

if (insert) {
    insert.innerHTML = banner;
}

let cookieInfo = document.getElementsByClassName(`${styles.bannerButton}`)[2];
let modal: HTMLElement = <HTMLElement> document.getElementsByClassName(`${styles.cookieModal}`)[0];
let closeModalIcon = document.getElementsByClassName(`${styles.closeModalIcon}`)[0];

let cookieItemRadioBtn: Element[] = Array.from(document.getElementsByClassName(`${ styles.cookieItemRadioBtn }`));
let modalButtonSave: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(`${ styles.modalButtonSave }`)[0];
let modalButtonReset: HTMLInputElement = <HTMLInputElement> document.getElementsByClassName(`${ styles.modalButtonReset }`)[0];

function popup() {
    if (modal) {
        modal.style.display = 'block';
    }
}

function close() {
    if (modal) {
        modal.style.display = 'none';
    }
}

function enableModalButtons() {
    if (modalButtonSave) {
        modalButtonSave.disabled = false;
    }

    if (modalButtonReset) {
        modalButtonReset.disabled = false;
    }
}

if (cookieInfo) {
    cookieInfo.addEventListener('click', popup);

    // Add this line in case some browsers in mobile do not like click event 
    // cookieInfo.addEventListener('touchstart', popup);
}

if (closeModalIcon) {
    closeModalIcon.addEventListener('click', close);
}

if (cookieItemRadioBtn && cookieItemRadioBtn.length) {
    for (let radio of cookieItemRadioBtn) {
        radio.addEventListener('click', enableModalButtons);
    }
}
