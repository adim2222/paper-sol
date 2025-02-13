const sidebar = document.querySelector(".p-show__sb");
const paperGui = document.createElement("div");

let settings = localStorage.getItem("psol-settings") || {
    guiPosition: 4,
    balance: 1,
};

const updateSetting = (setting, value) => {
    settings[setting] = value;
    console.log(settings[setting]);
    localStorage.setItem("psol-settings", settings);
};

const getCurrentMcap = () => {
    const mcapElement = document.querySelector(".js-cable-val__mktcap");
    const mcap = mcapElement.getAttribute("data-value");
    return mcap;
}

const buy = (buyAmount) => {

};

const sell = (sellAmount) => {

};

const insertGUI = () => {
    paperGui.innerHTML = `
        <div class="p-show__widget paper-gui">
            <div class="header">
                <img src="https://i.imgur.com/MbMiItC.png" width="20%">
                <p class="balance-display"></p>
            </div>
            <div class="buy-gui">
                <input class="buy-amount" placeholder=" Amount to buy" type="text" pattern="[0-9]">
                <button class="buy-button">Buy</button>
            </div>
            <div class="settings">
                <button class="toggle-settings"></button>
                <div class="settings-list">
                    <div class="setting">
                        <p>Interface position:</p>
                        <div class="setting-options">
                            <button class="move-gui-up">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 9H10V16H6V9L3 9V8L8 3L13 8V9Z" fill="#FFFFFF"/><path d="M14 2H2V0H14V2Z" fill="#FFFFFF"/></svg>
                            </button>
                            <button class="move-gui-down">
                                <svg transform="rotate(180)" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 9H10V16H6V9L3 9V8L8 3L13 8V9Z" fill="#FFFFFF"/><path d="M14 2H2V0H14V2Z" fill="#FFFFFF"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    sidebar.insertBefore(paperGui, sidebar.childNodes[settings.guiPosition]);

    const toggleSettings = document.querySelector(".toggle-settings");
    const settingsList = document.querySelector(".settings-list");
    settingsList.style.display = "none";
    toggleSettings.addEventListener("click", () => {
        if (settingsList.style.display === "none") {
            settingsList.style.display = "block";
        } else {
            settingsList.style.display = "none";
        }
    });

    const guiPosUpButton = document.querySelector(".move-gui-up");
    const guiPosDownButton = document.querySelector(".move-gui-down");
    guiPosUpButton.addEventListener("click", () => {
        updateSetting("guiPosition", settings.guiPosition - 2);
        insertGUI();
    });
    guiPosDownButton.addEventListener("click", () => {
        updateSetting("guiPosition", settings.guiPosition + 2);
        insertGUI();
    });


    const balanceDisplay = document.querySelector(".balance-display");
    balanceDisplay.innerHTML = settings.balance;
    console.log("gui inserted");
};

const init = () => {
    insertGUI();
    console.log("paper.sol initialized");
};

init();