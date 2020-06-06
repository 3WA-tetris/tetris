/* ---------------------------------------
$   MAIN GAME SCRIPT
-----------------------------------------*/

export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200
  };

  // initialisation of the game with the score, lines and level
  score = 0;
  lines = 19;
  // canvas to start the game
  playfield = this.createPlayfield();
  // active piece with position x and y
  activePiece = this.createPiece();
  nextPiece = this.createPiece();

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  /* the getState() function will check after every command a piece movement
  on the canvas by the user by scanning the active piece current position 
  on the canvas, and then it will store (meaning = print on the canvas) 
  the current coordinates on the playfield so it the piece can be printed on the canvas */
  getState() {
    const playfield = this.createPlayfield();
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    return {
      playfield
    };
  }

  // the createPlayfield() function draws the 20x10 canvas
  createPlayfield() {
    const playfield = [];

    for (let y = 0; y < 20; y++) {
      playfield[y] = [];

      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }

    return playfield;
  }

  /* the createPiece() function creates a random piece out of the 7 available */
  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = "IJLOSTZ" [index];
    const piece = {};

    switch (type) {
      case "I":
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "J":
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;

      case "L":
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;

      case "O":
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "S":
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;

      case "T":
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ];
        break;

      case "Z":
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ];
        break;

      default:
        throw new Error("Unknown piece shape");
    }

    /* this is to position the incoming pieces at the center of 
    the canvas and at the very top */
    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

  // move active piece to the left
  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  // move active piece to the right
  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  // move active piece down
  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePieces();
    }
  }

  rotatePiece() {
    this.rotateBlocks();

    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  /* the rotateBlocks() function will take as the starting point the main position
  of the block as defined above, and then every time the user rotates the piece, 
  the function will write the new rotated piece starting from the core point of
  the piece and rotating clockwise. This is stored in a temp because
  the user can just rotate it again until the piece is locked. 
  The temp variable stores the square aside until it finds its correct location
  where it will be inserted permanently */
  rotateBlocks(clockwise = true) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  /* check if the piece touches the wall and then block its position,
  so it doesn't disappear further in the canvas */
  hasCollision() {
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    /* the for loop will roam through the pieces' y and x's axises 
    (as per the constant above, so for example, a T piece in the horizontal
    position [_|_] will occupy a length of 3 blocks on the x axis and 2 blocks
    on the y axis), so it can define the piece's shape and check whether any of
    its extremities is touching a wall */
    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        /* the if statement checks whether the whole shape of the piece exists ('blocks[x][y]',
          in this case a 3x3 block size) AND whether the actual absolute position of the 
          piece on the canvas (represented by 'pieceY') PLUS one y increment is equal to 
          undefined (meaning, the piece can fit in its next advance to the adjacent y cell) 
          OR whether the actual absolute position of the piece on the canvas can reach a corner or 
          a vertical wall ('pieceY + y' and 'pieceX + x') if there is a next x and y increments.
          If the condition holds true, then it will return true and proceed until the piece gets to 
          the end of the loop and return a FALSE signal, triggering the lockPiece() function once 
          the piece reaches the bottom of the canvas. 
          Remember that on boolean 1 = true and 0 = false */
        if (
          blocks[y][x] &&
          (this.playfield[pieceY + y] === undefined ||
            this.playfield[pieceY + y][pieceX + x] === undefined ||
            this.playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  // lock the active piece in its actual position once it reaches the bottom
  lockPiece() {
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          /* simply writes on the canvas the shape of the piece when this function
          is called by the movePieceDown */
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  /* clear lines at the bottom once the whole line is occupied by blocks */
  clearLines() {
    const rows = 20;
    const columns = 10;
    let lines = [];

    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playfield[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks < columns) {
        continue;
      } else if (numberOfBlocks === columns) {
        lines.unshift(y);
      }
    }

    for (let index of lines) {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    }

    return lines.length;
  }

  /* when a line is cleared, it will increment the score according to
  the number of lines cleared (1, 2, 3 or 4 lines). Every 10 lines 
  cleared, the user will also advance 1 level */
  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += Game.points[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}