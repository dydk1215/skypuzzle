import NewGame from "./src/NewGame.js";

const menuDiv = document.querySelector(".menu");
const buttons = menuDiv.children;
for (const button of buttons) {
  button.addEventListener("click", (e) => {
    menuDiv.classList.toggle("invisible");
    document.querySelector(".board").classList.toggle("invisible");
    const gameId = e.target.value;
    // grid.innerHTML = "";
    // document.querySelector(".timer").innerHTML = "";
    new NewGame(gameId);
  });
}
