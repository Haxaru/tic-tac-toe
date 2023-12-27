# Tic-Tac-Toe: Console + Display Edition

This is a console and Display based version of Tic-Tac-Toe implemented in JavaScript.

## Overview

This game is a straightforward implementation of the classic Tic-Tac-Toe. Players take turns marking their positions on a 3x3 grid, aiming to get three of their marks in a row - horizontally, vertically, or diagonally.

## Future Updates

- **AI Player**: A future version aims to incorporate an AI opponent.
- ~~**Display**: Display implementation will be added in upcoming commits.~~

### Game Link

You can play the game here: [Play Tic-Tac-Toe](https://haxaru.github.io/tic-tac-toe/)

## How to Play

### Using Display

- **Enter Your Names**: Enter your player names into the modal. By default, the names are "Player One" and "Player Two" respectively.
- **Click A Cell**: By clicking a cell, you are adding your mark into that positon.
- **Finishing The Game**: Once a match is finished, either in a tie or win, the game will reset when another mark is set.

### In Console

- **Invoke the Function**: Use `GameControls.playRound(position)` to make a move.
- **Positioning**: The game board positions range from 0 (top left) to 8 (bottom right).
- **Players**: Currently designed for two players. Players take turns marking their positions.

```javascript
// Example: Play a round by marking position 4
GameController.playRound(4);
```
