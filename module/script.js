import {Map} from "./map/map.js";
import {downloadLocal} from "./records/tableRecords.js";
import {mousedown, mouseup} from "./animationSmile/animation.js";
import {openMenu} from "./modalWindow/modal.js";
import {containerStartGame, containerOwnGame, containerStartOwnGame} from "./config.js";
import {openOwnGame} from "./ownGame/ownGame.js";
import {containerOpenOwnGame, ownBombs, ownCols, ownRows} from "./ownGame/configOwnGame.js";


downloadLocal();

containerStartGame.forEach(x => x.onclick = function () {
    let map = new Map(this.dataset.rows, this.dataset.cols, this.dataset.bombs);
    containerOwnGame.style.visibility = 'hidden';
    map.generateMap();
    map.openFlags();
});

containerStartOwnGame.addEventListener('click', ownGame);
containerOpenOwnGame.addEventListener('click', openOwnGame);

function ownGame() {
    let map = new Map(ownRows, ownCols, ownBombs);
    map.generateMap();
    map.openFlags();
}