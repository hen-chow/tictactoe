$(document).ready(function(){

  var ticTacToe = { //game related components eg board, players info etc kept in the ticTacToe object, with functions kept separately

    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],

    player: 0,
    turnsCounter: 0,
    currentPlayerToken: 0,
    gamesCounter: 0,

    player0: {
      name: "Player 1",
      token: "token-one",
      wins: 0
    },

    player1: {
      name: "Player 2",
      token: "token-two",
      wins: 0
    },

    recordEntries: function(player, x, y) { //update board array with this function
      board = ticTacToe.board;
      board[x][y] = player;
      return board;
    },

    boardCheck: function(x,y) { //check if selected spots are available
      board = ticTacToe.board;
      if (board[x][y] === null) {
        return true;
      }
      return false;
    },

    winnerCheck: function() { //check for winner
      board = ticTacToe.board;
      for (var i = 0; i < board.length; i++) {
        if(board[i][0] != null && board[i][0] === board[i][1] && board[i][0] === board[i][2]){ //row match check
          return true;
        }
        if(board[0][i] != null && board[0][i] === board[1][i] && board[0][i] === board[2][i]){ //column match check
          return true;
        }
      }
      if(board[0][0] != null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) { //diagonal match check
          return true;
        }
      if(board [0][2] != null && board[0][2] === board[1][1] && board[0][2] === board[2][0]){ //diagonal match check
          return true;
        }
      return false;
    },

    swapTurns: function() { //function to calculate swapping of turns
      ticTacToe.player = 1 - ticTacToe.player;
      ticTacToe.currentPlayerToken = 1 - ticTacToe.currentPlayerToken;
      return this.player, this.currentPlayerToken;
    }
  };

  var addToken = function(square, token) { //function to update and add token on the board - includes DOM manipulation of the board
    if (ticTacToe.currentPlayerToken === 0) {
      var token = ticTacToe.player0.token;
      $(square).addClass(token);
    } else {
      var token = ticTacToe.player1.token;
      $(square).addClass(token);
    }
  };

  var tokenCheck = function() { //eg whether players have selected a token otherwise default tokens will be used
    if (ticTacToe.player0.token === "" || ticTacToe.player1.token === "") {
      return false;
    }
    return true;
  };

  var reset = function() { //function to reset game, assuming new players will be playing which will reset board, name and token selections and all counters;
    var board = ticTacToe.board;

    $("#board td").removeClass("token-one token-two token-three token-four"); //removes all tokens from board
    $("#update-container").html(""); //removes prompt text above board
    $(".token-row > td").css("opacity", "1"); //allows for icon selection again
    $("#player0Name, #player1Name").val(""); //resets player0Name and player1Name names
    $("#name-container > div, #name-container > h3").show(); //show name input fields
    boardOff = false;
    ticTacToe.player = 0; //reset all counters below and set to default
    ticTacToe.turnsCounter = 0;
    ticTacToe.currentPlayerToken = 0;
    ticTacToe.player0.token = "token-one";
    ticTacToe.player1.token = "token-two";
    ticTacToe.winnerCheck() = false;

    for (var i = 0; i < board.length; i++){ //a loop through the board array to reset values to null
      for (var j = 0; j < board[i].length; j++){
        board[i][j] = null;
      }
    }
  };

  var newGame = function() { //function to restart the game, keeping all other selections as is (eg tokens, player names and scoreboard)
    var board = ticTacToe.board;

    $("#board td").removeClass("token-one token-two token-three token-four");
    $("#update-container").html("");
    boardOff = false;
    ticTacToe.player = 0;
    ticTacToe.turnsCounter = 0;
    ticTacToe.currentPlayerToken = 0;

    for (var i = 0; i < board.length; i++){
      for (var j = 0; j < board[i].length; j++){
        board[i][j] = null;
      }
    }
  };

  var winCounter = function() {
    var player = ticTacToe.player;

    if (player === 0) {
      ticTacToe.player0.wins ++;
    } else {
      ticTacToe.player1.wins ++;
    }
  };


  var scoreboardUpdate = function() {//function to update scoreboard for multiple games feature
    $("#scoreboard").css("display", "inline").html("<h3>Round " + ticTacToe.gamesCounter + " </h3>" + "<p>" + ticTacToe.player0.name + " -- " + ticTacToe.player0.wins + " : " + ticTacToe.player1.wins + " -- " + ticTacToe.player1.name + "</p>");
  }

  var boardOff = false; // variable to switch off board function once game is over


  // var confettiMachine = function() { //confetti and win link
  //   if (ticTacToe.winnerCheck()) {
  //     setInterval(makeConfetti, 50); setInterval(moveConfettis, 10); //confetti effect
  //   } else {
  //     clearInterval(confettiMachine);
  //   }
  // }

  var makeMove = function(row, col, square){ //function to actually make a move on the board
    if (ticTacToe.boardCheck(row, col) === true) {
      ticTacToe.recordEntries(ticTacToe.player, row, col);
      ticTacToe.turnsCounter += 1;
      addToken(square, ticTacToe.currentPlayerToken);

      if (ticTacToe.winnerCheck() === true) {
        boardOff = true;
        // confettiMachine();
        ticTacToe.gamesCounter +=1;
        winCounter();

        if (ticTacToe.player === 0) {
          setTimeout(function() {
            $("#update-container").html("<h3>" + ticTacToe.player0.name + " is the winner!</h3>");
          }, 400);
        } else {
          setTimeout(function() {
            $("#update-container").html("<h3>" + ticTacToe.player1.name + " is the winner!</h3>");
          }, 400);
        };
        setTimeout(newGame, 15000);
        scoreboardUpdate();

      } else if (ticTacToe.turnsCounter === 9){ //calls a tie if there's been 9 turns and no winner
        ticTacToe.gamesCounter +=1;
        setTimeout(function() {
          $("#update-container").html("<h3>Game Over! It's a draw. Play again?</h3>");
        }, 400);
        setTimeout(reset, 4000);

      } else {
        ticTacToe.swapTurns();
        if (ticTacToe.player === 0) {
          setTimeout(function () {
            $("#update-container").html("<h3>It's " + ticTacToe.player0.name + "'s turn!</h3>");
          }, 400);
        } else {
          setTimeout(function () {
            $("#update-container").html("<h3>It's " + ticTacToe.player1.name + "'s turn!</h3>");
          }, 400);
        }
      };

    } else {
      $("#update-container").html("<h3>Spot taken. Pick another spot on the board.</h3>")
    };
  }

  $("i.fa-volume-off").on("click", function() { //audio volume event listener
    if ($("audio").prop("muted") === true){
      $("audio").prop("muted", false);
    } else {
      $("audio").prop("muted", true);
    }
  })

  $("#new-game").on("click", newGame); //new game button event listener

  $("#new-players").on("click", reset); //new players button event listener


  $(".name input").keypress(function(e){ //enter key event listener/handler
    var id = $(this).attr("id");
    if (e.which === 13 || event.keyCode === 13) { //e.which and event.keyCode to cover all enter key options
      if (id === "player0Name") {
        var input = $("#" + id).val();
        ticTacToe.player0.name = input;
        $("#name-container > div:first").hide();
      } else if (id === "player1Name") {
        var input = $("#" + id).val();
        ticTacToe.player1.name = input;
        $("#name-container > div:last, #name-container > h3").hide();
      }
    }
  })

  $("#tokens td").on("click", function() { //icon select event handler
    var token = $(this).attr("class");
    var player = ticTacToe.player;

    if (player === 0) {
      ticTacToe.player0.token = token;
      ticTacToe.player = 1 - ticTacToe.player;
      $("." + token).css("opacity", "0.5");
      $("#token-container h3").text(ticTacToe.player1.name + ", select your icon.");
    } else {
      ticTacToe.player1.token = token;
      ticTacToe.player = 1 - ticTacToe.player;
      $("." + token).css("opacity", "0.5");
      $("#token-container h3").text("Time to play!");
    }
  });

  //board playing event handler
  $("#board td").on("click", function() {
    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));
    var square = $(this);

    if (boardOff === false) { //if the board is on and can click thru
      makeMove(row, col, square);
    }
  });
//confetti effect for the winner
  // var max = 100; //max number of confetti
  // var confettis = [];
  //
  // var random = function(number) {
  //   return Math.round(Math.random() * number)
  // };
  //
  // var makeConfetti = function() {
  //
  //   if (confettis.length < max) {
  //     var confetti = $("<div class='confetti'></div>");
  //     confetti.css ({
  //       background: "rgba( " + random(255) + ", " + random(255) + ", " + random(255) + ", " + random(1) + " )",
  //       top: random(window.innerHeight),
  //       left: random(window.innerWidth),
  //       position: "absolute",
  //       transform: "skew(" + random(40) + "deg)"
  //     });
  //     confettis.push(confetti);
  //     $(".container").append(confetti);
  //     return confetti;
  //   }
  //   else {
  //     clearInterval(confettiMachine);
  //   }
  // }

  // var moveConfetti = function (confetti) {
  //   var x = parseInt(confetti.css("left"));
  //   var y = parseInt(confetti.css("top"));
  //   var angle = 20;
  //
  //    confetti.animate ({
  //     left: x + Math.sin(angle) + "px",
  //     top: y + Math.cos(angle) + "px",
  //     backgroundColor: "rgba( " + random(255) + ", " + random(255) + ", " + random(255) + ", " + random(1) + " )",
  //   })
  // }
  //
  // var moveConfettis = function () {
  //   for (var i = 0; i < confettis.length; i++) {
  //     moveConfetti(confettis[i])
  //   }
  // }
  // var confettiMachine = function() {
  //   setInterval(makeConfetti, 50); setInterval(moveConfettis, 10); //confetti effect
  // }

});
