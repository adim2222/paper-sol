const balance = document.querySelector(".balance");
const setBalance = document.querySelector(".set-balance");

setBalance.addEventListener("input", () => {
    balance.innerHTML = setBalance.value;
});