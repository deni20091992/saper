containerStartGame.forEach(x => x.onclick = function () {
    let map = new Mame(this.dataset.rows, this.dataset.cols, this.dataset.bombs);
    containerOwnGame.style.visibility = 'hidden';
    defaultSettings();
});

