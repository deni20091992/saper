import {Cell} from "../ceil/ceil.js";
import {Game} from "../game/game.js";
import {containerMap} from "./configMap.js";

export class Map extends Game{
    constructor(rows, cols, bombs){
        super();
        this.bombs =bombs
        this.rows = rows;
        this.cols = cols;
    }

    generateMap() {
        this.map = [];
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            this.map.push(row);
            for (let j = 0; j < this.cols; j++) {
                let ceil = new Cell(i, j);
                row.push(ceil);
            }
        }
        this.redraw();
    }

    redraw() {
        containerMap.textContent = '';
        for (let row of this.map) {
            let rowHtml = document.createElement('div');
            rowHtml.className = 'row';
            containerMap.appendChild(rowHtml);
            for (let cell of row) {
                let cellHtml = document.createElement('div');
                cellHtml.className = 'cell';
                rowHtml.appendChild(cellHtml);
                cellHtml.onclick = () => {
                    this.open(cell);
                };
                cellHtml.oncontextmenu = e => e.preventDefault();
                cellHtml.onmousedown = e => {
                    if (e.button === 2) {
                        this.mark(cell);
                    }
                }
            }
        }
    }
}