const sidebar = document.querySelector(".p-show__sb");
const paperGui = document.createElement("div");

let settings = localStorage.getItem("psol-settings") || {
    guiPosition: 4,
    balance: 1,
    buyAmounts: [0.2, 0.3, 0.4, 0.5],
    sellAmounts: [0.2, 0.5, 0.75, 1]
};

const updateSetting = (setting, value) => {
    settings[setting] = value;
    console.log(settings[setting]);
    localStorage.setItem("psol-settings", JSON.stringify(settings));
};

const getCurrentMcap = () => {
    const mcapElement = document.querySelector(".js-cable-val__mktcap");
    const mcap = mcapElement.getAttribute("data-value");
    return mcap;
}

const buyPoints = [];

const buy = (buyAmount) => {
    settings.balance -= buyAmount;
    balanceDisplay.innerHTML = settings.balance;
    buyPoints.push(buyAmount / getCurrentMcap());
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
            <div class="buy-selector">
                <div class="quick-buy-select-gui">
                    <button class="buy-select value-selector"></button>
                    <button class="buy-select value-selector"></button>
                    <button class="buy-select value-selector"></button>
                    <button class="buy-select value-selector"></button>
                </div>
                <div class="buy-gui">
                    <input class="buy-amount" placeholder="Amount to buy" type="text" pattern="[0-9]">
                    <button class="buy-button">Buy</button>
                </div>
            </div>
            <div class="sell-selector">
                <div class="quick-sell-select-gui">
                    <button class="sell-select value-selector"></button>
                    <button class="sell-select value-selector"></button>
                    <button class="sell-select value-selector"></button>
                    <button class="sell-select value-selector"></button>
                </div>
                <div class="sell-gui">
                    <input class="sell-amount" placeholder="Precentage to sell" type="text" pattern="[0-9]">
                    <button class="sell-button">Sell</button>
                </div>
            </div>
            <button class="sell-switch">Switch to sell</button>
            <div class="settings">
                <button class="toggle-settings"></button>
                <div class="settings-list">
                    <div class="setting">
                        <p>Label:</p>
                        <div class="setting-options">
                            xddd
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    sidebar.insertBefore(paperGui, sidebar.childNodes[settings.guiPosition]);

    const buyAmount = document.querySelector(".buy-amount");
    const buySelectList = document.querySelectorAll(".buy-select");
    for (let i = 0; i < buySelectList.length; i++) {
        buySelectList[i].innerHTML = settings.buyAmounts[i];
        buySelectList[i].addEventListener("click", () => {
            buyAmount.value = parseFloat(buySelectList[i].innerHTML);
        });
    };

    const buyButton = document.querySelector(".buy-button");
    buyButton.addEventListener("click", () => {
        buy(buyAmount.value);
    });

    const sellAmount = document.querySelector(".sell-amount");
    const sellSelectList = document.querySelectorAll(".sell-select");
    for (let i = 0; i < sellSelectList.length; i++) {
        sellSelectList[i].innerHTML = settings.sellAmounts[i];
        sellSelectList[i].addEventListener("click", () => {
            sellAmount.value = parseFloat(sellSelectList[i].innerHTML);
        });
    }

    let selling = false;
    const sellSwitch = document.querySelector(".sell-switch");
    sellSwitch.addEventListener("click" , () => {
        if (!selling) {
            sellSwitch.innerHTML = "Switch to buy";
            document.querySelector(".buy-selector").style.display = "none";
            document.querySelector(".sell-selector").style.display = "block";
        } else {
            sellSwitch.innerHTML = "Switch to sell";
            document.querySelector(".buy-selector").style.display = "block";
            document.querySelector(".sell-selector").style.display = "none";
        }
        selling = !selling;
    });

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

    const balanceDisplay = document.querySelector(".balance-display");
    balanceDisplay.innerHTML = settings.balance;
    console.log("gui inserted");
};

const init = () => {
    insertGUI();
    console.log("paper.sol initialized");
};

init();