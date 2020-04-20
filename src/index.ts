import styles from "./styles.scss";

console.log("aabcd");

// Insert point for banner
let insert = document.querySelector('#app');

const banner = 
`
    <div class="${styles.bannerBody}" role="alert">
        <div class="${styles.bannerInform}">
            <span class="${styles.infoIcon}" aria-label="Information message">&#9432;</span> <!--  used for icon  -->
            <p class="${styles.bannerInformBody}">
                We use optional cookies to provide a better experience, read more about them 
                <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank">here</a>.
            </p>
        </div>

        <div class="${styles.buttonGroup}">
            <button type="button" class="${styles.bannerButton}">Accept all</button>
            <button type="button" class="${styles.bannerButton}">Reject all</button>
            <button type="button" class="${styles.bannerButton}" id="cookieInfo">More info</button>
        </div>
    </div>
`;

if (insert) {
    insert.innerHTML = banner;
}
