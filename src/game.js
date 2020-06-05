export default class Game {
  // initialisation of the game with the score, lines and level
  score = 0;
  lines = 0;
  level = 0;

  // canvas to start the game
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // active piece with position x and y
  activePiece = {
    x: 0,
    y: 0,
    // first T piece 
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  };

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
        if (blocks[y][x] && ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined)) || this.playfield[pieceY + y][pieceX + x]) {
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
}