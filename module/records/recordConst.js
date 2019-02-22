export const containerTime = document.querySelector('#timer');
export const containerSmiley = document.querySelector('#smiley');

export function sortTime(timeA, timeB) {
    return timeA.time - timeB.time;
}