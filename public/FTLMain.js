const startButton = document.querySelector("#start-button");
const introButton = document.querySelector("#intro-button");
const northButton = document.querySelector("#north");
const eastButton = document.querySelector("#east");
const southButton = document.querySelector("#south");
const westButton = document.querySelector("#west");

const getIntroMessage = function () {
  fetch("/intro")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
introButton.addEventListener("click", getIntroMessage);
//////////////////////////////////////////////////////////////////////////////
const getStartMessage = function () {
  fetch("/startGame")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
startButton.addEventListener("click", getStartMessage);
////////////////////////////////////////////////////////////////////////////
const getMoveNorthMessage = function () {
  fetch("/dirnorth")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
northButton.addEventListener("click", getMoveNorthMessage);
////////////////////////////////////////////////////////////////////////////

const getMoveEastMessage = function () {
  fetch("/direast")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
eastButton.addEventListener("click", getMoveEastMessage);
////////////////////////////////////////////////////////////////////////////
const getMoveSouthMessage = function () {
  fetch("/dirsouth")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
southButton.addEventListener("click", getMoveSouthMessage);
////////////////////////////////////////////////////////////////////////////
const getMoveWestMessage = function () {
  fetch("/dirwest")
    .then((res) => res.text())
    .then((message) => {
      let messageDisplay = document.getElementById("mainMessageDisplay");
      messageDisplay.innerText = message;
    });
};
westButton.addEventListener("click", getMoveWestMessage);
