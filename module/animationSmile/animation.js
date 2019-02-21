import {containerMap, containerSmiley} from "./configSmile.js";

containerMap.addEventListener('mousedown', mousedown);
containerMap.addEventListener('mouseup', mouseup);

export function mousedown() {
    containerSmiley.style.backgroundImage = 'url("img/face-savouring-delicious-food_1f60b.png")';
}

export function mouseup() {
    containerSmiley.style.backgroundImage = 'url("img/slightly-smiling-face_1f642.png")';
}