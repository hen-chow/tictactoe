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
      var token = "token-one";
      $(square).addClass(token);

    } else {
      var token = "token-two";
      $(square).addClass(token);
    }
  };

  var resetBoard = function() {
    $("#board td").removeClass("token-one token-two");
    $("#update-container").html("");

    for (var i = 0; i < ticTacToe.board.length; i++){

      for (var j = 0; j <ticTacToe.board[i].length; j++){

        ticTacToe.board[i][j] = null;
      }
    };
  }


  $("#board td").on("click", function() {

    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));
    var square = $(this);

    makeMove(row, col, square)

  });

  var makeMove = function(row, col, square){

    if (ticTacToe.boardCheck(row, col) === true) {

      ticTacToe.recordEntries(ticTacToe.player, row, col);

      ticTacToe.turnsCounter += 1;

      addToken(square, ticTacToe.currentPlayerToken);

      if (ticTacToe.winnerCheck() === true) {
        $("#update-container").css("color", "red").html("<h3>Player " + (ticTacToe.player + 1) + " is the winner!</h3>");

        setTimeout(resetBoard, 4000);

      } else if (ticTacToe.turnsCounter === 9){

        $("#update-container").html("<h3>Game Over! It's a draw. Play again?</h3>");

        setTimeout(resetBoard, 4000);

      } else {

        ticTacToe.swapTurns();

        $("#update-container").html("<h3>It's Player " + (ticTacToe.player + 1) + "'s turn!</h3>");

      };

    } else {

      $("#update-container").html("<h3>Spot taken. Pick another spot on the board.</h3>")

    };
  }

});
