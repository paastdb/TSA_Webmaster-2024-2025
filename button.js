document.addEventListener("click", function (event) {
    const screenWidth = window.innerWidth;
    const clickX = event.clientX;

    if (clickX < screenWidth / 2) {
        activateLeftButton();
    } else {
        activateRightButton();
    }
});

function activateLeftButton() {
    const leftButton = document.getElementById("prev");
    if (leftButton) leftButton.click();
}

function activateRightButton() {
    const rightButton = document.getElementById("next");
    if (rightButton) rightButton.click();
}
