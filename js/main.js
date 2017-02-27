$(document).ready(function(){

window.ticTacToe = {

    turnsCounter: 0,

    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],

    player1: {     
      turns: ""
    },

    player2: {
      turns: ""
    },

    recordEntries: function(player, x, y) {
      board = ticTacToe.board;
      board[x][y] = player;

      return board;
    },

    winnerCheck: function () {
      board = ticTacToe.board;
      for (var i = 0; i < board.length; i++) {
        if(board[i][0] === board[i][1] && board[i][0] === board[i][2]){
          console.log(board[i]);
          return "player " + board[i][0] + " wins";
        }
        if(board[0][i] === board[1][i] && board[0][i] === board[2][i]){
          console.log(board[0][i], board[1][i], board[2][i]);
          return "player " + board[0][i] + " wins";
        }
      }
      if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
          console.log(board[0][0], board[1][1], board[2][2]);
          return "player " + board[0][0] + " wins";
        }
      if(board[0][2] === board[1][1] && board[0][2] === board[2][0]){
          console.log(board[0][2], board[1][1], board[2][0]);
          return "player " + board[0][2] + " wins";
        }

      return false;

    },

    swapTurns: function () {
      var turns = 0;





    }


  };
});
//eventHandlers

//Functions
//Swapping turns
//Taking a turn = clicks on space and icon updated on board
// --> Icon update on board
//Winner check
//keep track of turns
//keep track of where on board

//1. Player1 takes turn no. 1
//2. Player2 takes turn no. 1
//3. Player1 takes turn no. 2
//4. Player2 takes turn no. 2
//5. Player1 takes turn no. 3
//6. Winner check
//7. If no winner, Player2 takes turn no. 3;
//8. Winner check
//9. If no winner, Player1 takes turn no. 4;
//10. Winner check
//11. If no winner, Player2 takes turn no. 4;
//12. Winner check
//13. If no winner, Player1 takes turn no. 5;
//14. Winner check;
//15. Declare winner or draw






//

//html for icon1 <i class="fa fa-circle-o" aria-hidden="true"></i>
//html for icon2 <i class="fa fa-times" aria-hidden="true"></i>
