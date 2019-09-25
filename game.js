const gameSummary = {
  numberOfgames: 0,
  wins: 0,
  losses: 0,
  draws: 0
};

const game = {
  playerHand: "",
  aiHand: ""
};

const hands = [...document.querySelectorAll(".select img")];

const spanWhoWin = document.querySelector('span[data-summary="who-win"]');

function playerChoice(e) {
  game.playerHand = e.target.dataset.option;
  hands.forEach(hand => (hand.style.boxShadow = ""));
  e.target.style.boxShadow = "0 0 0 5px yellow";
}

hands.forEach(hand => hand.addEventListener("click", playerChoice));

function aiChoice() {
  return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

function whoWin(player, ai) {
  if (player === ai) {
    spanWhoWin.style.color = "gray";
    gameSummary.draws++;
    spanWhoWin.textContent = "Draw :\\ ";
  } else if (
    (player == "paper" && ai == "stone") ||
    (player == "scissor" && ai == "paper") ||
    (player == "stone" && ai == "scissor")
  ) {
    gameSummary.wins++;
    spanWhoWin.style.color = "green";
    spanWhoWin.textContent = "You win :)";
  } else {
    gameSummary.losses++;
    spanWhoWin.style.color = "red";
    spanWhoWin.textContent = "You loose :(";
  }
}

function publishResults() {
  document.querySelector('span[data-summary="your-choice"]').textContent =
    game.playerHand;
  document.querySelector('span[data-summary="ai-choice"]').textContent =
    game.aiHand;
  document.querySelector(
    "p.numbers span"
  ).textContent = gameSummary.numberOfgames += 1;
  document.querySelector("p.wins span").textContent = gameSummary.wins;
  document.querySelector("p.losses span").textContent = gameSummary.losses;
  document.querySelector("p.draws span").textContent = gameSummary.draws;
}

function endGame() {
  hands.forEach(hand => (hand.style.boxShadow = ""));
  game.playerHand = "";
  game.aiHand = "";
}

function startGame() {
  if (game.playerHand === "") {
    return alert("You must choose something !!!");
  }
  game.aiHand = aiChoice();
  whoWin(game.playerHand, game.aiHand);
  publishResults();
  endGame();
}

document.querySelector(".start").addEventListener("click", startGame);
