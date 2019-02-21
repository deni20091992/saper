export class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.hasBomb = false;
        this.status = 'default';
    }
}