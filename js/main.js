$(document).ready(function(){

  var ticTacToe = {

    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],

    player: 0,
    turnsCounter: 0,
    currentPlayerToken: 0,
    player0Token: "token-one",
    player1Token: "token-two",

    recordEntries: function(player, x, y) {
      board = ticTacToe.board;
      board[x][y] = player;
      return board;
    },

    boardCheck: function(x,y) {
      board = ticTacToe.board;
      if (board[x][y] === null) {
        return true;
      }
      return false;
    },

    winnerCheck: function () {
      board = ticTacToe.board;
      for (var i = 0; i < board.length; i++) {
        if(board[i][0] != null && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
          console.log(board[i][0], board[i][1], board[i][2]);
          return true;
        }
        if(board[0][i] != null && board[0][i] === board[1][i] && board[0][i] === board[2][i]){
          console.log(board[0][i], board[1][i], board[2][i]);
          return true;
        }
      }
      if(board[0][0] != null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
          console.log(board[0][0], board[1][1], board[2][2]);
          return true;
        }
      if(board [0][2] != null && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
          console.log(board[0][2], board[1][1], board[2][0]);
          return true;
        }

      return false;

    },

    swapTurns: function () {
      ticTacToe.player = 1 - ticTacToe.player;
      ticTacToe.currentPlayerToken = 1 - ticTacToe.currentPlayerToken;

      return this.player, this.currentPlayerToken;
    }
  };

  var addToken = function (square, token) {
    if (ticTacToe.currentPlayerToken === 0) {
      var token = ticTacToe.player0Token;
      $(square).addClass(token);

    } else {
      var token = ticTacToe.player1Token;
      $(square).addClass(token);
    }
  };

  var tokenCheck = function() {
    if (ticTacToe.player0Token === "" || ticTacToe.player1Token === "") {
      return false;
    }
    return true;
  };

  var reset = function() {
    $("#board td").removeClass("token-one token-two token-three token-four");
    $("#update-container").html("");
    $(".token").css("opacity", "1");

    for (var i = 0; i < ticTacToe.board.length; i++){

      for (var j = 0; j <ticTacToe.board[i].length; j++){

        ticTacToe.board[i][j] = null;
      }
    }
  };

  $("#tokens td").on("click", function() {
    var token = $(this).attr("class").split(" ").pop();

    if (ticTacToe.player === 0) {
      ticTacToe.player0Token = token;
      console.log(ticTacToe.player0Token);
      ticTacToe.player = 1 - ticTacToe.player;
      $(".token." + token).css("opacity", "0.5");
      $("#token-container h3").text("Player " + (ticTacToe.player + 1)+ ", select your icon.");


    } else {
      ticTacToe.player1Token = token;
      ticTacToe.player = 1 - ticTacToe.player;
      $(".token." + token).css("opacity", "0.5");
      $("#token-container h3").text("Time to play!");

    }

  });

  $("#board td").on("click", function() {

    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));
    var square = $(this);

      makeMove(row, col, square);

  });

  var makeMove = function(row, col, square){

    if (ticTacToe.boardCheck(row, col) === true) {

      ticTacToe.recordEntries(ticTacToe.player, row, col);

      ticTacToe.turnsCounter += 1;

      addToken(square, ticTacToe.currentPlayerToken);

      if (ticTacToe.winnerCheck() === true) {

        setTimeout(function () {
          $("#update-container").css("color", "red").html("<h3>Player " + (ticTacToe.player + 1) + " is the winner!</h3>");
        }, 400);

        setTimeout(reset, 4000);

      } else if (ticTacToe.turnsCounter === 9){

        setTimeout(function() {
          $("#update-container").html("<h3>Game Over! It's a draw. Play again?</h3>");
        }, 400);

        setTimeout(reset, 4000);

      } else {

        ticTacToe.swapTurns();

        setTimeout(function () {
          $("#update-container").html("<h3>It's Player " + (ticTacToe.player + 1) + "'s turn!</h3>");
        }, 400);

      };

    } else {

      $("#update-container").html("<h3>Spot taken. Pick another spot on the board.</h3>")

    };
  }

  var winConfetti = function () {

    var $canvas = $("#canvas");
    var ctx = $canvas.getContext("2d");

    var width = window.innerWidth;
    var height = window.innerHeight;

    $canvas.width = width;
    $canvas.height = height;

    var max = 100; //max number of confetti
    var confetti = [];

    var random = function(number) {
      return Math.floor(Math.random() * number)
    }

    for (var i = 0; i < max; i++) {
      confetti.push({
        color: "rgba( " + random(255) + ", " + random(255) + ", " + random(255) + ", " + random(1) + " )",
        x: random(width),
        y: random(height),
        


      })
    }

  }

});
