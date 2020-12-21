export function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

export function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

//Helper function that takes the object returned from isTerminal() and adds a
//class to the board that will handle drawing the winning line's animation
export function drawWinningLine(statusObject) {
  if (!statusObject) return;
  const {winner, cells} = statusObject;
  if (winner === "draw") return;
  cells.forEach(cell => {
    const cellDiv = document.getElementsByClassName('cell-' + cell)[0]
    addClass(cellDiv, 'winner');
  })
}