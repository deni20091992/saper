import {setTableRecords} from "../records/tableRecords.js";
import {youLoser} from "../records/gameOver.js";
import {containerTime, containerMap, containerBombs} from "./configGame.js";

export class Game {
    constructor(){
        this.isActive = true;
        this.numberClick = 0;
    }
    placeBombs(cell){
        let remainingBombs = this.bombs;
        while (remainingBombs > 0) {
            let rowRandom = parseInt(Math.random()*this.rows-0.0001);
            let colRandom = parseInt(Math.random()*this.cols-0.0001);
            if (!this.map[rowRandom][colRandom].hasBomb && this.map[cell.row][cell.col] !==this.map[rowRandom][colRandom]) {
                this.map[rowRandom][colRandom].hasBomb = true;
                remainingBombs--;
            }
        }
    }

    open(cell) {
        this.openFlags();
        if (this.numberClick === 0){
            this.placeBombs(cell);
        }
        if (timer == '0' && this.isActive ===true) {
            timer = new Date().getTime();
        }
        if (!this.isActive) return;
        if (cell.status === 'clear') return;
        let cellHtml = containerMap.children[cell.row].children[cell.col];
        this.numberClick++;
        if (cell.hasBomb) {
            this.map[cell.row][cell.col].hasBomb = false;
            cellHtml.dataset.status ='clear';
            this.openBombs();
            cellHtml.dataset.status = 'mine';
            this.gameOver();
            return;
        }

        let number = this.calcBombsAround(cell);
        cell.status = 'clear';
        cellHtml.dataset.status = 'clear';
        if (number === 0) {
            this.getCellNear(cell).forEach(x => this.open(x));
        } else {
            cellHtml.textContent = number;
        }
        this.checkWin();
    }

    openBombs() {
        let maps = document.querySelectorAll('.game');
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.map[i][j].hasBomb === true) {
                    let hasBomb = maps[0].children[i].children[j];
                    hasBomb.dataset.status = 'bomb';
                }
                if (this.map[i][j].status === 'flag') {
                }
            }
        }
    }

    openFlags() {
        let flags = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.map[i][j].status == 'flag') {
                    flags++;
                }
            }
        }
        containerBombs.innerText = this.bombs - flags;
    }

    calcBombsAround(cell) {
        return this.getCellNear(cell).filter(x => x.hasBomb).length;
    }

    getCellNear(cell) {
        let ret = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this.map[cell.row + i] && this.map[cell.row + i][cell.col + j] && this.map[cell.row + i][cell.col + j] !== cell) {
                    ret.push(this.map[cell.row + i][cell.col + j]);
                }
            }
        }
        return ret;
    }

    mark(cell) {
        if (!this.isActive) return;
        let cellHtml = containerMap.children[cell.row].children[cell.col];
        if (cell.status === 'default') {
            cell.status = 'flag';
            this.openFlags();
        } else if (cell.status === 'flag') {
            cell.status = 'default';
            this.openFlags();
        } cellHtml.dataset.status = cell.status;
    }

    checkWin() {
        let remainingDefaults = 0;
        this.map.forEach(row => row.forEach(cell => {
            if (cell.status === 'default' || cell.status === 'flag') remainingDefaults++;
        }));
        if (remainingDefaults === +this.bombs) {
            this.isActive = false;
            this.openBombs();
            timer = 0;
            setTableRecords();
        }
    }

    gameOver() {
        this.isActive = false;
        timer =0;
        youLoser();
    }
}

let timer = 0;
setInterval(function () {
    if (timer == 0) return;
    containerTime.innerText = ((new Date().getTime() - timer) / 1000).toFixed(3);
}, 10);
