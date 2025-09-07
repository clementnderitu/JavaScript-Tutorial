let score = JSON.parse(localStorage.getItem("score")) || {
        wins: 0,
        losses: 0,
        ties: 0,
        games: 0,
        currentStreak: 0,
        bestStreak: 0,
      };

      updateScoreElement();

      let isAutoPlaying = false;
      let intervalID = "";

      function autoPlay() {
        if (!isAutoPlaying) {
          intervalID = setInterval(() => {
            const playerMove = playComputerMove();
            playGame(playerMove);
            isAutoPlaying = true;
          }, 1000);
        } else {
          clearInterval(intervalID);
          isAutoPlaying = false;
        }

        document.querySelector(".js-auto").innerHTML = "Stop Playing";
      }
      function playComputerMove() {
        let randomNumber = Math.random();
        let computerMove = "";

        if (randomNumber > 0 && randomNumber < 1 / 3) {
          computerMove = "rock";
        } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
          computerMove = "paper";
        } else if (randomNumber > 2 / 3 && randomNumber < 1) {
          computerMove = "scissors";
        }
        return computerMove;
      }

      function playGame(playerMove) {
        let computerMove = playComputerMove();
        let result = "";

        if (playerMove === "rock") {
          if (computerMove === "rock") {
            result = "tie";
          } else if (computerMove === "paper") {
            result = "you lose";
          } else if (computerMove === "scissors") {
            result = "you win";
          }
        } else if (playerMove === "paper") {
          if (computerMove === "rock") {
            result = "you win";
          } else if (computerMove === "paper") {
            result = "tie";
          } else if (computerMove === "scissors") {
            result = "you lose";
          }
        } else if (playerMove === "scissors") {
          if (computerMove === "rock") {
            result = "you lose";
          } else if (computerMove === "paper") {
            result = "you win";
          } else if (computerMove === "scissors") {
            result = "tie";
          }
        }

        if (result === "you win") {
          score.wins += 1;
          score.currentStreak += 1;
          if (score.currentStreak > score.bestStreak) {
            score.bestStreak = score.currentStreak;
          }
        } else if (result === "you lose") {
          score.losses += 1;
          score.currentStreak = 0;
        } else if (result === "tie") {
          score.ties += 1;
        }
        score.games += 1;

        updateScoreElement();

        document.querySelector(".js-result").innerHTML = result;

        document.querySelector(".js-moves").innerHTML = `You
        <img src ="images/${playerMove}-emoji.png" class = "move-icon">
        <img src ="images/${computerMove}-emoji.png" class = "move-icon">
        Computer`;

        localStorage.setItem("score", JSON.stringify(score));
      }

      function updateScoreElement() {
        let winRate =
          score.games > 0 ? ((score.wins / score.games) * 100).toFixed(1) : 0;

        document.querySelector(".js-score").innerHTML = `
          Wins: ${score.wins},
          Losses: ${score.losses},
          Ties: ${score.ties}<br>
          Games Played: ${score.games}<br>
          Win Rate: ${winRate}%<br>
          currentStreak: ${score.currentStreak}<br>
          Best Streak: ${score.bestStreak}
          `;
      }

      document.body.addEventListener("keydown", (event) => {
        if (event.key === "r") {
          playGame("rock");
        } else if (event.key === "p") {
          playGame("paper");
        } else if (event.key === "s") {
          playGame("scissors");
        } else if (event.key === "a") {
          autoPlay();
        }
      });