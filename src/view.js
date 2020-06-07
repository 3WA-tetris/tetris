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

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;

        this.element.appendChild(this.canvas);
    }

    /* the render() function will fetch the current coordinates from the 
    renderPlayfield() function of the current piece going down on the screen 
    after each movement and add at the same time erase the previous piece's 
    coordinates by calling the clearScreen() function, so we don't have duplicates 
    running over the screen. So, after each movement, the function will basically 
    write the new coordinates whilst erasing the previous ones. */
    render(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
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
                    this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colours[block]);
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

        this.context.fillText(`Score: ${score}`, 0, 0);
        this.context.fillText(`Lines: ${lines}`, 0, 24);
        this.context.fillText(`Level: ${level}`, 0, 48);
        this.context.fillText('Next: ', 0, 96);
    }

    renderBlock(x, y, width, height, colour) {
        this.context.fillStyle = colour;
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.7)';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }
}