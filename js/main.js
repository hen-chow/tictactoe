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
    player1Name: "Player 1",
    player2Name: "Player 2",

    //update board array with this function
    recordEntries: function(player, x, y) {
      board = ticTacToe.board;
      board[x][y] = player;
      return board;
    },
    //check if selected spots are available
    boardCheck: function(x,y) {
      board = ticTacToe.board;
      if (board[x][y] === null) {
        return true;
      }
      return false;
    },
    //check for winner
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
    //function to calculate swapping of turns
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
  //function to reset board, and all counters;
  var reset = function() {
    var board = ticTacToe.board;

    $("#board td").removeClass("token-one token-two token-three token-four");
    $("#update-container").html("");
    $(".token").css("opacity", "1");
    $("#player1Name, #player2Name").val("");
    $("#name-container > div, #name-container > h3").show();
    boardOff = false;
    ticTacToe.player = 0;
    ticTacToe.turnsCounter = 0;
    ticTacToe.currentPlayerToken = 0;
    ticTacToe.player0Token = "token-one";
    ticTacToe.player1Token = "token-two";

    for (var i = 0; i < board.length; i++){
      for (var j = 0; j < board[i].length; j++){
        board[i][j] = null;
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

  //function to update scoreboard for multiple games feature
  var scoreboardUpdate = function() {
    $("#scoreboard").css("display", "inline").html("<h3>Round " + ticTacToe.gamesCounter + " </h3>" + "<p>" + ticTacToe.player1Name + " -- " + ticTacToe.player1Wins + " : " + ticTacToe.player2Wins + " -- " + ticTacToe.player2Name + "</p>");
  }

  var boardOff = false; //variable to switch off board function once game is over

  //function to actually make a move on the board
  var makeMove = function(row, col, square){
    if (ticTacToe.boardCheck(row, col) === true) {
      ticTacToe.recordEntries(ticTacToe.player, row, col);
      ticTacToe.turnsCounter += 1;
      addToken(square, ticTacToe.currentPlayerToken);

      if (ticTacToe.winnerCheck() === true) {
        boardOff = true;
        ticTacToe.gamesCounter +=1;
        winCounter();

        if (ticTacToe.player === 0) {
          setTimeout(function() {
            $("#update-container").html("<h3>" + ticTacToe.player1Name + " is the winner!</h3>");
          }, 400);
        } else {
          setTimeout(function() {
            $("#update-container").html("<h3>" + ticTacToe.player2Name + " is the winner!</h3>");
          }, 400);
        };
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
        if (ticTacToe.player === 0) {
          setTimeout(function () {
            $("#update-container").html("<h3>It's " + ticTacToe.player1Name + "'s turn!</h3>");
          }, 400);
        } else {
          setTimeout(function () {
            $("#update-container").html("<h3>It's " + ticTacToe.player2Name + "'s turn!</h3>");
          }, 400);
        }
      };

    } else {
      $("#update-container").html("<h3>Spot taken. Pick another spot on the board.</h3>")
    };
  }
  //audio volume event listener
  $("i.fa-volume-off").on("click", function() {
    if ($("audio").prop("muted") === true){
      $("audio").prop("muted", false);
    } else {
      $("audio").prop("muted", true);
    }
  })
  //enter key event listener/handler
  $(".name input").keypress(function(e){
    // var keyPressed = e.keyCode || e.which;
    var id = $(this).attr("id");
    if (e.which === 13 || event.keyCode === 13) {
      if (id === "player1Name") {
        var input = $("#" + id).val();
        ticTacToe.player1Name = input;
        $("#name-container > div:first").hide();
      } else if (id === "player2Name") {
        var input = $("#" + id).val();
        ticTacToe.player2Name = input;
        $("#name-container > div:last, #name-container > h3").hide();
      }
    }
  })

  //icon select event handler
  $("#tokens td").on("click", function() {
    var token = $(this).attr("class");
    var player = ticTacToe.player;

    if (player === 0) {
      ticTacToe.player0Token = token;
      ticTacToe.player = 1 - ticTacToe.player;
      $("." + token).css("opacity", "0.5");
      $("#token-container h3").text(ticTacToe.player2Name + ", select your icon.");
    } else {
      ticTacToe.player1Token = token;
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

});
