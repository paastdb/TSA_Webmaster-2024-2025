document.addEventListener("click", function (event) {
    const leftButton = document.getElementById("next")

    if (leftButton) {
        activateLeftButton();
    }
});

function activateLeftButton() {
    const leftButton = document.getElementById("next");
    if (leftButton) leftButton.click();
}
