import {containerStartOwnGame, containerOwnGame, containerOpenOwnGame} from "./configOwnGame.js";

containerOpenOwnGame.addEventListener('click', openOwnGame);
export function openOwnGame() {
    containerOwnGame.style.visibility = 'visible';
}