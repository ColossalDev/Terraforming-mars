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

// Set up Player Object

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

// Event listeners for Reset

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

// Event Listener for picking colour choice

colourElements.forEach(function (colourElement) {
  colourElement.addEventListener("click", pickColour);
});

// Functions

// ****** LOCAL STORAGE **********

// function addToLocalStorage(player) {
//   // let players = getLocalStorage();
//   console.log(player);

//   localStorage.setItem("players", JSON.stringify(players));
// }

function pickColour(e) {
  // Check name box is filled and error without adding HTML for player
  confirmName();

  if (error) {
    return;
  } else {
    // Retrieve colour of box that was chosen and
    const element = e.target;
    const compStyles = window.getComputedStyle(element);

    let background = compStyles.getPropertyValue("background-color");

    if (background === "rgb(255, 0, 0)") {
      // confirmName();
      playerColour = "red";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(255, 255, 0)") {
      // confirmName();
      playerColour = "yellow";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 128, 0)") {
      // confirmName();
      playerColour = "green";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 0, 255)") {
      // confirmName();
      playerColour = "blue";
      element.classList.add("hide");
      createPlayer();
    } else if (background === "rgb(0, 0, 0)") {
      // confirmName();
      playerColour = "black";
      element.classList.add("hide");
      createPlayer();
    } else {
    }
    // Reset to the placeholder value in input field.
    nameElement.value = "";
    return playerColour;
  }
}

function confirmName() {
  // assign name value to nameChoice

  nameChoice = nameElement.value;

  // Check text exists in player name input and error if none exists

  if (typeof nameChoice === "string" && nameChoice.length === 0) {
    // If name does not exist then Error message with RED text colour change in input box

    //Change input placeholder colour to Red and then back to black after 2 seconds
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
  console.log(player);
  console.log(players);

  // addToLocalStorage(player);

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
  // loop over players and add click events to all score boxes
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

  // Set svg colour to white if background is black or

  // const element = e.target;
  // const compStyles = window.getComputedStyle(element);
  // let background = compStyles.getPropertyValue("background-color");
  // console.log(background);

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
  // console.log(svg);

  playerHtml.focus();
  checkIcon.addEventListener;

  checkIcon.addEventListener("click", displayNumber);
}

function displayNumber(e) {
  let numberInput = document.querySelector(".number-input");

  scoreNumber = numberInput.value;

  if (scoreNumber == "") {
    scoreNumber = 0;
  }
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
  // total score on correct player

  playerScoreContainer = document.querySelector(".score-container");

  currentlyTargetedPlayer = target.parentElement.firstElementChild.textContent;
  console.log(currentlyTargetedPlayer);

  scores = Array.from(playerScoreContainer.childNodes);

  // Work out what player has been clicked on to update correct total

  // Loop over current players in players array and amend the score in object

  for (let i = 0; i < players.length; i++) {
    currentPlayer = players[i].name;
    console.log(players[i].name);
    // when correct name in array is matched to currently targeted player
    if (currentlyTargetedPlayer == currentPlayer) {
      let score = target.textContent;

      let = parsedScore = parseInt(score);

      // add score in target box to relevant object property

      if (target.classList.contains("tr")) {
        players[i].tr = parsedScore;
      }
      if (target.classList.contains("awards")) {
        players[i].awards = parsedScore;
      }
      if (target.classList.contains("milestones")) {
        players[i].milestones = parsedScore;
      }
      if (target.classList.contains("board")) {
        players[i].board = parsedScore;
      }
      if (target.classList.contains("cards")) {
        players[i].cards = parsedScore;
      }
      total =
        Number(players[i].tr) +
        Number(players[i].awards) +
        Number(players[i].milestones) +
        Number(players[i].board) +
        Number(players[i].cards);

      players[i].total = total;

      // make sure it displays a 0 if it is not a number

      if (total === NaN) {
        total = 0;
      }

      console.log(players);

      // Find the score container that matches the player and add score text content

      let currentTotalTarget = Array.from(playerInfo.childNodes);

      for (let i = 0; i < currentTotalTarget.length; i++) {
        console.log(currentTotalTarget);
        console.log(currentTotalTarget[i].firstElementChild.textContent);
        console.log(currentTotalTarget[i].childNodes[0].textContent);
        console.log(currentTotalTarget[i].childNodes[6].textContent);
        console.log(currentlyTargetedPlayer);

        if (
          currentTotalTarget[i].childNodes[0].textContent ==
          currentlyTargetedPlayer
        ) {
          currentTotalTarget[i].childNodes[6].textContent = total;
        }
      }
    }
  }
}

function reset() {
  // Empty players array
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
