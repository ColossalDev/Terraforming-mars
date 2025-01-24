let playerInfo = document.querySelector(".player-info-container");
const playerEntry = document.querySelector(".player-entry-container");
const playerScores = document.getElementsByClassName("score");
const mainContainer = document.querySelector("main-container");
let playerScoreContainer = document.querySelector(".score-container");
const playerTotal = document.querySelector(".total");
let nameElement = document.querySelector(".name-input");
nameElement.focus();
let colourElements = document.querySelectorAll(".colour");
let nameChoice = nameElement.value;
let numberInput = document.querySelector(".number-input");
const numberInputIcon = document.querySelector(".svg");
const btnContainer = document.querySelector(".btn-container");
let targetElement;
let score = 0;
let scoreNumber = 0;
let playerCount = 0;
let players = [];
let player;
let textColour = "black";
let error = false;
let playerColour = "";
let clickPlayerScore = [];

function Player(
  player,
  name,
  colour,
  tr,
  awards,
  milestones,
  board,
  cards,
  total
) {
  this.player = player;
  this.name = name;
  this.colour = colour;
  this.tr = tr;
  this.awards = awards;
  this.milestones = milestones;
  this.board = board;
  this.cards = cards;
  this.total = total;
}

// function Player(player, name, colour, ...scores) {
//   this.player = player;
//   this.name = name;
//   this.colour = colour;
//   this.scores = new Scores(...scores);
// }

// function Scores(tr, awards, milestones, board, cards, total) {
//   this.tr = tr;
//   this.awards = awards;
//   this.milestones = milestones;
//   this.board = board;
//   this.cards = cards;
//   this.total = total;
// }

// Event listeners for Reset, Finish, Restart

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);
const finishBtn = document.querySelector(".finish-btn");
finishBtn.addEventListener("click", finishSetup);
const restartBtn = document.querySelector(".restart-btn");
restartBtn.addEventListener("click", restart);
restartBtn.classList.add("hide");

// Event Listener for picking colour choice

colourElements.forEach(function (colourElement) {
  colourElement.addEventListener("click", pickColour);
});

// Functions

function pickColour(e) {
  confirmName();
  if (error) {
    return;
  } else {
    const element = e.target;
    const compStyles = window.getComputedStyle(element);

    let background = compStyles.getPropertyValue("background-color");

    if (background === "rgb(255, 0, 0)") {
      confirmName();
      playerColour = "red";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(255, 255, 0)") {
      confirmName();
      playerColour = "yellow";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 128, 0)") {
      confirmName();
      playerColour = "green";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 0, 255)") {
      confirmName();
      playerColour = "blue";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 0, 0)") {
      confirmName();
      playerColour = "black";
      element.classList.add("hide");
      createPlayer();
    } else {
    }
    nameElement.value = "";
    return playerColour;
  }
}

function confirmName() {
  nameChoice = nameElement.value;
  // Check text exists in player name input and error if none exists
  if (typeof nameChoice === "string" && nameChoice.length === 0) {
    // errorDiv.classList.remove("hide");
    // errorDiv.innerHTML = `Please add a name`;
    const root = document.documentElement;
    console.log(root);

    const currentColour = getComputedStyle(root).getPropertyValue(
      "--placeholder-color"
    );
    console.log(currentColour);

    root.style.setProperty("--placeholder-color", "#ff0000");
    console.log(root.style);

    nameElement.placeholder = "     Required";
    console.log(currentColour);

    setTimeout(display, 2000);
    function display() {
      // errorDiv.classList.add("hide");
      // errorDiv.innerHTML = "";

      const root = document.documentElement;
      const currentColour = getComputedStyle(root).getPropertyValue(
        "--placeholder-color"
      );
      root.style.setProperty("--placeholder-color", "black");
      nameElement.placeholder = "Player name";
    }
    error = true;
    return error;
  } else {
    error = false;
    return error;
  }
}

function createPlayer() {
  playerCount += 1;
  playerName = nameElement.value;
  colour = playerColour;
  player = new Player(playerCount, playerName, colour, 0, 0, 0, 0, 0, 0);
  players.push(player);
  addPlayerHTML();

  if (playerCount == 5) {
    finishSetup();
  }
  return playerCount;
}

function addPlayerHTML() {
  playerColour = players[playerCount - 1].colour;
  if (playerColour == "blue" || playerColour == "black") {
    textColour = "white";
  }
  if (playerColour == "yellow") {
    textColour = "black";
  }

  const playerHtml = elementFromHtml(
    `<div style="background-color:${playerColour};color:${textColour}" class="score-container"><div class="name">${playerName}</div><div class="score tr">${player.tr}</div><div class="score awards">${player.awards}</div><div class="score milestones">${player.milestones}</div><div class="score board">${player.board}</div><div class="score cards">${player.cards}</div><div class="total">${player.total}</div></div>`
  );

  playerInfo.appendChild(playerHtml);

  addClickableScores();
}

function elementFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function addClickableScores() {
  let clickPlayerScore = Array.from(playerScores);

  clickPlayerScore.forEach(function (clickableScore) {
    clickableScore.addEventListener("click", addScoreToHTML);
  });
}

function addScoreToHTML(e) {
  const targetElement = e.target;
  let clickPlayerScore = Array.from(playerScores);

  const playerHtml = elementFromHtml(
    `<input class="number-input" type="number" size=3 min="0" max = "999" required></input>`
  );

  const checkIconContainer = elementFromHtml(
    `<div class="icon-container"></div>`
  );
  const checkIcon =
    elementFromHtml(`<svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path
    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
  />
</svg>`);

  targetElement.innerHTML = "";
  targetElement.appendChild(playerHtml);
  targetElement.appendChild(checkIconContainer);
  targetElement.appendChild(checkIcon);
  console.log(e.target);

  const element = e.target;
  const compStyles = window.getComputedStyle(element);
  let background = compStyles.getPropertyValue("background-color");
  console.log(background);

  // if (background === "rgba(0, 0, 0, 0)" || background === "rgb(255, 255, 0") {
  //   let svg = document.querySelector("svg");
  //   console.log(svg);
  //   svg.classList.add("white-svg");
  // }

  // // Reset svg colour back to black
  // let svg = document.querySelector("svg");
  // console.log(svg);
  // svg.classList.remove("white-svg");
  // svg.classList.add("black-svg");

  playerHtml.focus();
  checkIcon.addEventListener;

  checkIcon.addEventListener("click", displayNumber);
}

function displayNumber(e) {
  let numberInput = document.querySelector(".number-input");

  scoreNumber = numberInput.value;
  // let score = scoreNumber;

  confirmNumber(scoreNumber);

  let target = e.currentTarget.parentElement;
  target.textContent = scoreNumber;

  // remove event listener to number confirm icon

  // let checkIcon = document.querySelector(".svg");
  // checkIcon.removeEventListener("click", displayNumber);

  // re-add event listener to score boxes
  addClickableScores();

  updateTotal(target);
}

function confirmNumber(scoreNumber) {
  // Reveal new added number input field to the DOM

  if (scoreNumber < 0 || scoreNumber > 9999) {
    btnContainer.innerHTML = "Between 0 and below 9999";
    setTimeout(display, 2000);
    function display() {
      btnContainer.innerHTML = "";
    }
    scoreNumber = 0;
    return scoreNumber;
  } else {
    // console.log(scoreNumber);
    // addNumberToPlayerObject(scoreNumber);
  }
}

function updateTotal(target) {
  playerScoreContainer = document.querySelector(".score-container");
  playerInfo = document.querySelector(".player-info-container");

  score = target.textContent;
  let = parsedScore = parseInt(score);
  console.log(parsedScore);

  players.forEach(function () {
    if (target.classList.contains("tr")) {
      player.tr = parsedScore;
    }
    if (target.classList.contains("awards")) {
      player.awards = parsedScore;
    }
    if (target.classList.contains("milestones")) {
      player.milestones = parsedScore;
    }
    if (target.classList.contains("board")) {
      player.board = parsedScore;
    }
    if (target.classList.contains("cards")) {
      player.cards = parsedScore;
    }
    total =
      Number(player.tr) +
      Number(player.awards) +
      Number(player.milestones) +
      Number(player.board) +
      Number(player.cards);

    player.total = total;

    if (total === NaN) {
      total = 0;
    }

    let currentTotalTarget = Array.from(playerInfo.childNodes);
    console.log(currentTotalTarget);

    console.log(playerCount);

    currentTotalTarget[playerCount - 1].childNodes[6].textContent = total;
  });
}

function reset() {
  players = [];
  console.log(players);
  // Reset player Count
  playerCount = 0;
  // Clear Player Info area
  playerInfo.innerHTML = "";
  colourElements.forEach(function (colourElement) {
    colourElement.classList.remove("hide");

    colourElement.addEventListener("click", pickColour);
  });
}

function reset() {
  console.log(nameElement.placeholder instanceof Element);
}

function finishSetup() {
  playerEntry.classList.add("hide");
  restartBtn.classList.remove("hide");
}
function restart() {
  playerEntry.classList.remove("hide");
  restartBtn.classList.add("hide");
}
