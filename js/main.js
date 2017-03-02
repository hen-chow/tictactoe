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
    gamesCounter: 0,
    player1Wins: 0,
    player2Wins:0,

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

    winnerCheck: function() {
      board = ticTacToe.board;
      for (var i = 0; i < board.length; i++) {
        if(board[i][0] != null && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
          return true;
        }
        if(board[0][i] != null && board[0][i] === board[1][i] && board[0][i] === board[2][i]){
          return true;
        }
      }
      if(board[0][0] != null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
          return true;
        }
      if(board [0][2] != null && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
          return true;
        }
      return false;
    },

    swapTurns: function() {
      ticTacToe.player = 1 - ticTacToe.player;
      ticTacToe.currentPlayerToken = 1 - ticTacToe.currentPlayerToken;
      return this.player, this.currentPlayerToken;
    }
  };

  var addToken = function(square, token) {
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
    boardOff = false;
    ticTacToe.player = 0;
    ticTacToe.turnsCounter = 0;
    ticTacToe.currentPlayerToken = 0;
    ticTacToe.player0Token = "token-one";
    ticTacToe.player1Token = "token-two";

    for (var i = 0; i < ticTacToe.board.length; i++){
      for (var j = 0; j <ticTacToe.board[i].length; j++){
        ticTacToe.board[i][j] = null;
      }
    }
  };

  var winCounter = function() {
    var player = ticTacToe.player;

    if (player === 0) {
      ticTacToe.player1Wins ++;
    } else {
      ticTacToe.player2Wins ++;
    }
  };

  var scoreboardUpdate = function() {
    $("#scoreboard").css("display", "inline").html("<h3>Round " + ticTacToe.gamesCounter + " </h3>" + "<p>Player 1: " + ticTacToe.player1Wins + " - " + ticTacToe.player2Wins + " : Player 2</p>");
  }

  $("#tokens td").on("click", function() {
    var token = $(this).attr("class").split(" ").pop();
    var player = ticTacToe.player;

    if (player === 0) {
      ticTacToe.player0Token = token;
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

  var boardOff = false; //variable to switch off board function once game is over

//board playing event handler
  $("#board td").on("click", function() {
    var row = parseInt($(this).attr("row"));
    var col = parseInt($(this).attr("col"));
    var square = $(this);

    if (boardOff === false) {
      makeMove(row, col, square);
    }
  });

  var makeMove = function(row, col, square){
    if (ticTacToe.boardCheck(row, col) === true) {
      ticTacToe.recordEntries(ticTacToe.player, row, col);
      ticTacToe.turnsCounter += 1;
      addToken(square, ticTacToe.currentPlayerToken);

      if (ticTacToe.winnerCheck() === true) {
        boardOff = true;
        ticTacToe.gamesCounter +=1;
        winCounter();

        setTimeout(function () {
          $("#update-container").html("<h3>Player " + (ticTacToe.player + 1) + " is the winner!</h3>");
        }, 400);
        setTimeout(reset, 4000);
        scoreboardUpdate();

      } else if (ticTacToe.turnsCounter === 9){
        ticTacToe.gamesCounter +=1;
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
});

  //     } else {
  //       ticTacToe.swapTurns();
  //       //AI makes a move
  //       //1. check for human move and available spots
  //       //2. Rank available spots based on points
  //       //3. Select highest valued spot
  //     };
  //
  //   } else {
  //     $("#update-container").html("<h3>Spot taken. Pick another spot on the board.</h3>")
  //   };
  // }

  // var points = [
  //   ["5"],
  //   ["1", "3", "7", "9"],
  //   ["2", "4", "6", "8"]
  // ];
  // // threePoints = [5];
  // // twoPoints = [1, 3, 7, 9];
  // // onePoint = [2, 4, 6, 8];
  //
  // var selectSquare = function() {
  //   var board = ticTacToe.board;
  //
  //   if (ticTacToe.turnsCounter === 1 && board[1][1] === null) {
  //     addToken($("#5"), computerToken);
  //   }
  //
  //   if (board[1][1] != null) {
  //
  //
  //   }
  // }
  //
  // var $availSquares = $(".square").not(".token-one, .token-two, .token-three, .token-four").map(function   (){
  //     return this.id;
  //   });
  //
  // var pointCheck = function() {
  //   for (var i = 0; i < points.length; i++) {
  //     for (var j = 0; j < points[i].length; j++) {
  //       if (points[i][j] === $availSquares[i]){
  //         console.log($availSquares, $availSquares[i]);
  //         return true
  //
  //       }
  //     }
  //   }
  // };
