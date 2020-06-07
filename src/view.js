/* ---------------------------------------
$   CANVAS AND VISUAL ELEMENTS
-----------------------------------------*/

export default class View {
    static colours = {
        '1': 'rgb(215, 255, 109)',
        '2': 'rgb(244, 1, 86)',
        '3': 'rgb(47, 227, 244)',
        '4': 'rgb(79, 51, 255)',
        '5': 'rgb(255, 90, 191)',
        '6': 'rgb(245, 132, 127)',
        '7': 'rgb(54, 255, 156)'
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        // adjusting the playfield for 2/3 of the canvas size
        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }

    /* the render() function will fetch the current coordinates from the 
    renderPlayfield() function of the current piece going down on the screen 
    after each movement and add at the same time erase the previous piece's 
    coordinates by calling the clearScreen() function, so we don't have duplicates 
    running over the screen. So, after each movement, the function will basically 
    write the new coordinates whilst erasing the previous ones. */
    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press RETURN to start', this.width / 2, this.height / 2);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press RETURN to resume', this.width / 2, this.height / 2);
    }

    renderEndScreen({
        score
    }) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText('Press RETURN to restart', this.width / 2, this.height / 2 + 48);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPlayfield({
        playfield
    }) {
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                const block = playfield[y][x];

                if (block) {
                    this.renderBlock(
                        this.playfieldX + (x * this.blockWidth),
                        this.playfieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        View.colours[block]);
                }
            }
        }
    }

    renderPanel({
        level,
        score,
        lines,
        nextPiece
    }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText('Next: ', this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                // places the stats on the right side of the canvas
                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colours[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderBlock(x, y, width, height, colour) {
        this.context.fillStyle = colour;
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.7)';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }
}