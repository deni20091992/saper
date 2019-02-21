import {buttonsMenu, modalMenu, records, modalRecords} from "./configModalWindows.js";

buttonsMenu.addEventListener('click', openMenu);

export function openMenu() {
  modalMenu.classList.toggle("off");
}

[].forEach.call(records, function(event) {
  event.addEventListener("click", function() {
    modalRecords.classList.toggle("off");
  })
});