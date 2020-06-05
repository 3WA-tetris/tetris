/* ---------------------------------------
$   INDEX
-----------------------------------------*/

import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);

window.game = game;
window.view = view;

view.renderPlayfield(game.playfield);